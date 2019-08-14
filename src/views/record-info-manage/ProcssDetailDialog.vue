<template>
  <div class="dialog">
    <el-dialog custom-class="process-dialog" class="process-detail-dialog dialog-fix" :title="dialogTitle" :visible="dialogVisible" width="960px" @close="onDialogHide">
      <div class="record-setting-container">
        <record-setting-content :forbidModify="forbidModify" ref="recordSetting"></record-setting-content>
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
import RecordSettingContent from '../record-setting/RecordSettingContent'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
    };
  },
  model: {
    prop: "dialogVisible",
    event: "change"
  },
  props: {
    dialogVisible: Boolean,
    forbidModify: Boolean
  },
  computed: {
    isProcessManage() {
      return this.$route && this.$route.name === "ProcessManage";
    },
    dialogTitle() {
      return this.isProcessManage ? '办理状态详情查看' : '备案信息详情查看'
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.$nextTick(() => {
          this.$refs.recordSetting.initProcessDetail()
        })
      }
    }
  },
  methods: {
    ...mapActions(['modifyWorkItem']),
    async handleModifyWorkItem() {
      const form = this.$refs.recordSetting.form
      let params = {
        user: form.user,
        address: form.address,
        vehicle: form.vehicle,
        brand: form.brand,
        model: form.model,
        frame: form.frame,
        battery: form.battery,
        power: form.power,
        theft: form.theft,
        device: form.device,
        imei: form.imei,
        iccid: form.iccid,
        work: form.work,
        imgs: form.imgs
      }
      if (!params.imei || params.imei.length !== 15) {
        this.$message({
          type: "error",
          message: 'imei号不能为空且长度需要是15位数字!'
        })
      } else if (!params.iccid) {
        this.$message({
          type: "error",
          message: 'iccid号不能为空!'
        })
      } else {
        await this.modifyWorkItem(params)
        console.log('modifyWorkItem', params)
        this.onDialogHide()
        this.$emit('on-refresh')
      }
    },
    onDialogShow() {
      this.dialogVisible = true;
    },
    async onDialogConfirm() {
      await this.handleModifyWorkItem()
    },
    onDialogHide() {
      this.$emit("change", this.dialogVisible);
    }
  },
  components: {
    RecordSettingContent
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
    padding: 0!important;
  }
}

.el-dialog__body {
  padding: 0!important;
}

</style>
