import { $apis } from "@/helper";
import Vue from "vue";

const vm = new Vue();

const convertGps = list => {
  let promiseArr = [];
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
  setTimeout(() => {
    
  }, 5000)
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve()
  //   }, 5000)
  // })
  try {
    return Promise.all(promiseArr);
  } catch (error) {
    return Promise.resolve(promiseArr);
  }
};

const locationMonitor = {
  state: {
    currentLocationInfo: {},
    deviceParams: {},
    deviceIds: [
      { lat_amap: 116.205467, lng_amap: 39.907761 },
      { lat_amap: 116.368904, lng_amap: 39.913423 },
      { lat_amap: 116.325467, lng_amap: 39.837761 },
      { lat_amap: 116.405467, lng_amap: 39.877761 },
      { lat_amap: 116.375467, lng_amap: 39.707761 },
      { lat_amap: 116.415467, lng_amap: 39.757761 },
      { lat_amap: 116.385467, lng_amap: 39.787761 }
    ],
    historyInfo: [],
    historylineArr: [
      [116.478935, 39.997761],
      [116.478939, 39.997825],
      [116.478912, 39.998549],
      [116.478912, 39.998549],
      [116.478998, 39.998555],
      [116.478998, 39.998555],
      [116.479282, 39.99856],
      [116.479658, 39.998528],
      [116.480151, 39.998453],
      [116.480784, 39.998302],
      [116.480784, 39.998302],
      [116.481149, 39.998184],
      [116.481573, 39.997997],
      [116.481863, 39.997846],
      [116.482072, 39.997718],
      [116.482362, 39.997718],
      [116.483633, 39.998935],
      [116.48367, 39.998968],
      [116.484648, 39.999861]
    ],
    allDeviceInfo: {},
    deviceInfo: {},
    alarmTypes: [
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
    ],
    accountList: [
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
    ],
    pickerOptions: {
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
      // state.deviceIds = deviceIds;
      state.deviceIds = [
        { lat_amap: 116.205467, lng_amap: 39.907761 },
        { lat_amap: 116.368904, lng_amap: 39.913423 },
        { lat_amap: 116.325467, lng_amap: 39.837761 },
        { lat_amap: 116.405467, lng_amap: 39.877761 },
        { lat_amap: 116.375467, lng_amap: 39.707761 },
        { lat_amap: 116.415467, lng_amap: 39.757761 },
        { lat_amap: 116.385467, lng_amap: 39.787761 }
      ];
    },
    updateAllDeviceInfo(state, allDeviceInfo) {
      console.log("allDeviceInfo", allDeviceInfo);
      state.allDeviceInfo = allDeviceInfo;
    },
    updateDeviceInfo(state, deviceInfo) {
      state.deviceInfo = deviceInfo;
    }
  },
  actions: {
    async loseDeviceFile({ commit }, data) {
      try {
        const result = await $apis.loseDeviceFile({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "立案成功!"
        });
      } catch (error) {
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
        console.log(error);
      }
    },
    async clearHistoryInfo({ commit }, data) {
      try {
        const result = await $apis.clearHistoryInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "清除历史轨迹成功!"
        });
      } catch (error) {
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
        console.log(error);
      }
    },
    async getDeviceParams({ commit }, data) {
      try {
        const result = await $apis.getDeviceParams({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateDeviceParams", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async setDeviceTrace({ commit }, data) {
      try {
        const result = await $apis.setDeviceTrace({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "设置追踪模式成功!"
        });
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getDeviceInfo({ commit }, data) {
      try {
        const result = await $apis.getDeviceInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });

        if (result.data && result.data.lat) {
          await convertGps([result.data]);
          commit("updateDeviceInfo", result.data);
          commit("updateAllDeviceInfo", [result.data]);
        } else {
          vm.$message({
            type: "error",
            message: "未查到对应gps信息!"
          });
          return Promise.reject()
        }
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getAllDeviceInfo({ commit }, data) {
      try {
        const result = await $apis.getAllDeviceInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        await convertGps(result.data);
        commit("updateAllDeviceInfo", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getSomeDeviceInfo({ commit }, data) {
      try {
        const result = await $apis.getSomeDeviceInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        commit("updateDeviceIds", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getHistoryInfo({ commit }, data) {
      try {
        const result = await $apis.getHistoryInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        await convertGps(result.data);
        console.log("convertGps", result.data);
        commit("updateHistoryInfo", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getAlarmInfo({ commit }, data) {
      try {
        const result = await $apis.getAlarmInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateDeviceIds", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    }
  },
  getters: {
    deviceIds: state => state.deviceIds,
    allDeviceInfo: state => state.allDeviceInfo,
    deviceInfo: state => state.deviceInfo,
    allLocationInfo: state => {
      return state.allDeviceInfo.filter(item => {
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
    deviceParams: state => state.deviceParams
  }
};

export default locationMonitor;
