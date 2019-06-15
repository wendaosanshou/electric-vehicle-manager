<template>
  <div class="renew-log">
    <div class="el-btn btn-renew-log" @click="onDialogShow">续费日志</div>
    <el-dialog class="dialog-fix" title="续费信息" :visible.sync="dialogFormVisible">
      <el-table class="table-fix" :data="tableData" size="mini" border stripe style="width: 100%">
        <el-table-column prop="data1" label="续费时间" align="center"></el-table-column>
        <el-table-column prop="data2" label="续费合约期" align="center"></el-table-column>
        <el-table-column prop="data3" label="合约到期时间" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        data1: "",
        data2: ""
      },
      tableData: [
        {
          data1: "某某某",
          data2: "18710923477",
          data3: "男"
        },
        {
          data1: "某某某",
          data2: "18710923477",
          data3: "男"
        },
        {
          data1: "某某某",
          data2: "18710923477",
          data3: "男"
        }
      ]
    };
  },
  methods: {
    onDialogShow() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss">
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.el-btn {
  width: d2r(160px);
  height: d2r(35px);
  font-size: d2r(16px);
  text-align: center;
  line-height: d2r(35px);
  color: #ffffff;
  background: #7aa9ec;
}

.btn-renew-log {
  margin-top: d2r(10px);
}
</style>
