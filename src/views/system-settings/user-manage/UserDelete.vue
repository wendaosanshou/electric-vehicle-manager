<template>
  <div class="dialog">
    <div class="el-btn crud-btn-delete crud-btn ly-flex-row" @click="onDialogShow">
      <i class="icon-btn-delete"></i>
      <span class="btn-content">删除用户</span>
    </div>
    <el-dialog
      class="dialog-fix"
      title="选择需要删除的用户"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-title">
        <page-title>选择需要删除的用户</page-title>
      </div>
      <div class="table-container">
        <el-table
          ref="userTable"
          class="table-fix table-disable-select-all"
          size="mini"
          :data="allUser"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="序号" width="55"></el-table-column>
          <el-table-column prop="account" label="账号（手机号）"></el-table-column>
          <el-table-column prop="name" label="账号姓名"></el-table-column>
          <el-table-column prop="site_name" label="所属组织（业务办理点）" width="130"></el-table-column>
          <el-table-column prop="role_name" label="角色名称" width="100"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogConfirm">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      selectItem: {}
    };
  },
  computed: {
    ...mapGetters(["allUser"]),
    isAllowDelete() {
      return this.selectItem && this.selectItem.id
    }
  },
  methods: {
    ...mapActions(['deleteSysUser']),
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange");
      if (val.length > 1) {
        this.$refs.userTable.clearSelection();
        this.$refs.userTable.toggleRowSelection(val.pop());
      }
    },
    handleSelect(val) {
      console.log("handleSelect", val);
      const [ selectItem ] = val
      this.selectItem = selectItem;
    },
    async onDialogConfirm() {
      if (this.selectItem && this.selectItem.id) {
        await this.deleteSysUser({
          id: this.selectItem.id
        })
        this.onDialogHide()
        this.$emit('onRefresh')
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      } else {
         this.$message({
          type: "info",
          message: "删除失败!"
        });
      }
    }
  },
  components: {
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/style/function.scss";

$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.process-dialog {
  padding: 0;
  .el-dialog .el-dialog__body {
    padding: 0 !important;
  }
}

.el-dialog__body {
  padding: 0 !important;
}

.btn-select {
  margin-left: d2r(10px);
  width: d2r(160px);
  height: d2r(38px);
}

.dialog-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: d2r(78px);
  padding-left: d2r(30px);
}

.table-container {
  padding: 0 d2r(30px) d2r(51px) d2r(30px);
}
</style>
