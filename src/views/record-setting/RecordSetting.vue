<template>
  <div class="page-record-setting">
    <div class="record-setting-title">
      <page-title>办理状态详细信息修改</page-title>
      <page-back></page-back>
    </div>
    <record-setting-content ref="recordSetting"></record-setting-content>
    <div class="btn-save" type="primary" @click="handleSave">保存</div>
  </div>
</template>

<script>
import RecordSettingContent from './RecordSettingContent'
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import RenewBtn from "./RenewBtn.vue";
import RenewBtnLog from "./RenewBtnLog.vue";

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    ...mapActions(['modifyWorkItem']),
    async handleSave() {
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
      await this.modifyWorkItem(params)
      history.back()
      console.log('modifyWorkItem', params)
    }
  },
  components: {
    PageTitle,
    PageBack,
    RenewBtn,
    RenewBtnLog,
    RecordSettingContent
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.recordSetting.initProcessDetail()
    })
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
}

.btn-save {
    margin-top: d2r(40px);
    margin-left: d2r(200px);
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
</style>
