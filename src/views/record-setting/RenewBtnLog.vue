<template>
  <div class="renew-log">
    <div class="el-btn btn-renew-log" @click="onDialogShow">续费日志</div>
    <el-dialog class="dialog-fix" title="续费信息" :visible.sync="dialogFormVisible" :append-to-body="true">
      <div class="renew-table-container">
        <el-table
          class="renew-log-table table-fix"
          :data="contractHistory"
          size="mini"
          max-height="400"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column prop="start" label="续费时间" align="center"></el-table-column>
          <el-table-column prop="content" label="续费合约期" align="center">
            <template slot-scope="scope">{{getContractContent(scope.row.content)}}</template>
          </el-table-column>
          <el-table-column prop="expire" label="合约到期时间" align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        data1: "",
        data2: ""
      }
    };
  },
  computed: {
    ...mapGetters(["workItem", "contractHistory"])
  },
  methods: {
    ...mapActions(["getContractHistory"]),
    getContractContent(contract_content) {
      if (contract_content === 0) {
        return "全部";
      } else if (contract_content === 1) {
        return "一年";
      } else if (contract_content === 2) {
        return "两年";
      }
    },
    onDialogShow() {
      this.initContractHistory();
      this.dialogFormVisible = true;
    },
    initContractHistory() {
      this.getContractHistory({
        id: this.workItem.id
      });
    }
  },
  mounted() {}
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
  background: #ff7525;
}

.btn-renew-log {
  margin-top: d2r(10px);
}

.renew-table-container {
  padding: d2r(22px) d2r(21px);
}

</style>
