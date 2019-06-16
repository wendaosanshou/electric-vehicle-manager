<template>
  <div class="app-advisory">
    <div class="app-advisory-title">
      <page-title>APP咨询管理</page-title>
    </div>
    <div class="app-btn-wrap">
      <advisory-add></advisory-add>
    </div>
    <div class="app-advisory-content">
      <el-table
        class="role-manage-table table-fix"
        :data="tableData"
        size="mini"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="sex" label="资讯标题" align="center"></el-table-column>
        <el-table-column prop="processPoint" label="创建人" align="center"></el-table-column>
        <el-table-column prop="installationPoint" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="installationPoint" label="生效时间" align="center"></el-table-column>
        <el-table-column prop="installationPoint" label="截止时间" align="center"></el-table-column>
        <el-table-column prop="processUser" label="操作" align="center" width="280">
          <template>
            <div class="table-col-btn-wrap">
                 <advisory-edit></advisory-edit>
            <advisory-delete></advisory-delete>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="installationPoint" label="备注信息" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import AdvisoryAdd from './AdvisoryAdd'
import AdvisoryDelete from './AdvisoryDelete'
import AdvisoryEdit from './AdvisoryEdit'

export default {
  data() {
    return {
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
  components: {
    PageTitle,
    AdvisoryDelete,
    AdvisoryEdit,
    AdvisoryAdd
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.app-advisory {
  padding-right: d2r(38px);
  padding-left: d2r(42px);
  padding-top: d2r(29px);
  .app-advisory-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .app-btn-wrap {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .app-advisory-content {
    margin-top: d2r(39px);
    .table-col-btn-wrap {
        display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    }
  }
}
</style>
