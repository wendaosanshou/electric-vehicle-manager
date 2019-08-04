<template>
  <div class="dialog">
    <!-- <div class="el-btn crud-btn-delete crud-btn ly-flex-row" @click="onDialogShow">
      <i class="el-icon-folder-remove icon-btn-delete"></i>
      <span class="btn-content">删除用户</span>
    </div> -->
    <el-button class="button-fix" icon="el-icon-delete" type="danger" size="mini" @click="onDialogShow">删除</el-button>
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
          :data="deleteUsers"
          border
          style="width: 100%"
        >
          <el-table-column prop="index" align="center" label="序号" width="55"></el-table-column>
          <el-table-column prop="account" align="center" label="账号（手机号）"></el-table-column>
          <el-table-column prop="name" align="center" label="账号姓名"></el-table-column>
          <el-table-column prop="site_name" align="center" label="所属组织"></el-table-column>
          <el-table-column prop="site_type" align="center" label="组织类型">
            <template slot-scope="scope">
              {{getAttributeTypeLable(scope.row.site_type)}}
            </template>
          </el-table-column>
          <el-table-column prop="attribute" align="center" label="渠道属性"></el-table-column>
          <el-table-column prop="role_name" align="center" label="角色名称"></el-table-column>
          <el-table-column prop="phone" align="center" label="手机号码"></el-table-column>
          <el-table-column prop="email" align="center" label="邮箱"></el-table-column>
          <el-table-column prop="note" align="center" label="备注"></el-table-column>
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
      selectItem: {},
      deleteUsers: []
    };
  },
  props: {
    selectUser: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["allUser"])
  },
  methods: {
    ...mapActions(['deleteSysUser']),
    onDialogShow() {
      this.deleteUsers = [this.selectUser]
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async onDialogConfirm() {
      if (this.selectUser && this.selectUser.id) {
        await this.deleteSysUser({
          id: this.selectUser.id
        })
        this.onDialogHide()
        this.$emit('onRefresh')
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

.crud-btn-delete {
  margin-left: 7px;
  background: #f87554;
  .icon-btn-delete {
    width: d2r(41px);
    height: d2r(30px);
    font-size: d2r(30px);
    margin-left: d2r(32px);
  }
}

</style>
