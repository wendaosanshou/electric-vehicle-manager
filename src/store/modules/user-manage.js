import { $apis } from "@/helper";
import Vue from 'vue';
import { construct, destruct } from '@aximario/json-tree';

const vm = new Vue()

const Login = {
  state: {
    allUser: [],
    allOrg: [],
    businessAll: [],
    businessHandle: [],
    businessInstall: [],
    infoWeb: [],
    selectUser: {},
    businessType: 1 // 业务类型，1-业务办理点 2-设备安装点
  },
  mutations: {
    udpateSelectUser(state, selectUser) {
      state.selectUser = selectUser
    },
    udpateAllUser(state, allUser) {
      state.allUser = allUser;
    },
    updateAllOrg(state, allOrg) {
      state.allOrg = allOrg
    },
    updateBusinessAll(state, businessAll) {
      console.log('updateAllBusinessPoint', businessAll)
      state.businessAll = businessAll.map(item => {
        item.label = item.name
        return item
      })
    },
    updateBusinessHandle(state, businessHandle) {
      // 过滤掉非市，区，街道
      let allBusinessHandle = state.businessAll.filter(item => {
         // 办理点类型是市，区，街道才返回
        if ([1, 2, 3].indexOf(item.organization_id) > -1) {
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
          uniqueBusinessHandle.push(currentHandle)
        }
      }
      // 赋值并且添加label属性
      state.businessHandle = uniqueBusinessHandle.map(item => {
        item.label = item.name
        return item
      })
      // 业务类型，新增业务的时候需要
      state.businessType = 1
      console.log('businessHandle---', JSON.parse(JSON.stringify(state.businessHandle)))
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
         uniqueBusinessInstall.push(currentInstall)
       }
     }
     // 赋值并且添加label属性
     state.businessInstall = uniqueBusinessInstall.map(item => {
       item.label = item.name
       return item
     })
     // 业务类型，新增业务的时候需要
     state.businessType = 2
     console.log('businessInstall---', JSON.parse(JSON.stringify(state.businessInstall)))
    },
    updateInfoWeb(state, infoWeb) {
      state.infoWeb = infoWeb
    }
  },
  actions: {
    async getAllUser({ commit }, data) {
      try {
        const result = await $apis.getAllUser({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("udpateAllUser", result.data);
      } catch (error) {
        console.log(error);
      }
    },
    async addSysUser({ commit }, data) {
      try {
        const result = await $apis.addSysUser({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        vm.$message({
          type: "success",
          message: "添加新用户成功!"
        });
        history.back()
      } catch (error) {
        console.log(error);
      }
    },
    async editSysUser({ commit }, data) {
      try {
        const result = await $apis.editSysUser({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        vm.$message({
          type: "success",
          message: "编辑用户成功!"
        });
        history.back()
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSysUser({ commit }, data) {
      try {
        const result = await $apis.deleteSysUser({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "删除用户成功!"
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getAllOrg({ commit }, data) {
      try {
        const result = await $apis.getAllOrg({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateAllOrg", result.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getAllBusinessPoint({ commit }, data) {
      try {
        const result = await $apis.getAllBusinessPoint({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        commit("updateBusinessAll", result.data);
      } catch (error) {
        console.log(error);
      }
    },
    async addBusinessPoint({ commit }, data) {
      try {
        const result = await $apis.addBusinessPoint({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data: data
        });
        vm.$message({
          type: "success",
          message: "添加成功!"
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBusinessPoint({ commit }, data) {
      try {
        const result = await $apis.deleteBusinessPoint({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          ...data
        });
        vm.$message({
          type: "success",
          message: "删除成功!"
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editBusinessPoint({ commit }, data) {
      try {
        const result = await $apis.editBusinessPoint({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data: data
        });
        vm.$message({
          type: "success",
          message: "编辑成功!"
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getBusinessHandle({ commit }, data) {
      try {
        const result = await $apis.getBusinessHandle();
        commit('updateBusinessHandle', result.data)
      } catch (error) {
        console.log(error);
      }
    },
    async getBusinessInstall({ commit }, data) {
      try {
        const result = await $apis.getBusinessInstall();
        commit('updateBusinessInstall', result.data)
      } catch (error) {
        console.log(error);
      }
    },
    async getInfoWeb({ commit }, data) {
      try {
        const result = await $apis.getInfoWeb(data);
        commit('updateInfoWeb', result.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    allUser: state => state.allUser,
    selectUser: state => state.selectUser,
    allOrg: state => state.allOrg,
    businessAll: state => state.businessAll,
    businessType: state => state.businessType,
    businessHandleTree: state => {
      return construct(state.businessHandle, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
    },
    businessInstallTree: state => {
      return construct(state.businessInstall, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
    },
    businessAllTree: state => {
      return construct(state.businessAll, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
    },
    infoWeb: state => state.infoWeb
  }
};

export default Login;
