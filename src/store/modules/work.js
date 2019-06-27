import { $apis } from "@/helper";
import Vue from "vue";

const vm = new Vue();

const common = {
  state: {
    workList: []
  },
  mutations: {
    updateWorkList(state, workList) {
      state.workList = workList;
    }
  },
  actions: {
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
      }
    },
    async getWorkList({ commit }, data) {
      try {
        const result = await $apis.getWorkPage({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateWorkList", result.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    workList: state => state.workList
  }
};

export default common;
