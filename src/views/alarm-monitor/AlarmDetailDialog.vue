<template>
  <div class="location-dialog">
    <el-dialog
        class="dialog-small-right dialog-fix dialog-allow-click"
        title="详细信息"
        :visible.sync="dialogVisible"
        @close="onDialogHide"
        :modal="false"
        :close-on-click-modal="false"
      >
      <!-- {{deviceInfo}} -->
        <div class="dialog-content">
          <div class="form-title">车主信息</div>
          <div class="form-item-wrap">
            <div class="form-item">购车人：{{userInfo.name}}</div>
            <div class="form-item">身份证号：{{userInfo.certificates_code}}</div>
            <div class="form-item">性别：{{userInfo.sex === 0 ? "男" : "女"}}</div>
            <div class="form-item">联系电话：{{userInfo.phone}}</div>
            <div class="form-item">家庭住址：{{userInfo.address}}</div>
          </div>
          <div class="form-title">车辆信息</div>
          <div class="form-item-wrap">
            <div class="form-item">车辆ID：{{vehicleInfo.id}}</div>
            <div class="form-item">IMEI：{{deviceInfo.imei}}</div>
            <div class="form-item">ICCID：{{deviceInfo.iccid}}</div>
            <div class="form-item">规格：{{vehicleInfo.model}}</div>
            <div class="form-item">电池编号：{{vehicleInfo.battery}}</div>
            <div class="form-item">电机号：{{vehicleInfo.power}}</div>
            <div class="form-item">车架号：{{vehicleInfo.frame}}</div>
            <div class="form-item">防火防盗备案号：{{vehicleInfo.theft}}</div>
            <div class="form-item">车辆温度：{{deviceInfo.temperature}}℃</div>
          </div>
          <div class="form-title">告警信息</div>
          <div class="form-item-wrap">
            <div class="form-item">告警时间：{{getUtcOffsestTime(currentAlarm.signal_time)}}</div>
            <div class="form-item">告警事件：{{getAlarmLabel(currentAlarm.note)}}</div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
          <el-button size="mini" @click="onDialogHide">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
    }
  },
  computed: {
    ...mapGetters(['deviceInfo', 'alarmLatest', 'alarmTypes', 'currentAlarm']),
    alarmLatestInfo() {
      if (this.alarmLatest && this.alarmLatest.length > 0) {
        return this.alarmLatest[0]
      }
      return []
    },
    vehicleInfo(){
      if (this.deviceInfo && this.deviceInfo.vehicle_info) {
        return this.deviceInfo.vehicle_info
      }
      return {}
    },
    userInfo() {
      if (this.deviceInfo && this.deviceInfo.user_info) {
        return this.deviceInfo.user_info
      }
      return {}
    }
  },
  methods: {
    getAlarmLabel(alarm) {
      if (alarm && alarm.length > 0) {
        return alarm.replace(/[^\u4e00-\u9fa5]/g, '')
      }
      return ''
    },
    onDialogHide() {
      this.$emit('change', false)
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-small-right {
  .dialog-content {
    max-height: d2r(611px);
    background: #ffffff;
    overflow: auto;
    .form-title {
      box-sizing: border-box;
      width: 100%;
      height: d2r(33px);
      font-size: d2r(13px);
      line-height: d2r(33px);
      color: #4a4a4a;
      text-align: left;
      padding-left: d2r(23px);
      background: #ffffff;
    }
    .form-item-wrap {
      .form-item {
        box-sizing: border-box;
        width: 100%;
        min-height: d2r(34px);
        line-height: d2r(34px);
        font-size: d2r(13px);
        color: #9b9b9b;
        text-align: left;
        padding-left: d2r(23px);
        margin-top: 2px;
        background:rgba(221,221,221,0.24);
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
