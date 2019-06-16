<template>
  <div class="advisory-delete">
    <el-button class="button-fix" size="mini" type="primary" @click="onDialogShow">删除</el-button>
    <el-dialog class="dialog-fix" title="添加角色" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="app-advisory-title">
        <page-title>选择你要删除的APP咨询</page-title>
      </div>
      <div class="dialog-content">
        <el-table class="table-fix" size="mini" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="账号（手机号）" width="180"></el-table-column>
          <el-table-column prop="address" label="账号姓名"></el-table-column>
          <el-table-column prop="address" label="所属组织（业务办理点）" width="220"></el-table-column>
          <el-table-column prop="address" label="手机号码"></el-table-column>
          <el-table-column prop="address" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="备注"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普"
        }
      ]
    };
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
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.advisory-delete {
  margin-left: d2r(10px);
}

.app-advisory-title {
  padding-right: d2r(38px);
  padding-left: d2r(42px);
  padding-top: d2r(29px);
}

.dialog-content {
  padding: d2r(31px) d2r(35px) 0 d2r(30px);
}
</style>
