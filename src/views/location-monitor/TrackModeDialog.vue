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
        <el-radio-group class="radio-group" v-model="modeValue">
            <el-radio class="radio-item" :label="1">追踪模式（一分钟一次）</el-radio>
            <el-radio class="radio-item radio-item-last" :label="2">普通模式（五分钟一次）（默认）</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="btn-confirm"
          :class="{'active': isAllowConfirm}"
          size="mini"
          type="primary"
          @click="onDialogConfirm"
        >设置</el-button>
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
        modeValue: '',
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
    onDialogConfirm() {
        this.onDialogHide()
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

.radio-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: d2r(74px) 0 0 d2r(98px);
    .radio-item {
        font-size: d2r(18px);
    }
    .radio-item-last {
        margin-top: d2r(48px);
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
