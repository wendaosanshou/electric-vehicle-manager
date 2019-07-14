import { $apis } from "@/helper";
import Vue from "vue";

const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const common = {
  state: {
    workList: [],
    exportWorkList: [],
    workListTotal: 10,
    workItem: {},
    vehicleInfo: {},
    contractHistory: []
  },
  mutations: {
    updateWorkList(state, workList) {
      const { data, total } = workList
      state.workList = data;
      state.workListTotal = total
    },
    updateExportWorkList(state, workList) {
      const { data } = workList
      state.exportWorkList = data;
    },
    updateVehicleInfo(state, vehicleInfo) {
      state.vehicleInfo = vehicleInfo
    },
    updateWorkItem(state, workItem) {
      state.workItem = workItem
    },
    updateContractHistory(state, contractHistory) {
      state.contractHistory = contractHistory
    }
  },
  actions: {
    async getContractHistory({ commit, rootState }, data) {
      try {
        const result = await $apis.getContractHistory({
          token: getToken(rootState),
          ...data
        });
        commit('updateContractHistory', result.data)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async renewContract({ commit, rootState }, data) {
      try {
        const result = await $apis.renewContract({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "续费成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getVehicleInfo({ commit, rootState }, data) {
      try {
        const result = await $apis.getVehicleInfo({
          token: getToken(rootState),
          ...data
        });
        commit('updateVehicleInfo', result.data)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async modifyWorkItem({ commit, rootState }, data) {
      try {
        const result = await $apis.modifyWorkItem({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "修改成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
        return Promise.reject(error)
      }
    },
    async setWorkDistribute({ commit, rootState }, data) {
      try {
        const result = await $apis.setWorkDistribute({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "派单成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getWorkList({ commit, rootState }, data) {
      try {
        const result = await $apis.getWorkPage({
          token: getToken(rootState),
          ...data
        });
        commit("updateWorkList", result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getExportWorkList({ commit, rootState }, data) {
      try {
        const result = await $apis.getWorkPage({
          token: getToken(rootState),
          ...data
        });
        commit("updateWorkList", result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getExportWorkList({ commit, rootState }, data) {
      try {
        const result = await $apis.getWorkPage({
          token: getToken(rootState),
          ...data
        });
        commit("updateExportWorkList", result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    }
  },
  getters: {
    workList: state => state.workList,
    workListTotal: state => state.workListTotal,
    workItem: state => state.workItem,
    vehicleInfo: state => state.vehicleInfo,
    contractHistory: state => state.contractHistory,
    exportWorkList: state => state.exportWorkList
  }
};

export default common;
