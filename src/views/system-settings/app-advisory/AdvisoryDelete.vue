<template>
  <div class="advisory-delete">
    <el-button
      class="button-fix"
      icon="el-icon-delete"
      size="mini"
      type="danger"
      @click="onDialogShow"
    >删除</el-button>
    <el-dialog class="dialog-fix" title="删除资讯" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="app-advisory-title">
        <page-title>选择你要删除的APP资讯</page-title>
      </div>
      <div class="dialog-content">
        <el-table class="table-fix" size="mini" :data="tableData" border style="width: 100%">
          <el-table-column prop="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="title" label="资讯标题" width="120" align="center"></el-table-column>
          <!-- <el-table-column label="创建人" align="center"></el-table-column> -->
          <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="active_time" label="生效时间" align="center"></el-table-column>
          <el-table-column prop="expire_time" label="截止时间" align="center"></el-table-column>
          <el-table-column prop="content" label="备注信息" align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleDeleteInfoWeb">确 定</el-button>
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
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['deleteInfoWeb']),
    onDialogShow() {
      this.tableData = [this.defaultData];
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async handleDeleteInfoWeb() {
      await this.deleteInfoWeb({
        id: this.defaultData.id
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
