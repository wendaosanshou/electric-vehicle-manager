import Vue from 'vue';
import { $apis } from "@/helper";

const vm = new Vue()

const Login = {
  state: {
    userInfo: {},
    business: {},
    role: {},
    loginForm: {},
    roleSidebarMenus: []
  },
  mutations: {
    updateLoginForm(state, loginForm) {
      state.loginForm = loginForm
    },
    loginout(state) {
      state.userInfo = []
      state.business = []
      state.role = []
    },
    updateUserInfo(state, data) {
      state.userInfo = data.info
      state.business = data.business
      state.role = data.role
      state.role.author = `${state.role.author},24`
      // state.role = `${data.role},24`
    }
  },
  actions: {
    async resetPassword({ commit }, data) {
      try {
        const result = await $apis.resetPassword(data);
        vm.$message({
          type: "success",
          message: "重置密码成功,请重新登录!"
        });
        return result
      } catch (error) {
        vm.$message({
          type: "error",
          message: "重置密码失败!"
        });
        console.log(error)
        return Promise.reject(error)
      }
    },
    async userLogin({ commit }, data) {
      try {
        const result = await $apis.login(data);
        const { role } = result
        if (role && role.author.length > 0) {
          commit('updateUserInfo', result)
          vm.$message({
            type: "success",
            message: "登录成功!"
          });
          console.log(result);
        } else {
          vm.$message({
            type: "error",
            message: "当前用户无权限访问!"
          });
          return Promise.reject(result)
        }
        return result
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    role: state => state.role,
    business: state => state.business,
    loginForm: state => state.loginForm,
    isHandleUser: (state) => {
      const { name } = state.role
      // 如果name为7则是业务办理员
      return name && name.indexOf('业务办理员') > -1
    },
    isStoreManager: (state) => {
      const { name } = state.role
      return name && name.indexOf('门店主管') > -1
    },
    isRootAdmin: (state) => {
      const { account } = state.userInfo
      return account && account === 'admin'
    },
    isSuperAdmin: (state) => {
      const { code } = state.role
      return code && code === 1
    }
  }
};

export default Login;
