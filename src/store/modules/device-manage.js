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
    firewareList: []
  },
  mutations: {
    updateFirewareList(state, firewareList) {
      state.firewareList = firewareList
    },
    updateProductList(state, productList) {
      state.productList = productList.data
      state.productListTotal = productList.total
    },
    updateProductPage(state, result) {
      state.productPages = result.data
      state.productPagesTotal = result.total
    }
  },
  actions: {
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
    async getFirmwareList({ commit, rootState }, data) {
      try {
        const result = await $apis.getFirmwareList({
            token: getToken(rootState),
            ...data
        });
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
    firewareList: state => state.firewareList
  }
};

export default Login;
