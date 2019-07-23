<template>
  <div class="role-add">
    <el-button class="button-fix" icon="el-icon-folder-add" size="mini" type="primary" @click="onDialogShow">添加角色</el-button>
    <el-dialog class="dialog-fix" title="添加角色" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-title">添加角色</div>
      <div class="dialog-content">
        <el-table
          class="role-manage-table table-fix table-disable-hover"
          :data="roleTable"
          size="mini"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column prop="id" label="角色编号" align="center">
            <template slot-scope="scope">
              <el-input
                    size="mini"
                    class="ipt-fix"
                    v-model.number="scope.row.code"
                    placeholder="填写角色编号"
                  ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align="center">
            <template slot-scope="scope">
              <div class="table-col-item">
                <div class="user-name">
                  <el-input
                    size="mini"
                    class="ipt-fix"
                    v-model="scope.row.name"
                    placeholder="填写角色名称"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="角色权限" width="230" align="center">
            <template>
              <div class="role-manage-tree-wrap">
                <role-manage-tree @onChange="onRoleChange"></role-manage-tree>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="角色说明" align="center">
            <template slot-scope="scope">
              <div class="table-col-item">
                <div class="user-name">
                  <el-input
                    v-model="scope.row.note"
                    type="textarea"
                    class="item-ipt-textarea ipt-fix"
                    size="mini"
                    resize="none"
                    :autosize="{ minRows: 10, maxRows: 10}"
                    placeholder="填写角色说明"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onAddRole">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoleManageTree from "./RoleManageTree";

export default {
  data() {
    return {
      dialogVisible: false,
      authorList: [],
      roleTable: [
        {
          name: "",
          note: "",
          author: "",
          code: "",
          id: ""
        }
      ]
    };
  },
  methods: {
    ...mapActions(["addRole"]),
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.resetRoleTable()
      this.dialogVisible = false;
    },
    removeNode(item, array) {
      for (let index = 0; index < array.length; index++) {
        if (item === array[index]) {
          array.splice(index, 1);
        }
      }
      return array;
    },
    onRoleChange(data) {
      const { role, isCheck, isChildreCheck } = data;
      if (isCheck) {
        this.authorList.push(role.id);
      } else {
        this.authorList = this.removeNode(role.id, this.authorList);
      }
      console.log("onRoleChange", this.authorList.join(","));
    },
    resetRoleTable() {
      this.roleTable = [
        {
          name: "",
          note: "",
          author: "",
          code: "",
          id: ""
        }
      ]
    },
    async onAddRole() {
      const [role] = this.roleTable;
      if (role.name && role.code && this.authorList.length > 0 && role.note) {
        await this.addRole({
          name: role.name,
          code: role.code,
          author: this.authorList.join(","),
          note: role.note
        });
        this.onDialogHide();
        this.$emit('onRefreshRoleInfo')
      } else {
        this.$message("输入信息不完整");
      }
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
  color: #3b4859;
  min-height: d2r(443px);
}

.role-manage-table tr td:nth-child(3) .cell {
  padding: 0;
}

.user-number {
  color: #cccccc;
}

.btn-confirm {
  margin-top: d2r(10px);
}

.role-manage-tree-wrap {
  width: 100%;
  height: d2r(500px);
  overflow: scroll;
}
</style>
