import { $apis, $util } from "@/helper";
import Vue from 'vue';
const vm = new Vue()

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
    async getAllRoles({ commit }, data) {
      try {
        const result = await $apis.getAllRole({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda="
        });
        commit("updateAllRoles", result.data);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async addRole({ commit }, data) {
      try {
        const result = await $apis.addRole({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        vm.$message({
          type: "success",
          message: "添加成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async editRole({ commit }, data) {
      try {
        console.log("editRole", data);
        const result = await $apis.editRole({
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda=",
          data
        });
        vm.$message({
          type: "success",
          message: "编辑成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
      }
    },
    async deleteRole({ commit }, data) {
      try {
        const result = await $apis.deleteRole(data.id, {
          token: "ywnjb3vudf8xxze1ntkymdk5ntc1oda="
        });
        vm.$message({
          type: "success",
          message: "删除成功!"
        });
        console.log(result);
      } catch (error) {
        console.log(error)
        vm.$message({
          type: "error",
          message: "服务器出小差了~"
        });
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
