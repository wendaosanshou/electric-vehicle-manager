import { $apis } from "@/helper";
import Vue from 'vue';
import { construct } from '@/helper/json-tree'

const vm = new Vue()

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const Login = {
  state: {
    allUser: [],
    allUserTotal: 0,
    allOrg: [],
    businessAll: [],
    businessHandle: [],
    businessInstall: [],
    businessAllTree: [],
    businessHandleTree: [],
    businessInstallTree: [],
    infoWeb: [],
    selectUser: {},
    businessType: 1 // 业务类型，1-业务办理点 2-设备安装点
  },
  mutations: {
    udpateSelectUser(state, selectUser) {
      state.selectUser = selectUser
    },
    udpateAllUser(state, allUser) {
      state.allUser = allUser.data;
      state.allUserTotal = allUser.total
    },
    updateAllOrg(state, allOrg) {
      state.allOrg = allOrg
    },
    updateBusinessAll(state, businessAll) {
      let mapBusinessAll = businessAll.map(item => {
        item.label = item.name
        return item
      })
      state.businessAll = mapBusinessAll
      state.businessAllTree = construct(mapBusinessAll, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
    },
    updateBusinessHandle(state, businessHandle) {
      // 过滤掉非市，区，街道
      let allBusinessHandle = state.businessAll.filter(item => {
         // 办理点类型是市，区，街道才返回
        if ([1, 2, 3, 4].indexOf(item.organization_id) > -1) {
          return true
        }
        return false
      }).concat(businessHandle)
      
      // 去重
      let uniqueBusinessHandle = []
      for (let index = 0; index < allBusinessHandle.length; index++) {
        const currentHandle = allBusinessHandle[index]
        const allKeys = uniqueBusinessHandle.map(item => item.id)
        if (allKeys.indexOf(currentHandle.id) === -1) {
          currentHandle.label = currentHandle.name
          uniqueBusinessHandle.push(currentHandle)
        }
      }
      // console.log('businessHandle---', JSON.parse(JSON.stringify(uniqueBusinessHandle)))
      state.businessHandleTree = construct(uniqueBusinessHandle, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
      // 业务类型，新增业务的时候需要
      state.businessType = 1
      // console.log('businessHandleTree', JSON.parse(JSON.stringify(state.businessHandleTree)))
    },
    updateBusinessInstall(state, businessInstall) {
      // 过滤掉非市，区，街道
      let allBusinessInstall = state.businessAll.filter(item => {
        // 办理点类型是市，区，街道才返回
       if ([1, 2, 3].indexOf(item.organization_id) > -1) {
         return true
       }
       return false
     }).concat(businessInstall)
     
     // 去重
     let uniqueBusinessInstall = []
     for (let index = 0; index < allBusinessInstall.length; index++) {
       const currentInstall = allBusinessInstall[index]
       const allKeys = uniqueBusinessInstall.map(item => item.id)
       if (allKeys.indexOf(currentInstall.id) === -1) {
          currentInstall.label = currentInstall.name
         uniqueBusinessInstall.push(currentInstall)
       }
     }
     console.log('businessInstall---', JSON.parse(JSON.stringify(uniqueBusinessInstall)))
     state.businessInstallTree = construct(uniqueBusinessInstall, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
     // 业务类型，新增业务的时候需要
     state.businessType = 2
     console.log('businessInstallTree--', JSON.parse(JSON.stringify(state.businessInstallTree)))
    },
    updateInfoWeb(state, infoWeb) {
      state.infoWeb = infoWeb
    }
  },
  actions: {
    async getAllUser({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllUser({
          token: getToken(rootState),
          ...data
        });
        commit("udpateAllUser", result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async addSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.addSysUser({
          token: getToken(rootState),
          data
        });
        vm.$message({
          type: "success",
          message: "添加新用户成功!"
        });
        history.back()
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async editSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.editSysUser({
          token: getToken(rootState),
          data
        });
        vm.$message({
          type: "success",
          message: "编辑用户成功!"
        });
        history.back()
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async deleteSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteSysUser({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "删除用户成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getAllOrg({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllOrg({
          token: getToken(rootState),
          ...data
        });
        commit("updateAllOrg", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getAllBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllBusinessPoint({
          token: getToken(rootState),
          ...data
        });
        commit("updateBusinessAll", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async addBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.addBusinessPoint({
          token: getToken(rootState),
          data: data
        });
        vm.$message({
          type: "success",
          message: "添加成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async deleteBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteBusinessPoint({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "删除成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async editBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.editBusinessPoint({
          token: getToken(rootState),
          data: data
        });
        vm.$message({
          type: "success",
          message: "编辑成功!"
        });
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getBusinessHandle({ commit, rootState }, data) {
      try {
        const result = await $apis.getBusinessHandle();
        result.data = result.data || []
        commit('updateBusinessHandle', result.data)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getBusinessInstall({ commit, rootState }, data) {
      try {
        const result = await $apis.getBusinessInstall();
        result.data = result.data || []
        commit('updateBusinessInstall', result.data)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async getInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.getInfoWeb(data);
        commit('updateInfoWeb', result.data)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async addInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.addInfoWeb({
          token: getToken(rootState),
          data: data
        });
        vm.$message({
          type: "success",
          message: "添加成功!"
        });
        console.log(result)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async updateInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.updateInfoWeb({
          token: getToken(rootState),
          data: data
        });
        vm.$message({
          type: "success",
          message: "更新成功!"
        });
        console.log(result)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async deleteInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteInfoWeb({
          token: getToken(rootState),
          ...data
        });
        vm.$message({
          type: "success",
          message: "删除成功!"
        });
        console.log(result)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    }
  },
  getters: {
    allUser: state => state.allUser,
    allUserTotal: state => state.allUserTotal,
    selectUser: state => state.selectUser,
    allOrg: state => state.allOrg,
    businessAll: state => state.businessAll,
    businessType: state => state.businessType,
    businessHandle: state => state.businessHandle,
    businessHandleTree: state => state.businessHandleTree,
    businessInstallTree: state => state.businessInstallTree,
    businessAllTree: state => state.businessAllTree,
    infoWeb: state => state.infoWeb
  }
};

export default Login;
