<template>
  <div class="dialog">
    <el-button class="button-fix btn-select" size="mini" type="primary" @click="onDialogShow">选择所属组织</el-button>
    <el-dialog
      class="dialog-add-org dialog-small-org dialog-fix"
      title="选择所属组织"
      width="460"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
    <div class="add-org-body">
      <div class="dialog-title">当前组织</div>
      <el-tree
        :data="businessAllTree"
        :expand-on-click-node="false"
        class="role-tree tree-fix"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogConfirm">确 定</el-button>
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
      currentBusinessPoint: {}
    };
  },
  computed: {
    ...mapGetters(["businessAllTree"])
  },
  methods: {
    ...mapActions(["getAllBusinessPoint", 'getBusinessHandle', 'getBusinessInstall']),
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      this.currentBusinessPoint = data;
    },
    onDialogConfirm() {
      this.onDialogHide()
      this.$emit('onConfirm', this.currentBusinessPoint)
    },
    async initBusinessInfo() {
       await this.getAllBusinessPoint();
    }
  },
  components: {
    PageTitle
  },
  mounted() {
    this.initBusinessInfo()
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

.dialog-add-org {
  .add-org-body {
    padding: 0 d2r(18px) 0 d2r(23px);
  }
  .dialog-title {
  text-align: left;
  font-size: d2r(16px);
}
}
</style>
