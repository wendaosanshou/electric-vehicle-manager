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
    produceLog: [],
    apkList: [],
    apkListTotal: 0,
    feedbackList: [],
    feedbackListTotal: 0,
    feedbackDetail: {}
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
    },
    updateApkList(state, result) {
      state.apkList = result.data
      state.apkListTotal = result.total
    },
    updateFeedbackList(state, result) {
      state.feedbackList = result.data
      state.feedbackListTotal = result.total
    },
    updateFeedbackDetail(state, result) {
      state.feedbackDetail = {
        contract: result.contract,
        device: result.device,
        feedback: result.feedback,
        user: result.user,
        vehicle: result.vehicle
      }
    }
  },
  actions: {
    async rebotDevice({ commit, rootState }, data) {
      try {
        const result = await $apis.rebotDevice({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "发送重启命令成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async processFeedback({ commit, rootState }, data) {
      try {
        const result = await $apis.processFeedback({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "处理成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getFeedbackDetail({ commit, rootState }, data) {
      try {
        const result = await $apis.getFeedbackDetail({
            token: getToken(rootState),
            ...data
        });
        commit('updateFeedbackDetail', result)
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getFeedback({ commit, rootState }, data) {
      try {
        const result = await $apis.getFeedback({
            token: getToken(rootState),
            ...data
        });
        commit('updateFeedbackList', result)
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async deleteApkVersion({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteApkVersion({
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
    async addApkFile({ commit, rootState }, data) {
      try {
        const result = await $apis.addApkFile({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "新增成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async getApkList({ commit, rootState }, data) {
      try {
        const result = await $apis.getApkList({
            token: getToken(rootState),
            ...data
        });
        commit('updateApkList', result)
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
    async batchImportProducts({ commit, rootState }, data) {
      try {
        const result = await $apis.batchImportProducts({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "批量导入文件上传成功!"
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
          message: "添加成功!"
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
    },
    async modifyProducts({ commit, rootState }, data) {
      try {
        const result = await $apis.modifyProducts({
            token: getToken(rootState),
            ...data
        });
        vm.$message({
          type: "success",
          message: "修改成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
  },
  getters: {
    productList: state => state.productList,
    productListTotal: state => state.productListTotal,
    productPages: state => state.productPages,
    productPagesTotal: state => state.productPagesTotal,
    firewareList: state => state.firewareList,
    firewareListTotal: state => state.firewareListTotal,
    produceLog: state => state.produceLog,
    apkList: state => state.apkList,
    apkListTotal: state => state.apkListTotal,
    feedbackList: state => state.feedbackList,
    feedbackListTotal: state => state.feedbackListTotal,
    feedbackDetail: state => state.feedbackDetail
  }
};

export default Login;
