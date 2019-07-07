<template>
  <div class="page-record-setting">
    <div class="record-setting-title">
      <page-title>留言详情信息修改</page-title>
      <page-back></page-back>
    </div>
    <div class="record-setting-container">
      <user-feedback-detail-content ref="feedbackContent"></user-feedback-detail-content>
    </div>
    <div class="btn-container">
      <div class="btn-save" type="primary" @click="handleSave">处理</div>
      <div class="btn-save btn-back" type="primary" @click="handleBack">返回</div>
    </div>

    <el-dialog
      class="dialog-fix"
      title="处理详情"
      :visible.sync="dialogVisible"
      @close="onDialogHide">
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form"
        >
          <el-form-item label="记录问题处理过程">
            <el-input type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            v-model="form.feedback_process"
            :autosize="{ minRows: 10, maxRows: 10}"
            placeholder="请输入版本说明"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import UserFeedbackDetailContent from "./UserFeedbackDetailContent";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {}
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(["processFeedback"]),
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    handleSave() {
      this.form = JSON.parse(JSON.stringify(this.$refs.feedbackContent.form));
      this.onDialogShow()
    },
    async handleConfirm() {
      await this.processFeedback({
        id: this.form.feedback_id,
        process_feedback: this.form.feedback_process,
        operation: this.userInfo.account
      })
      history.back();
    },
    handleBack() {
      history.back();
    }
  },
  components: {
    PageTitle,
    PageBack,
    UserFeedbackDetailContent
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.feedbackContent.initProcessDetail();
    });
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.page-record-setting {
  padding-bottom: d2r(40px);
  .record-setting-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: d2r(21px) d2r(38px) d2r(39px) d2r(41px);
  }
  .record-setting-container {
    padding: 0 d2r(38px) 0 d2r(41px);
  }
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: d2r(80px);
  margin-top: d2r(40px);
  .btn-save {
    width: d2r(160px);
    height: d2r(35px);
    line-height: d2r(35px);
    font-size: d2r(16px);
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #ffffff;
    background: #ff7525;
    cursor: pointer;
  }
  .btn-back {
    margin-left: d2r(10px);
    background: #a7b0bbff;
  }
}
</style>
