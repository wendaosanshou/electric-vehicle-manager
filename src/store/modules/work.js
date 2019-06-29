import { $apis } from "@/helper";
import Vue from "vue";

const vm = new Vue();

const common = {
  state: {
    workList: [],
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
    async getContractHistory({ commit }, data) {
      try {
        const result = await $apis.getContractHistory({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit('updateContractHistory', result.data)
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async renewContract({ commit }, data) {
      try {
        const result = await $apis.renewContract({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "续费成功!"
        });
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getVehicleInfo({ commit }, data) {
      try {
        const result = await $apis.getVehicleInfo({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit('updateVehicleInfo', result.data)
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async modifyWorkItem({ commit }, data) {
      try {
        const result = await $apis.modifyWorkItem({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "修改成功!"
        });
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async setWorkDistribute({ commit }, data) {
      try {
        const result = await $apis.setWorkDistribute({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "派单成功!"
        });
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async getWorkList({ commit }, data) {
      try {
        const result = await $apis.getWorkPage({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateWorkList", result);
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
    workList: state => state.workList,
    workListTotal: state => state.workListTotal,
    workItem: state => state.workItem,
    vehicleInfo: state => state.vehicleInfo,
    contractHistory: state => state.contractHistory
  }
};

export default common;
