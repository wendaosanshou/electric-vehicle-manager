<template>
  <div class="electric-fence-delete">
    <el-button
      class="button-delete button-fix"
      size="mini"
      type="primary"
      icon="el-icon-delete"
      @click="handleDeletFench"
    >删除</el-button>
    <el-dialog
      class="dialog-fix"
      title="保存电子围栏"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-container">
      <div class="app-advisory-title">
        <page-title>是否确认要删除以下电子围栏</page-title>
      </div>
      <div class="dialog-content">
        <el-table class="table-fix" size="mini" :data="fenceList" border style="width: 100%">
          <el-table-column prop="id" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" width="120" align="center"></el-table-column>
          <el-table-column prop="start_time" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="end_time" label="截止时间" align="center"></el-table-column>
          <el-table-column prop="note" label="备注信息" align="center"></el-table-column>
        </el-table>
      </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleConfirmAddFence">确 定</el-button>
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
      dialogVisible: false
    };
  },
  props: ['fenceList'],
  methods: {
    onDialogHide() {
      this.dialogVisible = false;
    },
    handleDeletFench() {
      this.dialogVisible = true;
    },
    handleConfirmAddFence() {
      this.$emit('on-delete')
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

.dialog-container {
  padding: d2r(31px) d2r(35px) 0 d2r(30px);
  .app-advisory-title {
    padding: 0 0 d2r(26px) 0;
  }
  .dialog-content {
    padding-bottom: d2r(35px);
  }
}


</style>
