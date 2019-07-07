<template>
  <div class="history-track">
    <!-- {{accountList}} -->
    <div class="track-title">
      <div class="title-left">
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="alarmValue"
          placeholder="请选择告警类型"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in alarmTypes"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="searchType"
          placeholder="请选择号码类型"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in accountList"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchValue" placeholder="请输入内容"></el-input>
      </div>
      <div class="title-right">
        <el-button class="button-fix" size="mini" type="primary" @click="onSearchAlarm">查询</el-button>
      </div>
    </div>
    <div class="monitor-container">
      <!-- <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div> -->
      <div class="map-content js-map-container" id="map-container" :style="{height: pageHeight}"></div>
    </div>

    <alarm-tips-dialog v-model="isAlarmTipsVisible"></alarm-tips-dialog>
    <alarm-detail-dialog v-model="isAlarmDetailVisible"></alarm-detail-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MapMixin from '@/mixins/map-mixin'
import AlarmDetailDialog from './AlarmDetailDialog'
import AlarmTipsDialog from './AlarmTipsDialog'
import { setTimeout } from 'timers';

export default {
  mixins: [MapMixin],
  data() {
    return {
      isAlarmDetailVisible: false,
      isAlarmTipsVisible: false,
      value2: "",
      positionCenter: [116.43, 39.92],
      searchValue: "",
      alarmValue: 0,
      searchType: 'account'
    };
  },
  computed: {
    ...mapGetters(['alarmLatest', 'deviceInfo', 'accountList', 'alarmTypes', 'allDeviceInfo'])
  },
  watch: {
    isAlarmDetailVisible() {
      if (!this.isAlarmDetailVisible) {
        this.isAlarmTipsVisible = false
      }
    }
  },
  methods: {
    ...mapActions(['getAlarmLatest', "getDeviceInfo"]),
    async onSearchAlarm() {
      console.log(this.alarmType && this.searchType)
      if (this.searchValue) {
         await this.getDeviceInfo({
          type: this.searchType,
          value: this.searchValue
        });
        await this.getAlarmLatest({
          alarmId: 0,
          deviceId: this.deviceInfo.id,
          alarmValue: this.alarmValue
        })
        this.drawAlarmMap()
        this.isAlarmTipsVisible = true
        this.isAlarmDetailVisible = true
        console.log(this.deviceInfo)
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的查询条件!"
        });
      }
    },
    getAlarmMarkerContent(item) {
      let {lng, lat} = item
      let markerContent = document.createElement("div");
      markerContent.className = `alarm-mark-content ${item.iconClass}`;
      console.log(markerContent.className)
      setTimeout(() => {
        $(markerContent).on("click", () => {
          this.map.setZoomAndCenter(16, [lng, lat]);
        });
      }, 100);
      return markerContent;
    },
    addAlarmMarkers() {
      this.map.clearMap();
      console.log('addAlarmMarkers', this.alarmLatest)
      this.alarmLatest.forEach(item => {
        this.addMarker([item.lng, item.lat], this.getAlarmMarkerContent(item));
      });
      this.map.setFitView();
    },
    drawAlarmMap() {
      console.log(this.alarmLatest)
      const [{lng, lat}] = this.alarmLatest
      this.initAMap('map-container', [lng, lat]);
      this.addAlarmMarkers()
    },
    init() {
      let [{lng, lat}] = this.allDeviceInfo
      this.initAMap("map-container", [lng, lat]);
      this.map.setFitView()
    }
  },
  components: {
    AlarmDetailDialog,
    AlarmTipsDialog,
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.history-track {
  padding: d2r(20px) d2r(43px) 0 d2r(42px);
  .track-title {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: d2r(70px);
    padding: 0 d2r(17px) 0 d2r(20px);
    background: #f5f5f6;
    .title-left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .ipt-selector {
        width: d2r(200px);
        margin-right: d2r(10px);
      }
      .ipt-number {
        width: d2r(320px);
        margin-right: d2r(10px);
      }
    }
    .title-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .monitor-container {
    position: relative;
    width: 100%;
    height: d2r(820px);
    margin-top: d2r(19px);
    .map-tips {
      position: absolute;
      top: d2r(22px);
      left: d2r(20px);
      width: d2r(350px);
      height: d2r(50px);
      line-height: d2r(50px);
      font-size: d2r(17px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #6fa8e0;
      background: #ffffff;
      box-shadow: 0px 5px 20px 0px rgba(159, 158, 193, 1);
      z-index: 100;
      cursor: pointer;
    }
    .map-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
