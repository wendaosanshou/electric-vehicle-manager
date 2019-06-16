<template>
  <div class="dialog">
    <el-button class="button-fix btn-select" size="mini" type="primary" @click="onDialogShow">选择所属组织</el-button>
    <el-dialog
      class="dialog-fix"
      title="选择所属组织"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
        <div class="dialog-title">当前组织</div>
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

.process-dialog {
  padding: 0;
  .el-dialog .el-dialog__body {
    padding: 0 !important;
  }
}

.el-dialog__body {
  padding: 0 !important;
}

.btn-select {
  margin-left: d2r(10px);
  width: d2r(160px);
  height: d2r(38px);
}
</style>
