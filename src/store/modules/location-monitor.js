import { $apis } from "@/helper";
import Vue from "vue";
import testServer from '@/test-service.json'

const vm = new Vue();

const getToken = rootState => {
  const { userInfo } = rootState.login;
  return userInfo.token || "";
};

// const convertHistoryGps = async list => {
//   let promiseArr = [];
//   let tid = ''
//   try {
//     for (let i = 0; i < list.length; i++) {
//       let item = list[i];
//       let { lng, lat } = item;
//       item.lng = lng / 1000000;
//       item.lat = lat / 1000000;
//       let gps = [item.lng, item.lat];
//       let promise = new Promise((resolve, reject) => {
//         AMap.convertFrom(gps, "gps", function(status, result) {
//           if (result.info === "ok") {
//             const [{ lng, lat }] = result.locations; // Array.<LngLat>
//             item.lng = lng;
//             item.lat = lat;
//           } else {
//             // gps转失败了就重置为0
//             item.lng = 0;
//             item.lat = 0;
//           }
//           resolve(item);
//         });
//       });
//       promiseArr.push(promise);
//     }

//     return new Promise((resolve, reject) => {
//       tid = setTimeout(() => {
//         vm.$message({
//           type: "error",
//           message: "gps数据转化超时~"
//         });
//         resolve(promiseArr)
//       }, 30 * 1000)
//       Promise.all(promiseArr).then(() => {
//         resolve(promiseArr)
//         clearTimeout(tid)
//       }).catch(() => {
//         resolve(promiseArr)
//       })
//     })
//   } catch (error) {
//     return Promise.resolve(promiseArr);
//   }
// };

const convertHistoryGps = async list => {
  let sliceList = []
  let convertLocations = []
  try {
    // 先转化经纬度,都除以1000000
    list = list.map(item => {
      item.lng = item.lng / 1000000;
      item.lat = item.lat / 1000000;
      item.lngLat = [item.lng, item.lat]
      return item
    })
    // 再切分数组
    for (let i = 0; i < list.length; i = i + 40) {
      sliceList.push(list.slice(i, i + 40))
    }
    console.log('sliceList', sliceList)
    // 再通过高德来转
    for(let i = 0; i < sliceList.length; i++) {
      let lngLats = sliceList[i].map(item => item.lngLat)
      await new Promise((resolve, reject) => {
        AMap.convertFrom(lngLats, "gps", function(status, result) {
          if (result.info === "ok") {
            // console.log('convertFrom', result.locations)
            let locations = result.locations.map(location => {
              return {
                lng: location.lng,
                lat: location.lat
              }
            })
            // console.log('convert-index', i)
            convertLocations = convertLocations.concat(locations)
          }
          resolve()
        })
      })
    }
    convertLocations.forEach((item, index) => {
      list[index].lng = item.lng,
      list[index].lat = item.lat
    })

    return Promise.resolve(list)
  } catch (error) {
    return Promise.resolve(list);
  }
};

const alarmTypes = [
  {
    value: 0,
    label: "全部告警类型"
  },
  {
    value: 1,
    label: "位移告警"
  },
  {
    value: 2,
    label: "温度告警"
  },
  {
    value: 4,
    label: "电池低电压报警"
  },
  {
    value: 8,
    label: "电瓶低电压报警"
  },
  {
    value: 16,
    label: "断电报警(剪线报警)"
  },
  {
    value: 32,
    label: "震动报警"
  },
  {
    value: 64,
    label: "摔倒告警"
  },
  {
    value: 128,
    label: "超速告警"
  },
  {
    value: 256,
    label: "紧急告警"
  },
  {
    value: 512,
    label: "非法行驶告警"
  },
  {
    value: 1024,
    label: "防盗告警"
  }
]

const accountList = [
  {
    value: "account",
    label: "手机号"
  },
  {
    value: "imei",
    label: "终端IMEI"
  },
  {
    value: "record",
    label: "防火防盗备案号"
  },
  {
    value: "iccid",
    label: "IMSI"
  },
  {
    value: "cert",
    label: "身份证号"
  }
]

const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
}

