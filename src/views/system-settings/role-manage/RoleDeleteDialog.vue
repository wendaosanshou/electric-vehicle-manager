<template>
  <div class="role-add">
    <el-button class="button-fix" icon="el-icon-delete" type="danger" size="mini" @click="onDialogShow">删除</el-button>
    <el-dialog
      class="dialog-fix"
      title="删除角色"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-title">删除角色</div>
      <div class="dialog-content">
        <el-table
          class="role-manage-table table-fix table-disable-hover"
          :data="tableData"
          size="mini"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column prop="code" label="角色编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align="center">
          </el-table-column>
          <el-table-column prop="processPoint" label="角色权限" align="center" width="350">
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
          <el-table-column prop="note" label="角色说明" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleRoleDelete">删除</el-button>
        <el-button size="mini" @click="onDialogHide">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RoleManageTree from './RoleManageTree'

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    tableData() {
      return [this.data]
    }
  },
  methods: {
    ...mapActions(['deleteRole']),
    getFilterRoleNames(roleNames) {
      return roleNames.filter(item => {
        return item.indexOf('商户APP') === -1
      })
    },
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async handleRoleDelete() {
        await this.deleteRole({
          id: this.data.id
        })
        this.dialogVisible = false;
        this.$emit('onRefreshRoleInfo')
    }
  },
  components: {
    RoleManageTree
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-title {
  box-sizing: border-box;
  width: 100%;
  height: d2r(51px);
  line-height: d2r(51px);
  font-size: d2r(16px);
  padding-left: d2r(22px);
  text-align: left;
  border-bottom: 1px solid #dddddd;
}

.dialog-content {
  padding: d2r(24px) d2r(25px) d2r(34px) d2r(22px);
}

.table-col-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: d2r(13px);
  color: #3B4859;
  min-height: d2r(443px);
}

.role-manage-table tr td:nth-child(3) .cell {
  padding: 0;
}

.role-tag {
  margin-left: d2r(6px);
  cursor: pointer;
}
</style>
