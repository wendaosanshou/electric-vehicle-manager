import { $apis } from "@/helper";
import Vue from "vue";
const vm = new Vue();

const convertGps = list => {
    let promiseArr = []
    console.log('convertGps', list)
    for(let i = 0; i < list.length; i++) {
        let item = list[i]
        let { lng, lat } = item
        let gps = [ lng / 1000000, lat / 1000000 ]
        let promise = new Promise((resolve, reject) => {
            AMap.convertFrom(gps, 'gps', function (status, result) {
                if (result.info === 'ok') {
                    const [{lng, lat}] = result.locations; // Array.<LngLat>
                    item.lng = lng
                    item.lat = lat
                    resolve(item)
                }
            });
        })
        promiseArr.push(promise)
    }
    return Promise.all(promiseArr)
}

const Login = {
  state: {
    alarmLatest: {},
    alarmAnalyse: {},
    alarmLatestGps: []
  },
  mutations: {
    updateAlarmLatest(state, alarmLatest) {
      state.alarmLatest = alarmLatest;
    },
    updateAlarmLatestGps(state, alarmLatestGps) {
        state.alarmLatestGps = alarmLatestGps;
    },
    updateAlarmAnalyse(state, alarmAnalyse) {
      state.alarmAnalyse = alarmAnalyse;
    }
  },
  actions: {
    async getAlarmAnalyse({ commit }, data) {
      try {
        const result = await $apis.getAlarmAnalyse({
          token: 'ywnjb3vudf8xxze1ntkymdk5ntc1oda=',
          ...data
        });
        await convertGps(result.data)
        console.log('getAlarmAnalyse', result.data)
        commit("updateAlarmAnalyse", result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
        return Promise.reject(error);
      }
    },
    async getAlarmLatest({ commit }, data) {
      try {
        const result = await $apis.getAlarmLatest({
            token: 'ywnjb3vudf8xxze1ntkymdk5ntc1oda=',
            ...data
        });
        const convertResult = await convertGps(result.data)
        console.log('updateAlarmLatest', result.data)
        commit("updateAlarmLatest", convertResult);
        console.log(result);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
        return Promise.reject(error);
      }
    }
  },
  getters: {
    alarmLatest: state => state.alarmLatest,
    alarmAnalyse: state => state.alarmAnalyse,
    alarmLatestGps: state => state.alarmLatestGps
  }
};

export default Login;
