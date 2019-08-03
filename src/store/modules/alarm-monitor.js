import { $apis } from "@/helper";
import Vue from "vue";
const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const convertGps = list => {
  let promiseArr = [];
  let tid = ''
  try {
    console.log("convertGps", list);
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      let { lng, lat } = item;
      let gps = [lng / 1000000, lat / 1000000];
      let promise = new Promise((resolve, reject) => {
        AMap.convertFrom(gps, "gps", function(status, result) {
          if (result.info === "ok") {
            const [{ lng, lat }] = result.locations; // Array.<LngLat>
            item.lng = lng;
            item.lat = lat;
            resolve(item);
          }
        });
      });
      promiseArr.push(promise);
    }

    return new Promise((resolve, reject) => {
      tid = setTimeout(() => {
        vm.$message({
          type: "error",
          message: "gps数据转化超时~"
        });
        resolve(promiseArr)
      }, 30 * 1000)
      Promise.all(promiseArr).then(() => {
        resolve(promiseArr)
        clearTimeout(tid)
      })
    })
  } catch (error) {
    vm.$message({
      type: "error",
      message: "gps数据转化异常~"
    });
    clearTimeout(tid)
    return Promise.resolve(promiseArr);
  }
};


const Login = {
  state: {
    alarmId: 0,
    alarmLatest: [],
    alarmAnalyse: {},
    alarmTypeClass: '',
    currentAlarm: {},
    alarmAnalyseTotal: 0,
    alarmTypeList: [
      {
        icon: "weiyi",
        content: "位移报警",
        count: 0
      },
      {
        icon: "gaowen",
        content: "温度报警",
        count: 0
      },
      {
        icon: "neizhidiya",
        content: "电池低电压报警",
        count: 0
      },
      {
        icon: "duandian",
        content: "电瓶低电压报警",
        count: 0
      },
      {
        icon: "duandian2",
        content: "断电报警(剪线报警)",
        count: 0
      },
      {
        icon: "zhendong",
        content: "震动告警",
        count: 0
      },
      {
        icon: "suaidao",
        content: "摔倒报警",
        count: 0
      },
      {
        icon: "chaosu",
        content: "超速告警",
        count: 0
      },
      {
        icon: "jinjigaojing",
        content: "紧急报警",
        count: 0
      },
      {
        icon: "feifaxingshi",
        content: "非法行驶报警",
        count: 0
      },
      {
        icon: "fangdao",
        content: "防盗告警",
        count: 0
      }
    ]
  },
  mutations: {
    updateAlarmLatestId(state, alarmId) {
      state.alarmId = alarmId
    },
    updateAlarmLatest(state, alarmLatest) {
      console.log('alarmLatest', alarmLatest)
      state.alarmLatest = alarmLatest;
      // todo delete
      // state.alarmLatest[0].note = '震动告警'
      // 更新alarmTypeList
      // 重置count
      state.alarmTypeList.forEach(item => {
        item.count = 0
      })
      state.alarmTypeClass = ''
      alarmLatest.forEach(item => {
        let { note } = item;
        state.alarmTypeList.forEach(alarmTypeItem => {
          let alarmTips = alarmTypeItem.content.substr(0, 2);
          console.log('--note--', note, alarmTips)
          if (note.indexOf(alarmTips) > -1) {
            alarmTypeItem.count += 1;
            console.log('alarmLatest', alarmTips, alarmTypeItem)
            // 显示最后一个class
            item.iconClass = `item-icon-${alarmTypeItem.icon}`
            state.currentAlarm = item
          }
        });
      });
    },
    updateAlarmAnalyse(state, result) {
      state.alarmAnalyse = result.data;
      state.alarmAnalyseTotal = result.total
      // todo delete
      // state.alarmAnalyse[1].note = '震动告警'
      // 更新alarmTypeList
      // 重置count
      state.alarmTypeList.forEach(item => {
        item.count = 0
      })
      state.alarmTypeClass = ''
      result.data.forEach(item => {
        let { note } = item;
        state.alarmTypeList.forEach(alarmTypeItem => {
          let alarmTips = alarmTypeItem.content.substr(0, 2);
          if (note.indexOf(alarmTips) > -1) {
            item.iconClass = `item-icon-${alarmTypeItem.icon}`
            alarmTypeItem.count += 1;
            state.currentAlarm = item
            // if (!state.alarmTypeClass) {
            //   state.alarmTypeClass = `item-icon-${alarmTypeItem.icon}`
            //   state.currentAlarm = item
            // }
          }
        });
      });
    }
  },
  actions: {
    async getAlarmAnalyse({ commit, rootState }, data) {
      try {
        const result = await $apis.getAlarmAnalyse({
          token: getToken(rootState),
          ...data
        });
        if (result.data && result.data.length > 0) {
          await convertGps(result.data)
          console.log('getAlarmAnalyse', result.data)
          commit("updateAlarmAnalyse", result);
          console.log(result);
        } else {
          vm.$message({
            type: "error",
            message: "未查到任何报警信息~"
          });
          return Promise.reject();
        }
        
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getAlarmLatest({ commit, state, rootState }, data) {
      try {
        if (data && data.isStartAlarm) {
          commit("updateAlarmLatestId", 0);
        }
        data.alarmId = state.alarmId
        const result = await $apis.getAlarmLatest({
            token: getToken(rootState),
            ...data
        });
        if (result.data && result.data.length > 0) {
          await convertGps(result.data)
          console.log('updateAlarmLatest', result.data)
          let [firstAlarm] = result.data
          commit("updateAlarmLatestId", firstAlarm.id);
          commit("updateAlarmLatest", result.data);
          console.log(result);
          if (data && !data.isStartAlarm) {
            vm.$message({
              type: "success",
              message: "告警信息已更新~"
            });
          }
        } else {
          vm.$message({
            type: "success",
            message: "告警信息已更新，未找到新的告警信息~"
          });
          return Promise.reject();
        }
        
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
  },
  getters: {
    alarmLatest: state => state.alarmLatest,
    alarmAnalyse: state => state.alarmAnalyse,
    alarmTypeList: state => state.alarmTypeList,
    alarmTypeClass: state => state.alarmTypeClass,
    currentAlarm: state => state.currentAlarm,
    alarmAnalyseTotal: state => state.alarmAnalyseTotal
  }
};

export default Login;
