<template>
  <div class="filing-lose-dialog">
    <el-dialog
      class="dialog-fix dialog-container"
      title="清除轨迹"
      width="430px"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="filing-dialog-content">
        <el-date-picker
          v-model="value1"
          size="mini"
            clss="ipt-fix"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="btn-confirm"
          :class="{'active': isAllowConfirm}"
          size="mini"
          type="primary"
          @click="onDialogConfirm"
        >立案</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      value1: "",
      dialogVisible: false
    };
  },
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: Boolean
  },
  computed: {
    isAllowConfirm() {
      return this.value1;
    }
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
    }
  },
  methods: {
    ...mapActions(["getHistoryInfo"]),
    onDialogHide() {
      this.$emit("change", false);
    },
    onDialogConfirm() {
      this.onDialogHide();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.filing-dialog-content {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: d2r(40px) d2r(51px) d2r(40px) d2r(52px);
}
</style>
