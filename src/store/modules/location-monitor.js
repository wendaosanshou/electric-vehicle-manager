import { $apis } from "@/helper";
import Vue from "vue";

const vm = new Vue();

const getToken = rootState => {
  const { userInfo } = rootState.login;
  return userInfo.token || "";
};

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
    value: 3,
    label: "内置电池低电压告警"
  },
  {
    value: 4,
    label: "电瓶低电压告警"
  },
  {
    value: 16,
    label: "外置电源断电告警"
  },
  {
    value: 32,
    label: "震动告警"
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
    label: "防盗备案号"
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
      state.historyInfo = historyInfo;
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
        await convertGps([result.data]);
        commit("updateDeviceInfo", result.data);
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
        await convertGps([result.data]);
        commit("updateDeviceInfo", result.data);
        commit("updateWebDeviceInfo", [result.data]);
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
        await convertGps(result.data);
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
        await convertGps(result.data);
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
        await convertGps(result.data);
        console.log("convertGps", result.data);
        commit("updateHistoryInfo", result.data);
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
    historylineArr: state => {
      return state.historyInfo.map(item => {
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
