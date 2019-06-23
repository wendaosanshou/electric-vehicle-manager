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
        class="role-manage-table table-fix table-disable-select-all"
        :data="sortInfoWeb"
        size="mini"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="title" label="资讯标题" align="center"></el-table-column>
        <el-table-column label="创建人" align="center"></el-table-column>
        <el-table-column prop="time" label="创建时间" width="160"  align="center"></el-table-column>
        <el-table-column prop="active_time" label="生效时间" width="160"  align="center"></el-table-column>
        <el-table-column prop="expire_time" label="截止时间" width="160"  align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="260">
          <template>
            <div class="table-col-btn-wrap">
              <advisory-edit></advisory-edit>
              <advisory-delete></advisory-delete>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import AdvisoryAdd from "./AdvisoryAdd";
import AdvisoryDelete from "./AdvisoryDelete";
import AdvisoryEdit from "./AdvisoryEdit";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["infoWeb"]),
    sortInfoWeb() {
      if (this.infoWeb && this.infoWeb.length > 0) {
        return this.infoWeb.sort((a, b) => a.id - b.id);
      }
      return this.infoWeb;
    }
  },
  methods: {
    ...mapActions(["getInfoWeb"])
  },
  components: {
    PageTitle,
    AdvisoryDelete,
    AdvisoryEdit,
    AdvisoryAdd
  },
  mounted() {
    this.getInfoWeb({
      index: 1
    });
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
