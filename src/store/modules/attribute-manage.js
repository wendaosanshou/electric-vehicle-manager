import { $apis } from "@/helper";
import Vue from "vue";
const vm = new Vue();

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const attributeManage = {
    state: {
      attributeList: [],
      businessAttributeList: [],
      installAttributeList: [],
      orgAttribute: [],
      attributeListCount: 0,
      channelTypes: [{
        label: '全部',
        value: 0
      },{
        label: '业务办理点',
        value: 1
      },{
        label: '设备安装点',
        value: 2
      }]
    },
    mutations: {
      updateAttributeList(state, result) {
        state.attributeList = result.data
        state.attributeListCount = result.total
      },
      updateBusinessAttributeList(state, businessAttributeList) {
        state.businessAttributeList = businessAttributeList
      },
      updateInstallAttributeList(state, installAttributeList) {
        state.installAttributeList = installAttributeList
      },
      updateOrgAttribute(state, orgAttribute) {
        state.orgAttribute = orgAttribute
      }
    },
    actions: {
      async getBusinessAttributeList({ commit, rootState }, data) {
        try {
          const result = await $apis.getAttribute({
            token: getToken(rootState),
            pageSize: 100,
            pageIndex: 1,
            type: 1
          });
          console.log('updateBusinessAttributeList', result.data)
          commit("updateBusinessAttributeList", result.data);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async getInstallAttributeList({ commit, rootState }, data) {
        try {
          const result = await $apis.getAttribute({
            token: getToken(rootState),
            pageSize: 100,
            pageIndex: 1,
            type: 2
          });
          console.log('updateInstallAttributeList', result.data)
          commit("updateInstallAttributeList", result.data);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async getAttributeList({ commit, rootState }, data) {
        try {
          const result = await $apis.getAttribute({
            token: getToken(rootState),
            ...data
          });
          console.log('updateAttributeList', result.data)
          commit("updateAttributeList", result);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async getOrgAttribute({ commit, rootState }, data) {
        try {
          const result = await $apis.getAttribute({
            token: getToken(rootState),
            ...data
          });
          console.log('updateOrgAttribute', result.data)
          commit("updateOrgAttribute", result.data);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async deleteAttribute({ commit, rootState }, data) {
        try {
          const result = await $apis.deleteAttribute({
            token: getToken(rootState),
            ...data
          });
          vm.$message({
            type: "success",
            message: "删除成功~"
          });
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      async addAttribute({ commit, rootState }, data) {
        try {
          const result = await $apis.addAttribute({
            token: getToken(rootState),
            ...data
          });
          vm.$message({
            type: "success",
            message: "添加成功~"
          });
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }
    },
    getters: {
      attributeList: state => state.attributeList,
      attributeListCount: state => state.attributeListCount,
      channelTypes: state => state.channelTypes,
      orgAttribute:  state => state.orgAttribute,
      businessAttributeList: state => state.businessAttributeList,
      installAttributeList: state => state.installAttributeList
    }
  };
  
  export default attributeManage;
  