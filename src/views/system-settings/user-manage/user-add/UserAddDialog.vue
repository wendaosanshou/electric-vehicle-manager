<template>
  <div class="dialog">
    <el-button class="button-fix btn-select" size="mini" type="primary" @click="onDialogShow">选择角色</el-button>
    <el-dialog class="dialog-fix" title="选择角色" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-title">
        <span class="dialog-title-content">当前角色</span>
        <span class="refresh-link" @click="onRefresh">刷新</span>
      </div>
      <div class="table-container">
        <el-table ref="roleTable" class="table-fix table-disable-select-all" :data="allRoles" size="mini" border stripe max-height="450" style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="handleSelect">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="角色编号" align="center"></el-table-column>
          <el-table-column prop="name" label="角色姓名" align="center"></el-table-column>
          <el-table-column prop="author" label="角色权限" align="center" width="380">
            <template slot-scope="scope">
            <el-tag
              class="role-tag role-tag-fix"
              type="success"
              v-for="(item, index) in scope.row.roleNames"
              :key="index"
              size="mini"
              disable-transitions>{{item}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column prop="note" label="角色说明" align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleDialogConfirm">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from "@/components/PageTitle.vue";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      dialogVisible: false,
      selectValue: ''
    };
  },
  props: {
    defaultRoleId: {
      type: Number | String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['allRoles'])
  },
  methods: {
    ...mapActions(['getAllRoles']),
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.roleTable.clearSelection()
        this.$refs.roleTable.toggleRowSelection(val.pop())
      }
    },
    handleSelect(val) {
      console.log('handleSelect', val)
      this.selectValue = val
    },
    handleDialogConfirm() {
      this.$emit('onSelectRole', this.selectValue)
      this.onDialogHide()
    },
    onRefresh() {
      this.getAllRoles()
      this.$message({
        type: "success",
        message: "刷新角色信息成功!"
      })
    }
  },
  components: {
    PageTitle
  },
  mounted() {
    this.getAllRoles()
  }
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/style/function.scss";

$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.btn-select {
  margin-left: d2r(10px);
  width: d2r(160px);
  height: d2r(38px);
}

.dialog-title {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: d2r(51px);
  padding: 0 d2r(24px);
  border-bottom: 1px solid #dddddd;
  .dialog-title-content {
    font-size: d2r(16px);
    color: #3b4859;
  }
  .refresh-link {
    font-size: 14px;
    color: #7aa9ec;
    cursor: pointer;
  }
}

.table-container {
  padding: d2r(24px) d2r(24px) d2r(33px) d2r(24px);
}
</style>
