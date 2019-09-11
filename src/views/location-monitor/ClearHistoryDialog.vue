<template>
  <div class="filing-lose-dialog">
    <el-dialog
      class="dialog-fix dialog-container"
      title="清除轨迹"
      width="540px"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="filing-dialog-content">
        <el-date-picker
          v-model="pickerTime"
          size="mini"
          clss="ipt-fix ipt-date-fix"
          type="datetimerange"
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
        >确认</el-button>
        <!-- <el-button
          class="btn-cancel"
          size="mini"
          type="primary"
          @click="onDialogHide"
        >取消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      pickerTime: [],
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
    ...mapGetters(["currentLocationInfo"]),
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
    ...mapActions(["clearHistoryInfo"]),
    resetForm() {
      this.pickerTime = []
    },
    onDialogHide() {
      this.resetForm()
      this.$emit("change", false);
    },
    async onDialogConfirm() {
      console.log(this.pickerTime)
      if (this.pickerTime && this.pickerTime.length > 1) {
        const [startDate, endDate] = this.pickerTime || []
        await this.clearHistoryInfo({
          id: this.currentLocationInfo.id,
          start: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")
        });
        this.onDialogHide();
      } else {
        this.$message({
          type: "error",
          message: "请选择开始日期和结束日期！"
        });
      }
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

.ipt-date-fix {
  border-radius: 0;
}
</style>
