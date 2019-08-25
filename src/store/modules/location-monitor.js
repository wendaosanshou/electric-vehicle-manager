/* eslint-disable */
import Vue from "vue";
import dayjs from 'dayjs'
import { $apis } from "@/helper";
// import testServer from '@/test-service.json'

const vm = new Vue();

const getToken = rootState => {
  const { userInfo } = rootState.login;
  return userInfo.token || "";
};

// const convertAmapGps = async list => {
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

const convertAmapGps = async list => {
  let sliceList = []
  let convertLocations = []
  try {
    // 先转化经纬度,都除以1000000
    list = list.map(item => {
      item.lng = item.lng / 1000000;
      item.lat = item.lat / 1000000;
      item.lngLat = [item.lng, item.lat]
      return item
    }).sort((a, b) => {
      return a.signal_time - b.signal_time
    })
    // console.log('before', JSON.parse(JSON.stringify(list)))
    // 再切分数组
    for (let i = 0; i < list.length; i = i + 40) {
      sliceList.push(list.slice(i, i + 40))
    }
    // console.log('sliceList', sliceList)
    // 再通过高德来转
    for(let i = 0; i < sliceList.length; i++) {
      let lngLats = sliceList[i].map(item => item.lngLat)
      await new Promise((resolve, reject) => {
        AMap.convertFrom(lngLats, "gps", function(status, result) {
          if (result.info === "ok") {
            let locations = result.locations.map(location => {
              return {
                lng: location.lng,
                lat: location.lat
              }
            })
            convertLocations = convertLocations.concat(locations)
          }
          resolve()
        })
      })
    }
    convertLocations.forEach((item, index) => {
      list[index].lng = item.lng
      list[index].lat = item.lat
      list[index].lngLat = [item.lng, item.lat]
    })
    // console.log('after', JSON.parse(JSON.stringify(list)), convertLocations)
    return Promise.resolve(list)
  } catch (error) {
    return Promise.resolve(list);
  }
};

const convertHistoryGps = async list => {
  let preItem = list[0]
  let historyList = []
  let preIndex = 0
  // list = list.sort((a, b) => {
  //   return a.signal_time - b.signal_time
  // }).filter((item, index) => {
  //   if (index > 0) {
  //     let prevItem = list[index - 1]
  //     if (item.signal_time === prevItem.signal_time && item.lng === prevItem.lng && item.lat === prevItem.lat) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   } else {
  //     return true
  //   }
  // })
  list = list.sort((a, b) => {
    return a.signal_time - b.signal_time
  })
  console.log('convertHistoryGps', JSON.parse(JSON.stringify(list)), list.length)
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    let distance = AMap.GeometryUtil.distance(preItem.lngLat, item.lngLat);
    let costTime = dayjs(item.signal_time).diff(dayjs(preItem.signal_time), 'second')
    // console.log(distance, costTime, distance / costTime)
    preItem = item
    // console.log(distance, costTime)
    // 两个点直接距离大于1公里则表示不是一条轨迹
    if (distance > 5000) {
      historyList.push(list.slice(preIndex, index - 1))
      preIndex = index
      // 两个相邻点时间超过4小时且距离大于1千米
    } else if (costTime > 60 * 60 * 1000 * 4 && distance > 1000) {
      historyList.push(list.slice(preIndex, index - 1))
      preIndex = index
    }
  }
  historyList.push(list.slice(preIndex, list.length))
  console.log('historyList', historyList)
  return Promise.resolve(historyList)
}

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
    label: "ICCID"
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
    historyAlarm: [],
    trickAlarms: [],
    trickList: [],
    trickAlarmId: 0,
    deviceInfo: {},
    accountList: accountList,
    pickerOptions: pickerOptions
  },
  mutations: {
    updateDeviceParams(state, deviceParams) {
      state.deviceParams = deviceParams;
    },
    updateHistoryInfo(state, historyInfo) {
      state.historyInfo = historyInfo
    },
    resetTrackAlarms(state, trickAlarm) {
      state.trickAlarms = []
      state.trickList = []
    },
    updateTrackAlarmId(state, trickAlarmId) {
      state.trickAlarmId = trickAlarmId
    },
    updateTrackAlarms(state, points) {
      if (points && points.length > 0) {
        let [point] = points
        let ids = state.trickAlarms.map(item => item.id)
        let filterPoints = points.filter(item => ids.indexOf(item.id) === -1)
        state.trickAlarmId = point.id
        state.trickAlarms = state.trickAlarms.concat(filterPoints)
      }
    },
    updateTrackList(state, points) {
      if (points && points.length > 0) {
        let ids = state.trickList.map(item => item.id)
        let filterPoints = points.filter(item => ids.indexOf(item.id) === -1)
        state.trickList = state.trickList.concat(filterPoints)
      }
    },
    updateHistoryAlarm(state, historyAlarm) {
      state.historyAlarm = historyAlarm
    },
    clearHistoryInfo(state) {
      state.historyInfo = []
      state.historyAlarm = []
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
    },
    updateUserInfoGps(state, userInfoGps) {

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
        // vm.$message({
        //   type: "success",
        //   message: "设置追踪模式成功!"
        // });
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
          await convertAmapGps(deviceInfos);
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
          await convertAmapGps(deviceInfos);
          console.log(deviceInfos)
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
        await convertAmapGps(result.data);
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
        await convertAmapGps(result.data);
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
        const result = await $apis.getAlarmHistoryInfo({
          token: getToken(rootState),
          ...data
        });
        if (result.alarm && result.alarm.length > 0) {
          await convertAmapGps(result.alarm);
          commit('updateHistoryAlarm', result.alarm)
        }

        if (result.data && result.data.length > 0) {
          await convertAmapGps(result.data);
          let historyList = await convertHistoryGps(result.data);
          commit("updateHistoryInfo", historyList);
        } else {
          commit("updateHistoryInfo", []);
          vm.$message({
            type: "error",
            message: "暂无轨迹数据~"
          });
          return Promise.reject()
        }
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getUserInfoGps({ commit, rootState }, data) {
      try {
        const result = await $apis.getUserInfoGps({
          token: getToken(rootState),
          ...data
        });
        if (result.alarm && result.alarm.length > 0) {
          await convertAmapGps(result.alarm);
          commit('updateTrackAlarms', result.alarm)
        }
        if (result.data && result.data.length > 0) {
          await convertAmapGps(result.data);
          commit("updateTrackList", result.data);
        } else {
          commit("updateTrackList", []);
          vm.$message({
            type: "error",
            message: "暂无轨迹数据~"
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
      return state.historyInfo.map((item, index) => {
        let utcOffset =  dayjs(`${item.signal_time}`).utcOffset()
        let currentTime =
          dayjs(`${item.signal_time}`)
            .subtract(utcOffset, "minute")
            .valueOf() / 1000;
        let delayTime = 0
        if (index === 0) {
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
    accountList: state => state.accountList,
    pickerOptions: state => state.pickerOptions,
    currentLocationInfo: state => state.currentLocationInfo,
    deviceParams: state => state.deviceParams,
    allDeviceInfo: state => state.allDeviceInfo,
    historyAlarm: state => state.historyAlarm,
    trickAlarms: state => state.trickAlarms,
    trickAlarmId: state => state.trickAlarmId,
    trickList: state => state.trickList
  }
};

export default locationMonitor;
