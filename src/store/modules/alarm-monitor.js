import { $apis } from "@/helper";
import Vue from "vue";
const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const convertGps = list => {
  let promiseArr = []
  try {
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
    } catch (error) {
      vm.$message({
        type: "error",
        message: "gps数据转化异常~"
      });
      return Promise.resolve(promiseArr);
    }
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
    async getAlarmAnalyse({ commit, rootState }, data) {
      try {
        const result = await $apis.getAlarmAnalyse({
          token: getToken(rootState),
          ...data
        });
        await convertGps(result.data)
        console.log('getAlarmAnalyse', result.data)
        commit("updateAlarmAnalyse", result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getAlarmLatest({ commit, rootState }, data) {
      try {
        const result = await $apis.getAlarmLatest({
            token: getToken(rootState),
            ...data
        });
        const convertResult = await convertGps(result.data)
        console.log('updateAlarmLatest', result.data)
        commit("updateAlarmLatest", convertResult);
        console.log(result);
      } catch (error) {
        console.log(error);
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
