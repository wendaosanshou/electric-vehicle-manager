/* eslint-disable */
import Vue from 'vue'
import { $apis } from '@/helper'
import { construct } from '@/helper/json-tree'

const vm = new Vue()

const getToken = rootState => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const Login = {
  state: {
    allUser: [],
    allUserTotal: 0,
    exportAllUser: [],
    allOrg: [],
    businessAll: [],
    businessHandle: [],
    businessInstall: [],
    businessAllTree: [],
    businessHandleTree: [],
    businessInstallTree: [],
    infoWeb: [],
    appInfoCount: 0,
    selectUser: {},
    businessType: 1 // 业务类型，1-业务办理点 2-设备安装点
  },
  mutations: {
    udpateSelectUser(state, selectUser) {
      state.selectUser = selectUser
    },
    udpateExportAllUser(state, allUser) {
      state.exportAllUser = allUser.data
    },
    udpateAllUser(state, allUser) {
      state.allUser = allUser.data
      state.allUserTotal = allUser.total
    },
    updateAllOrg(state, allOrg) {
      state.allOrg = allOrg
    },
    updateBusinessAll(state, businessAll) {
      // console.log('businessAll', businessAll)
      let mapBusinessAll = businessAll.map(item => {
        const { type, name, attribute_name } = item
        let label = name
        if (type === 1) {
          label = `${name} (${attribute_name}-办理点)`
        } else if (type === 2) {
          label = `${name} (${attribute_name}-安装点)`
        }
        item.label = label
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
      let allBusinessHandle = state.businessAll.filter(item => {
        return item.type === 1 || item.type === 0
      })
      state.businessHandleTree = construct(allBusinessHandle, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
      // 业务类型，新增业务的时候需要
      // state.businessType = 1
    },
    updateBusinessType(state, businessType) {
      state.businessType = businessType
    },
    updateBusinessInstall(state, businessInstall) {
      let allBusinessHandle = state.businessAll.filter(item => {
        return item.type === 2 || item.type === 0
      })
      state.businessInstallTree = construct(allBusinessHandle, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
      })
      // 业务类型，新增业务的时候需要
      // state.businessType = 2
    },
    updateAppInfo(state, result) {
      state.infoWeb = result.data
      state.appInfoCount = result.total
    }
  },
  actions: {
    async getExportAllUser({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllUser({
          token: getToken(rootState),
          ...data
        })
        commit('udpateExportAllUser', result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getAllUser({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllUser({
          token: getToken(rootState),
          ...data
        })
        commit('udpateAllUser', result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async addSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.addSysUser({
          token: getToken(rootState),
          data
        })
        vm.$message({
          type: 'success',
          message: '添加新用户成功!'
        })
        history.back()
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async editSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.editSysUser({
          token: getToken(rootState),
          data
        })
        vm.$message({
          type: 'success',
          message: '编辑用户成功!'
        })
        history.back()
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteSysUser({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteSysUser({
          token: getToken(rootState),
          ...data
        })
        vm.$message({
          type: 'success',
          message: '删除用户成功!'
        })
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getAllOrg({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllOrg({
          token: getToken(rootState),
          ...data
        })
        commit('updateAllOrg', result.data)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getAllBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllBusinessPoint({
          token: getToken(rootState),
          ...data
        })
        commit('updateBusinessAll', result.data)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async addBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.addBusinessPoint({
          token: getToken(rootState),
          data: data
        })
        vm.$message({
          type: 'success',
          message: '添加成功!'
        })
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteBusinessPoint({
          token: getToken(rootState),
          ...data
        })
        vm.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async editBusinessPoint({ commit, rootState }, data) {
      try {
        const result = await $apis.editBusinessPoint({
          token: getToken(rootState),
          data: data
        })
        vm.$message({
          type: 'success',
          message: '修改成功!'
        })
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getBusinessHandle({ commit, rootState }, data) {
      try {
        const result = await $apis.getBusinessHandle()
        result.data = result.data || []
        commit('updateBusinessHandle', result.data)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getBusinessInstall({ commit, rootState }, data) {
      try {
        const result = await $apis.getBusinessInstall()
        result.data = result.data || []
        commit('updateBusinessInstall', result.data)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.getInfoWeb(data)
        commit('updateAppInfo', result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async addInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.addInfoWeb({
          token: getToken(rootState),
          data: data
        })
        vm.$message({
          type: 'success',
          message: '添加成功!'
        })
        console.log(result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async updateInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.updateInfoWeb({
          token: getToken(rootState),
          data: data
        })
        vm.$message({
          type: 'success',
          message: '更新成功!'
        })
        console.log(result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteInfoWeb({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteInfoWeb({
          token: getToken(rootState),
          ...data
        })
        vm.$message({
          type: 'success',
          message: '删除成功!'
        })
        console.log(result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  },
  getters: {
    allUser: state => state.allUser,
    allUserTotal: state => state.allUserTotal,
    exportAllUser: state => state.exportAllUser,
    selectUser: state => state.selectUser,
    allOrg: state => state.allOrg,
    businessAll: state => state.businessAll,
    businessType: state => state.businessType,
    businessHandle: state => state.businessHandle,
    businessHandleTree: state => state.businessHandleTree,
    businessInstallTree: state => state.businessInstallTree,
    businessAllTree: state => state.businessAllTree,
    infoWeb: state => state.infoWeb,
    appInfoCount: state => state.appInfoCount
  }
}

export default Login
