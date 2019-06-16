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
          <el-table-column prop="username" label="角色编号" width="180" align="center">
            <template>
              <div class="table-col-item">
                <div class="user-number">系统自动设置</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="角色名称" align="center">
            <template>
              <div class="table-col-item">
                <div class="user-name">填写角色名称</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="processPoint" label="角色权限" align="center">
            <template>
              <div class="table-col-item">
                <div class="content-label">办理状态管理：系统设置</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="installationPoint" label="角色说明" align="center">
            <template>
              <div class="table-col-item">
                <div class="user-name">填写角色说明</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogHide">删除</el-button>
        <el-button size="mini" @click="onDialogHide">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RoleManageTree from './RoleManageTree'

export default {
  data() {
    return {
      dialogVisible: false,
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
        }
      ]
    };
  },
  props: {
    type: {
      type: Boolean,
      default: 'add'
    }
  },
  computed: {
    isAddType() {
      return this.type && this.type === 'add'
    },
    isDeleteType() {
      return this.type && this.type === 'delete'
    },
    isEditType() {
      return this.type && this.type === 'edit'
    },
    btnContent() {
      if (this.isDeleteType) {
        return '删除'
      } else if (this.isEditType) {
        return '修改'
      } else if (this.isAddType) {
        return '添加角色'
      }
    }
  },
  methods: {
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    }
  },
  components: {
    RoleManageTree
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


</style>
