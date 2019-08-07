/* eslint-disable */
import Vue from "vue";
import { $apis } from "@/helper";

const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const convertGps = (list) => {
  const promiseArr = [];
  let tid = ''
  try {
    console.log("convertGps", list);
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const { lng, lat } = item;
      const gps = [lng / 1000000, lat / 1000000];
      const promise = new Promise((resolve, reject) => {
        AMap.convertFrom(gps, "gps", (status, result) => {
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
      // {
      //   value: 1,
      //   icon: "weiyi",
      //   content: "位移报警（未启用）",
      //   count: 0
      // },
      {
        value: 2,
        icon: "gaowen",
        content: "高温告警",
        count: 0
      },
      {
        value: 4,
        icon: "neizhidiya",
        content: "电池低电压告警",
        count: 0
      },
      {
        value: 8,
        icon: "duandian",
        content: "电瓶低电压告警",
        count: 0
      },
      {
        value: 16,
        icon: "duandian2",
        content: "电瓶断电/剪线告警",
        count: 0
      },
      // {
      //   value: 32,
      //   icon: "zhendong",
      //   content: "震动报警（未启用）",
      //   count: 0
      // },
      {
        value: 64,
        icon: "suaidao",
        content: "车辆碰撞/倾覆告警",
        count: 0
      },
      {
        value: 128,
        icon: "chaosu",
        content: "超速告警",
        count: 0
      },
      // {
      //   value: 256,
      //   icon: "jinjigaojing",
      //   content: "紧急报警（未启用）",
      //   count: 0
      // },
      // {
      //   value: 512,
      //   icon: "feifaxingshi",
      //   content: "非法行驶报警（未启用）",
      //   count: 0
      // },
      {
        value: 1024,
        icon: "fangdao",
        content: "车辆异常移动告警",
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
      // 重置count
      state.alarmTypeList.forEach((item) => {
        item.count = 0
      })
      state.alarmTypeClass = ''
      alarmLatest.forEach((item) => {
        const { alarm } = item;
        state.alarmTypeList.forEach((alarmTypeItem) => {
          if (alarm === alarmTypeItem.value) {
            alarmTypeItem.count += 1;
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
      // 重置count
      state.alarmTypeList.forEach((item) => {
        item.count = 0
      })
      state.alarmTypeClass = ''
      result.data.forEach((item) => {
        const { alarm } = item;
        state.alarmTypeList.forEach((alarmTypeItem) => {
          if (alarm === alarmTypeItem.value) {
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
            message: "未查到相关报警信息~"
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
          const [firstAlarm] = result.data
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
    alarmTypes: state => {
      let alarmTypes = [{
        value: 0,
        content: "全部",
      }, ...state.alarmTypeList]
      return alarmTypes
    },
    alarmTypeClass: state => state.alarmTypeClass,
    currentAlarm: state => state.currentAlarm,
    alarmAnalyseTotal: state => state.alarmAnalyseTotal
  }
};

export default Login;
