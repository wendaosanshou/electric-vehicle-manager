<template>
  <div class="role-add">
    <el-button class="button-fix" icon="el-icon-edit" type="primary" size="mini" @click="onDialogShow">编辑</el-button>
    <el-dialog class="dialog-fix" title="修改角色" :visible.sync="dialogVisible" @close="onDialogHide">
      <!-- {{tableData}} -->
      <div class="dialog-title">修改角色</div>
      <div class="dialog-content">
        <el-table class="role-manage-table table-fix table-disable-hover" :data="tableData" size="mini" border stripe style="width: 100%">
          <el-table-column prop="code" label="角色模板编号" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="角色名称" align="center">
            <template slot-scope="scope">
              <div class="table-col-item">
                <div class="user-name">
                  <el-input size="mini" class="ipt-fix" v-model="scope.row.name" placeholder="填写角色名称" disabled></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="角色模板" width="230" align="center">
            <template slot-scope="scope">
              <div class="role-manage-tree-wrap">
                <role-manage-tree :defaultCheck="scope.row.author" @onChange="onRoleChange"></role-manage-tree>
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
        <el-button size="mini" type="primary" @click="handleEditRole">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RoleManageTree from './RoleManageTree.vue'

export default {
  data() {
    return {
      dialogVisible: false,
      authorList: [],
      tableData: []
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    data() {
      this.tableData = [this.data]
    }
  },
  methods: {
    ...mapActions(['editRole']),
    onDialogShow() {
      this.initTableData()
      this.dialogVisible = true
    },
    onDialogHide() {
      this.dialogVisible = false
    },
    removeNode(item, array) {
      for (let index = 0; index < array.length; index++) {
        if (item === array[index]) {
          array.splice(index, 1)
        }
      }
      return array
    },
    onRoleChange(data) {
      const { role, isCheck } = data
      if (isCheck) {
        this.authorList.push(role.id)
      } else {
        this.authorList = this.removeNode(role.id, this.authorList)
      }
      const hasChildren = this.authorList.some(author => author > 9)
      if (hasChildren) {
        this.authorList.push(9)
      } else {
        this.authorList = this.removeNode(9, this.authorList)
      }
      this.authorList = Array.from(new Set(this.authorList)).sort((a, b) => a - b)
      console.log(role.id)
      console.log('result', this.authorList)
    },
    initTableData() {
      this.tableData = [this.data]
      const { author } = this.data
      if (author) {
        this.authorList = author.split(',').map(item => {
          // eslint-disable-next-line
          if (!isNaN(item)) {
            return +item
          }
          return item
        })
      }
    },
    async handleEditRole() {
      const [role] = this.tableData
      if (role.name && role.note) {
        await this.editRole({
          id: role.id,
          name: role.name,
          code: role.code,
          author: this.authorList.join(','),
          note: role.note
        })
        this.onDialogHide()
        this.$emit('onRefreshRoleInfo')
      } else {
        this.$message('输入信息不完整!')
      }
    }
  },
  components: {
    RoleManageTree
  }
}
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

.role-manage-tree-wrap {
  width: 100%;
  height: d2r(500px);
  overflow: auto;
}
</style>
