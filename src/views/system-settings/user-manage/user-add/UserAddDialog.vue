<template>
  <div class="dialog">
    <el-button class="button-fix btn-select" size="mini" type="primary" @click="onDialogShow">选择角色模板</el-button>
    <el-dialog class="dialog-fix" title="选择角色模板" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-title">
        <span class="dialog-title-content">当前角色模板</span>
        <!-- <span class="refresh-link" @click="onRefresh">刷新</span> -->
      </div>
      <div class="table-container">
        <!-- {{allRoles}}--{{defaultRoleId}} -->
        <el-table ref="roleTable" class="table-fix table-disable-select-all" :data="allRoles" size="mini" border stripe max-height="450" style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="handleSelect">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="角色模板编号" align="center"></el-table-column>
          <el-table-column prop="name" label="角色姓名" align="center"></el-table-column>
          <el-table-column prop="author" label="角色模板" align="center" width="380">
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
          <el-table-column prop="note" label="角色说明" width="220" align="center"></el-table-column>
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
      this.$nextTick(() => {
        this.toggleSelection()
      })
    },
    onDialogHide() {
      this.dialogVisible = false;
      this.$refs.roleTable.clearSelection();
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
    },
    toggleSelection() {
      if (this.defaultRoleId && this.allRoles && this.allRoles.length > 0) {
        let rows = this.allRoles.filter(item => item.id === this.defaultRoleId)
        if (rows && rows.length > 0) {
          this.$refs.roleTable.toggleRowSelection(rows[0]);
        }
      } else {
        this.$refs.roleTable.clearSelection();
      }
    },
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

.role-tag {
  margin-left: d2r(6px);
  cursor: pointer;
}
</style>
