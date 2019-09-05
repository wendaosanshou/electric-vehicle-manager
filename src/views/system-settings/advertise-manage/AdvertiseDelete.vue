<template>
  <div class="advisory-delete">
    <el-button
      class="button-fix"
      icon="el-icon-delete"
      size="mini"
      type="danger"
      @click="onDialogShow"
    >删除</el-button>
    <el-dialog class="dialog-fix" title="删除广告" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="app-advisory-title">
        <page-title>选择你要删除的广告</page-title>
      </div>
      <div class="dialog-content">
        <el-table
        ref="userTable"
        class="table-fix table-disable-select-all"
        size="mini"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column align="center" prop="index" min-width="70" label="序号"></el-table-column>
        <el-table-column align="center" prop="img_url" min-width="220" label="广告页图片"></el-table-column>
        <el-table-column align="center" prop="page_url" min-width="220"  label="广告页链接"></el-table-column>
        <el-table-column align="center" prop="create_time" min-width="160"  label="创建时间"></el-table-column>
        <el-table-column align="center" prop="start_time" min-width="160"  label="生效时间"></el-table-column>
        <el-table-column align="center" prop="end_time" min-width="160"  label="截止时间"></el-table-column>
        <el-table-column align="center" prop="note" min-width="220"  label="备注信息"></el-table-column>
      </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleDeleteGuide">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: []
    };
  },
  props: {
    advertiseData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['deleteGuide']),
    onDialogShow() {
      this.tableData = [this.advertiseData];
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async handleDeleteGuide() {
      await this.deleteGuide({
        id: this.advertiseData.id
      })
      this.$emit('onRefresh')
      this.onDialogHide()
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
