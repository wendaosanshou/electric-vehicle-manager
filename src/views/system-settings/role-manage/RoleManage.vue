<template>
  <div class="role-manage">
    <div class="role-manage-title">
      <page-title>角色权限管理</page-title>
      <role-add-dialog></role-add-dialog>
    </div>
    <div class="role-manage-content">
      <div class="role-manage-subtitle">当前角色</div>
      <el-table
        class="role-manage-table table-fix"
        :data="tableData"
        size="mini"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="username" label="角色编号" width="180" align="center"></el-table-column>
        <el-table-column prop="sex" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="processPoint" label="角色权限" align="center"></el-table-column>
        <el-table-column prop="installationPoint" label="角色说明" align="center"></el-table-column>
        <el-table-column prop="processUser" label="操作" align="center" width="280">
          <template>
            <div class="btn-container">
              <role-edit-dialog></role-edit-dialog>
              <div class="part-line"></div>
              <role-delete-dialog></role-delete-dialog>
            </div>
            <!-- <el-button class="button-fix" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <!-- <el-button class="button-fix" icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import RoleAddDialog from "./RoleAddDialog";
import RoleEditDialog from "./RoleEditDialog";
import RoleDeleteDialog from "./RoleDeleteDialog";

export default {
  data() {
    return {
      tableData: [
        {
          username: "某某某",
          mobile: "18710923477",
          sex: "男",
          processPoint: "业务办理点1",
          installationPoint: "测试安装点",
          processUser: "商户1",
          businessAuditor: "商户2",
          auditTime: "审核时间",
          businessAuditor2: "职员1"
        },
        {
          username: "某某某",
          mobile: "18710923477",
          sex: "男",
          processPoint: "业务办理点1",
          installationPoint: "测试安装点",
          processUser: "商户1",
          businessAuditor: "商户2",
          auditTime: "审核时间",
          businessAuditor2: "职员1"
        },
        {
          username: "某某某",
          mobile: "18710923477",
          sex: "男",
          processPoint: "业务办理点1",
          installationPoint: "测试安装点",
          processUser: "商户1",
          businessAuditor: "商户2",
          auditTime: "审核时间",
          businessAuditor2: "职员1"
        }
      ]
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {}
  },
  components: {
    PageTitle,
    PageBack,
    RoleAddDialog,
    RoleEditDialog,
    RoleDeleteDialog
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
  padding: 0 d2r(58px) 0 d2r(65px);
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
</style>
