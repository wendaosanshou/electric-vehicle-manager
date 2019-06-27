<template>
  <div class="filing-lose-dialog">
    <el-dialog
      class="dialog-fix dialog-container"
      title="立案丢失"
      width="430px"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="filing-dialog-content">
        <div class="filing-item">
          <div class="filing-dialog-title">丢失时间</div>
          <el-date-picker
            size="mini"
            class="ipt-fix"
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div class="filing-item">
          <div class="filing-dialog-title">丢失地点</div>
          <el-input
            type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            :autosize="{ minRows: 5, maxRows: 5}"
            v-model="form.losePlace"
            placeholder="请输入丢失地点"
          ></el-input>
        </div>
        <div class="filing-item">
          <div class="filing-dialog-title">丢失地点</div>
          <el-input
            type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="form.caseDescription"
            placeholder="请输入案件描述"
          ></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="btn-confirm"
          :class="{'active': isAllowConfirm}"
          size="mini"
          type="primary"
          @click="onDialogConfirm"
        >立 案</el-button>
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
      dialogVisible: false,
      form: {
        date: "",
        losePlace: "",
        caseDescription: ""
      }
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
      return this.form.date && this.form.losePlace && this.form.caseDescription;
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
    onSearchHistory() {},
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
  padding: d2r(0) d2r(27px) d2r(32px) d2r(23px);
  .filing-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .filing-dialog-title {
      width: 100%;
      height: d2r(52px);
      line-height: d2r(52px);
      font-size: d2r(16px);
      text-align: left;
    }
  }
}
.history-dialog-title {
  width: 100%;
  height: d2r(100px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.history-map-container {
  width: 100%;
  height: d2r(500px);
}
</style>