const locationMonitor = {
  state: {
    currentLocationInfo: {},
    deviceParams: {},
    deviceIds: [],
    historyInfo: [],
    historylineArr: [],
    webDeviceInfo: [],
    allDeviceInfo: [],
    deviceInfo: {},
    alarmTypes: alarmTypes,
    accountList: accountList,
    pickerOptions: pickerOptions
  },
  mutations: {
    updateDeviceParams(state, deviceParams) {
      state.deviceParams = deviceParams;
    },
    updateHistoryInfo(state, historyInfo) {
      state.historyInfo = historyInfo
      // state.historyInfo = historyInfo.filter(item => {
      //   return item.lng > 0 && item.lat > 0
      // });
      console.log('historyInfo', historyInfo)
    },
    updateCurrentLocationInfo(state, currentLocationInfo) {
      state.currentLocationInfo = currentLocationInfo;
    },
    updateDeviceIds(state, deviceIds) {
      state.deviceIds = deviceIds;
    },
    updateWebDeviceInfo(state, webDeviceInfo) {
      console.log("webDeviceInfo", webDeviceInfo);
      state.webDeviceInfo = webDeviceInfo;
    },
    updateAllDeviceInfo(state, allDeviceInfo) {
      state.allDeviceInfo = allDeviceInfo;
    },
    updateDeviceInfo(state, deviceInfo) {
      state.deviceInfo = deviceInfo;
    }
  },
  actions: {
    async loseDeviceFile({ commit, rootState }, data) {
      try {
        const result = await $apis.loseDeviceFile({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "立案成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async clearHistoryInfo({ commit, rootState }, data) {
      try {
        const result = await $apis.clearHistoryInfo({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "清除历史轨迹成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getDeviceParams({ commit, rootState }, data) {
      try {
        const result = await $apis.getDeviceParams({
          token: getToken(rootState),
          ...data
        });
        commit("updateDeviceParams", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async setDeviceTrace({ commit, rootState }, data) {
      try {
        const result = await $apis.setDeviceTrace({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "设置追踪模式成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getDeviceInfo({ commit, rootState }, data) {
      try {
        const result = await $apis.getDeviceInfo({
          token: getToken(rootState),
          ...data
        });
        if (result.data) {
          let deviceInfos = result.data && result.data.length > 0 ? result.data : [result.data]
          await convertHistoryGps(deviceInfos);
          commit("updateDeviceInfo", deviceInfos[0]);
        } else {
          vm.$message({
            type: "error",
            message: "未查到关联设备信息!"
          });
          return Promise.reject()
        }
        // commit("updateWebDeviceInfo", [result.data]);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getDeviceInfoAndUpdate({ commit, rootState }, data) {
      try {
        const result = await $apis.getDeviceInfo({
          token: getToken(rootState),
          ...data
        });
        if (result.data) {
          let deviceInfos = result.data && result.data.length > 0 ? result.data : [result.data]
          await convertHistoryGps(deviceInfos);
          commit("updateDeviceInfo", deviceInfos[0]);
          commit("updateWebDeviceInfo", deviceInfos);
        } else {
          vm.$message({
            type: "error",
            message: "未查到当前设备信息!"
          });
          return Promise.reject(error)
        }
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getAllDevice({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllDevice({
          token: getToken(rootState),
          data
        });
        console.log('getAllDevice', result)
        await convertHistoryGps(result.data);
        commit("updateAllDeviceInfo", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getWebDevice({ commit, rootState }, data) {
      try {
        const result = await $apis.getWebDevice({
          token: getToken(rootState),
          data
        });
        await convertHistoryGps(result.data);
        commit("updateWebDeviceInfo", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getSomeDeviceInfo({ commit, rootState }, data) {
      try {
        const result = await $apis.getSomeDeviceInfo({
          token: getToken(rootState),
          data
        });
        commit("updateDeviceIds", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getHistoryInfo({ commit, rootState }, data) {
      try {
        const result = await $apis.getHistoryInfo({
          token: getToken(rootState),
          ...data
        });
        if (result.data && result.data.length > 0) {
          if (result.data && result.data.length > 1000) {
            vm.$message({
              type: "warning",
              message: "该设备历史轨迹数据较多，请耐心等待!"
            });
          }
          await convertHistoryGps(result.data);
          commit("updateHistoryInfo", result.data);
        } else {
          commit("updateHistoryInfo", []);
          vm.$message({
            type: "error",
            message: "未查到历史轨迹信息!"
          });
          return Promise.reject()
        }
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    }
  },
  getters: {
    deviceIds: state => state.deviceIds,
    webDeviceInfo: state => state.webDeviceInfo,
    deviceInfo: state => state.deviceInfo,
    allLocationInfo: state => {
      return state.webDeviceInfo.filter(item => {
        return item.lat > 0 && item.lng > 0;
      });
    },
    historyInfo: state => state.historyInfo,
    // historyLineInfo: state => state.historyInfo,
    historyLineInfo: state => {
      let firstTime = 0
      console.log('historyLineInfo-store', testServer.data)
      return state.historyInfo.map((item, index) => {
        let currentTime = new Date(`${item.signal_time}`).getTime() / 1000
        let delayTime = 0
        if (index == 0) {
          delayTime = currentTime
          firstTime = currentTime
        } else {
          delayTime = currentTime - firstTime
        }
        return {
          x: item.lng,
          y: item.lat,
          sp: item.speed,
          ag: item.course,
          tm: delayTime
        }
      })
    },
    historylineArr: state => {
      return state.historyInfo.filter(item => {
        return item.lng > 0 && item.lat > 0
      }).map(item => {
        return [item.lng, item.lat];
      });
    },
    alarmTypes: state => state.alarmTypes,
    accountList: state => state.accountList,
    pickerOptions: state => state.pickerOptions,
    currentLocationInfo: state => state.currentLocationInfo,
    deviceParams: state => state.deviceParams,
    allDeviceInfo: state => state.allDeviceInfo
  }
};

export default locationMonitor;
