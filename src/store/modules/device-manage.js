import { $apis } from "@/helper";
import Vue from 'vue';
const vm = new Vue()

const getToken = (rootState) => {
    const { userInfo } = rootState.login
    return userInfo.token || ''
  }

  
const Login = {
  state: {
    productList: [],
    productListTotal: 0,
    productPages: [],
    productPagesTotal: 0,
    firewareList: [],
    firewareListTotal: 0,
    produceLog: {}
  },
  mutations: {
    updateFirewareList(state, result) {
      state.firewareList = result.data
      state.firewareListTotal = result.total
    },
    updateProductList(state, productList) {
      state.productList = productList.data
      state.productListTotal = productList.total
    },
    updateProductPage(state, result) {
      state.productPages = result.data
      state.productPagesTotal = result.total
    },
    updateProduceLog(state, result) {
      state.produceLog = result.data
    }
  },
  actions: {
    async getFirmwareList({ commit, rootState }, data) {
      try {
        const result = await $apis.getFirmwareList({
            token: getToken(rootState),
            ...data
        });
        commit('updateFirewareList', result)
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async addFirmware({ commit, rootState }, data) {
      try {
        const result = await $apis.addFirmware({
            token: getToken(rootState),
            ...data
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteFirmware({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteFirmware({
            token: getToken(rootState),
            ...data
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getUpdateLog({ commit, rootState }, data) {
      try {
        const result = await $apis.getUpdateLog({
            token: getToken(rootState),
            ...data
        });
        commit('updateProduceLog', result)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async updateProduce({ commit, rootState }, data) {
      try {
        const result = await $apis.updateProduce({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "升级成功!"
        });
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getProductPage({ commit, rootState }, data) {
      try {
        const result = await $apis.getProductPage({
            token: getToken(rootState),
            ...data
        });
        commit('updateProductPage', result)
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteProduct({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteProduct({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "删除成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async importProducts({ commit, rootState }, data) {
      try {
        const result = await $apis.importProducts({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "编辑成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async searchProducts({ commit, rootState }, data) {
      try {
        const result = await $apis.searchProducts({
            token: getToken(rootState),
            ...data
        });
        commit('updateProductList', result)
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  },
  getters: {
    productList: state => state.productList,
    productListTotal: state => state.productListTotal,
    productPages: state => state.productPages,
    productPagesTotal: state => state.productPagesTotal,
    firewareList: state => state.firewareList,
    firewareListTotal: state => state.firewareListTotal,
    produceLog: state => state.produceLog
  }
};

export default Login;
