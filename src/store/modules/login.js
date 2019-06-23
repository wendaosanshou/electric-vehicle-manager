import { $apis } from "@/helper";
import Vue from 'vue';
const vm = new Vue()

const Login = {
  state: {
    userInfo: {},
    business: {},
    role: {}
  },
  mutations: {
    updateUserInfo(state, data) {
      console.log('updateUserInfo', data)
      state.userInfo = data.info
      state.business = data.business
      state.role = data.role
    }
  },
  actions: {
    async userLogin({ commit }, data) {
      try {
        const result = await $apis.login(data);
        commit('updateUserInfo', result)
        vm.$message({
          type: "success",
          message: "登录成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
};

export default Login;
