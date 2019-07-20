import { $apis } from "@/helper";
import Vue from 'vue';
const vm = new Vue()

const Login = {
  state: {
    userInfo: {},
    business: {},
    role: {},
    loginForm: {},
    roleSidebarMenus: [],
    sidbarMenus: [
      {
        name: "定位监控",
        logo: "el-icon-location-outline",
        path: "location-monitor",
        index: "1",
        role: "1"
      },
      {
        name: "历史轨迹",
        logo: "el-icon-location-information",
        path: "history-track",
        index: "2",
        role: "2"
      },
      {
        name: "告警监控",
        logo: "el-icon-truck",
        path: "alarm-monitor",
        index: "3",
        role: "3"
      },
      {
        name: "告警分析",
        logo: "el-icon-ship",
        path: "alarm-analysis",
        index: "4",
        role: "4"
      },
      {
        name: "电子围栏",
        logo: "el-icon-postcard",
        path: "electric-fence",
        index: "5",
        role: "5"
      },
      {
        name: "办理状态查询",
        logo: "el-icon-search",
        path: "process-search",
        index: "6",
        role: "6"
      },
      {
        name: "办理状态管理",
        logo: "el-icon-set-up",
        path: "process-manage",
        index: "7",
        role: "7"
      },
      {
        name: "备案信息管理",
        logo: "el-icon-copy-document",
        path: "record-manage",
        index: "8",
        role: "8"
      },
      {
        name: "系统设置",
        logo: "el-icon-setting",
        path: "user-manage",
        index: "9",
        role: "9",
        children: [
          {
            name: "用户管理",
            logo: "el-icon-location",
            path: "user-manage",
            index: "9-1",
            role: "10"
          },
          {
            name: "角色权限管理",
            logo: "el-icon-location",
            path: "role-manage",
            index: "9-2",
            role: "11"
          },
          {
            name: "业务办理点管理",
            logo: "el-icon-location",
            path: "business-manage",
            index: "9-3",
            role: "12"
          },
          {
            name: "设备安装点管理",
            logo: "el-icon-location",
            path: "equipment-manage",
            index: "9-4",
            role: "13",
          },
          {
            name: "APP资讯管理",
            logo: "el-icon-location",
            path: "app-advisory",
            index: "9-5",
            role: "14"
          },
          {
            name: "设备管理",
            logo: "el-icon-location",
            path: "device-manage",
            index: "9-6",
            role: "15"
          },
          {
            name: "设备在线升级",
            logo: "el-icon-location",
            path: "device-update",
            index: "9-7",
            role: "16"
          },
          {
            name: "设备版本管理",
            logo: "el-icon-location",
            path: "device-version",
            index: "9-8",
            role: "17"
          }
        ]
      }
    ]
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
      console.log('updateUserInfo', data)
      state.userInfo = data.info
      state.business = data.business
      state.role = data.role
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
    loginForm: state => state.loginForm
  }
};

export default Login;
