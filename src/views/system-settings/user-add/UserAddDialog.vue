<template>
  <div class="dialog">
    <el-button class="button-fix btn-select" size="mini" type="primary" @click="onDialogShow">选择角色</el-button>
    <el-dialog class="dialog-fix" title="选择角色" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-title">
        <span class="dialog-title-content">当前角色</span>
        <span class="refresh-link">刷新</span>
      </div>
      <div class="table-container">
        <el-table class="table-fix" :data="tableData" size="mini" border stripe style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="processPoint" label="角色编号" align="center"></el-table-column>
          <el-table-column prop="installationPoint" label="角色姓名" align="center"></el-table-column>
          <el-table-column prop="processUser" label="角色权限" align="center"></el-table-column>
          <el-table-column prop="businessAuditor" label="角色说明" align="center"></el-table-column>
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
          username: "某某某",
          mobile: "18710923477",
          sex: "男",
          processPoint: "业务办理点1",
          installationPoint: "测试安装点",
          processUser: "商户1",
          businessAuditor: "商户2",
          auditTime: "审核时间",
          businessAuditor2: "职员1"
        },
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
        },
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
  }
}

.table-container {
  padding: d2r(24px) d2r(24px) d2r(33px) d2r(24px);
}
</style>
