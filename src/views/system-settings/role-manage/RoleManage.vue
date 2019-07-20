<template>
  <div class="role-manage">
    <div class="role-manage-title">
      <page-title>角色权限管理</page-title>
      <role-add-dialog @onRefreshRoleInfo="getAllRoles"></role-add-dialog>
    </div>
    <!-- {{sortAllRoles}} -->
    <div class="role-manage-content">
      <div class="role-manage-subtitle">当前角色</div>
      <el-table
        class="role-manage-table table-fix"
        :data="sortAllRoles"
        size="mini"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="code" label="角色编号" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="author" label="角色权限" align="center" width="350">
           <template slot-scope="scope">
            <div v-if="scope.row.roleNames.length === 1 && !scope.row.roleNames[0]">暂无任何权限信息</div>
             <div v-else>
               <el-tag
                class="role-tag"
                type="success"
                v-for="(item, index) in getFilterRoleNames(scope.row.roleNames)"
                :key="index"
                size="mini"
                disable-transitions>{{item}}</el-tag>
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="角色说明" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="280">
          <template slot-scope="scope">
            <div class="btn-container">
              <role-edit-dialog :data="deepClone(scope.row)" @onRefreshRoleInfo="getAllRoles"></role-edit-dialog>
              <div class="part-line"></div>
              <role-delete-dialog :data="deepClone(scope.row)" @onRefreshRoleInfo="getAllRoles"></role-delete-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import RoleAddDialog from "./RoleAddDialog";
import RoleEditDialog from "./RoleEditDialog";
import RoleDeleteDialog from "./RoleDeleteDialog";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['allRoles']),
    sortAllRoles() {
      return this.allRoles.sort((a, b) => a.code - b.code)
    }
  },
  methods: {
    ...mapActions(['getAllRoles', 'deleteRole']),
    handleEdit() {},
    handleDelete() {},
    getFilterRoleNames(roleNames) {
      return roleNames.filter(item => {
        return item.indexOf('商户APP') === -1
      })
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    }
  },
  components: {
    PageTitle,
    PageBack,
    RoleAddDialog,
    RoleEditDialog,
    RoleDeleteDialog
  },
  mounted() {
    this.getAllRoles()
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.role-manage-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: d2r(21px) d2r(59px) d2r(39px) d2r(41px);
}

.role-btn-add {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: d2r(180px);
  height: d2r(51px);
  font-size: d2r(16px);
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: #ffffff;
  background: #00d3b8;
}

.role-manage-content {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 0 d2r(58px) d2r(58px) d2r(65px);
  .role-manage-subtitle {
    text-align: left;
    color: #3b4859;
    font-size: d2r(16px);
  }
  .role-manage-table {
    margin-top: d2r(15px);
    .btn-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .part-line {
        width: d2r(10px);
      }
    }
  }
}

.role-tag {
  margin-left: d2r(6px);
  cursor: pointer;
}
</style>
