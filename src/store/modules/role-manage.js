import { $apis, $util } from "@/helper";
import Vue from 'vue';
const vm = new Vue()

const getToken = (rootState) => {
  const { userInfo } = rootState.login
  return userInfo.token || ''
}

const RoleManage = {
  state: {
    allRoles: []
  },
  mutations: {
    updateAllRoles(state, allRoles) {
      if (allRoles && allRoles.length > 0) {
        state.allRoles = allRoles.map(item => {
          let authors = item.author.split(",");
          let roleNames = authors.map(roleType => $util.getRoleName(+roleType));
          item.roleNames = roleNames;
          return item;
        });
      }
    }
  },
  actions: {
    async getAllRoles({ commit, rootState }, data) {
      try {
        const result = await $apis.getAllRole({
          token: getToken(rootState)
        });
        commit("updateAllRoles", result.data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async addRole({ commit, rootState }, data) {
      try {
        const result = await $apis.addRole({
          token: getToken(rootState),
          data
        });
        vm.$message({
          type: "success",
          message: "添加成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async editRole({ commit, rootState }, data) {
      try {
        console.log("editRole", data);
        const result = await $apis.editRole({
          token: getToken(rootState),
          data
        });
        vm.$message({
          type: "success",
          message: "编辑成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    },
    async deleteRole({ commit, rootState }, data) {
      try {
        const result = await $apis.deleteRole(data.id, {
          token: getToken(rootState)
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
    }
  },
  getters: {
    allRoles: state => state.allRoles,
    nextRoleId: state => {
      let nexeRoleId = 0;
      state.allRoles.forEach(item => {
        if (item.id && item.code > nexeRoleId) {
          nexeRoleId = item.code;
        }
      });
      return nexeRoleId + 1;
    }
  }
};

export default RoleManage;
