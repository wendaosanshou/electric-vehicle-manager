import Vue from "vue";
import { $apis } from "@/helper";
const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login;
  return userInfo.token || '';
};

const electricFence = {
  state: {
    allFence: [],
    fenceAlarm: [],
    fenceAlarmTotal: 0,
    fenceBounds: {},
  },
  mutations: {
    updateAllFence(state, allFence) {
      state.allFence = allFence;
    },
    updateFenceAlarm(state, result) {
      state.fenceAlarm = result.data;
      state.fenceAlarmTotal = result.total;
    },
    resetFenceAlarm(state) {
      state.fenceAlarm = [];
      state.fenceAlarmTotal = 0;
    },
    updateFenceBounds(state, fenceBounds) {
      state.fenceBounds = fenceBounds;
    },
  },
  actions: {
    async addFence({ commit, rootState }, data) {
      try {
        const result = await $apis.addFence({
          token: getToken(rootState),
          ...data,
        });
        vm.$message({
          type: 'success',
          message: '添加成功!',
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async modifyFence({ commit, rootState }, data) {
      try {
        const result = await $apis.modifyFence({
          token: getToken(rootState),
          ...data,
        });
        vm.$message({
          type: 'success',
          message: '更新成功!',
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async deleteFence({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteFence({
          token: getToken(rootState),
          ...data,
        });
        vm.$message({
          type: 'success',
          message: '删除成功!',
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getAllFence({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllFence({
          token: getToken(rootState),
          ...data,
        });
        commit('updateAllFence', result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getOneFence({ commit, rootState }, data) {
      try {
        const result = await $apis.getOneFence({
          token: getToken(rootState),
          ...data,
        });
        commit('updateAllFence', result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getFenceAlarm({ commit, rootState }, data) {
      try {
        const result = await $apis.getFenceAlarm({
          token: getToken(rootState),
          ...data,
        });
        if (result.data && result.data.length === 0) {
          vm.$message({
            type: 'error',
            message: '未查到违法情况或违章记录!',
          });
        }
        commit('updateFenceAlarm', result);
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
  },
  getters: {
    allFence: state => state.allFence,
    fenceAlarm: state => state.fenceAlarm,
    fenceBounds: state => state.fenceBounds,
    fenceAlarmTotal: state => state.fenceAlarmTotal,
  },
};

export default electricFence;
