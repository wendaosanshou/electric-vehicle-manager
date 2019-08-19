import Vue from 'vue';
import { $apis } from "@/helper";

const vm = new Vue()

const getToken = rootState => {
    const { userInfo } = rootState.login;
    return userInfo.token || "";
};

const Login = {
  state: {
    allGuide: [],
    allGuideTotal: 0
  },
  mutations: {
    updateAllGuide(state, result) {
      state.allGuide = result.data
      state.allGuideTotal = result.total
    }
  },
  actions: {
    async addGuide({ commit, rootState }, data) {
        try {
          const result = await $apis.addGuide({
            token: getToken(rootState),
            ...data
          });
          vm.$message({
            type: "success",
            message: "添加成功!"
          });
          console.log(result);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async getAllGuide({ commit, rootState }, data) {
        try {
          const result = await $apis.getAllGuide({
            token: getToken(rootState),
            ...data
          });
          commit('updateAllGuide', result)
          console.log(result);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async deleteGuide({ commit, rootState }, data) {
        try {
          const result = await $apis.deleteGuide({
            token: getToken(rootState),
            ...data
          });
          vm.$message({
            type: "success",
            message: "删除成功!"
          });
          console.log(result);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
  },
  getters: {
    allGuide: state => state.allGuide,
    allGuideTotal: state => state.allGuideTotal
  }
};

export default Login;
