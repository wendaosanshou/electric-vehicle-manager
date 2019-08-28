<template>
  <div class="history-track">
    <div class="track-title">
      <div class="track-time">
        <el-date-picker
          v-model="pickerTime"
          size="mini"
          clss="ipt-fix"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="title-right">
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="searchType"
          placeholder="请选择活动区域"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in accountList"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchValue" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onHistorySearch">查询</el-button>
        <!-- <el-button class="button-fix" size="mini" type="primary" @click="onBackHistoryTrack">退出</el-button> -->
      </div>
    </div>

    <!-- deviceInfo:{{historyAlarmWithAddress[0]}} -->
    <div class="monitor-container">
      <!-- <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div> -->
      <div class="hisotry-map-container">
        <div class="hisotry-map-content" :style="{height: alartMonitorMapHeight}">
          <div class="car-marker-menu" v-if="isShowHistoryTrack">
            <div class="car-marker-item" :class="{active: carSpeed === 0.25}" @click="onSetSpeed(0.25)">1/4X</div>
            <div class="car-marker-item" :class="{active: carSpeed === 0.5}" @click="onSetSpeed(0.5)">1/2X</div>
            <div class="car-marker-item" :class="{active: carSpeed === 2}" @click="onSetSpeed(2)">2X</div>
            <div class="car-marker-item" :class="{active: carSpeed === 4}" @click="onSetSpeed(4)">4X</div>
            <div class="car-marker-item" :class="{active: activeType === 'pause'}" @click="pauseMove">暂停</div>
            <div class="car-marker-item" :class="{active: activeType === 'start'}" @click="startMove">开始</div>
            <div class="car-marker-item" :class="{active: activeType === 'stop'}" @click="stopMove" @mouseleave="leaveStopMove">停止</div>
            <div class="car-marker-item" :class="{active: activeType === 'destory'}" @click="onBackHistoryTrack">退出</div>
          </div>
          <div class="map-content js-map-container" id="history-map-container"></div>
        </div>
        <div class="history-location">
          <el-table class="table-analysis table-analysis-fix" size="mini" :data="historyLocation" border style="width: 100%" :height="alartMonitorMapHeight" :max-height="alartMonitorMapHeight">
            <el-table-column prop="signal_time"  min-width="130" label="经过时间">
              <template slot-scope="scope">{{getUtcOffsetTime(scope.row.signal_time)}}</template>
            </el-table-column>
            <el-table-column prop="formattedAddress" min-width="130" label="经过地点"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="history-alarm">
        <el-table class="table-analysis table-analysis-fix" size="mini" :data="historyAlarmWithAddress" border style="width: 100%" max-height="190px">
          <el-table-column prop="note"  min-width="130" label="告警类型">
            <template slot-scope="scope">{{getAlarmLabel(scope.row.alarm)}}</template>
          </el-table-column>
          <el-table-column prop="signal_time" min-width="130" label="告警时间">
            <template slot-scope="scope">{{getUtcOffsetTime(scope.row.signal_time)}}</template>
          </el-table-column>
          <el-table-column prop="formattedAddress" min-width="130" label="告警地点"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapMutations, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import HistoryMixin from '@/mixins/history-mixin'
import { Promise } from 'q';

export default {
  mixins: [MapMixin, HistoryMixin],
  data() {
    return {
      loading: {},
      pickerTime: [],
      isShowHistoryTrack: false,
      isPauseMove: false,
      activeType: '',
      carSpeed: 1,
      carMarker: {},
      alarmMonitor: [],
      historyLocation: [],
      historyAlarmWithAddress: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = dayjs().toDate();
              const start = dayjs().set('h', 0).set('m', 0).set('s', 0).toDate();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchValue: "",
      searchType: "account",
      graspRoadPath: []
    };
  },
  computed: {
    ...mapGetters([
      "historyInfo",
      "deviceIds",
      "allLocationInfo",
      "currentLocationInfo",
      "accountList",
      "deviceInfo",
      'historyAlarm'
    ])
  },
  methods: {
    ...mapMutations(["updateCurrentLocationInfo", 'clearHistoryInfo']),
    ...mapActions(["getHistoryInfo", "getWebDevice", "getDeviceInfo"]),
    initPickerTime() {
      const end = dayjs().toDate();
      const start = dayjs().set('h', 0).set('m', 0).set('s', 0).toDate();
      this.pickerTime = [start, end]
    },
    resetMap() {
      this.isShowHistoryTrack = false
      this.map.clearMap();
      this.historyAlarmWithAddress = []
      this.historyLocation = []
    },
    async onHistorySearch() {
      this.clearHistoryInfo()
      this.resetMap()
      const [startDate, endDate] = this.pickerTime;
      try {
        if (startDate && endDate && this.searchValue) {
          let utcOffset = dayjs().utcOffset()
          this.renderLoading();
          await this.getDeviceInfo({
            type: this.searchType,
            value: this.searchValue
          });
          if (this.deviceInfo && this.deviceInfo.id) {
            this.resetMap()
            await this.getHistoryInfo({
              id: this.deviceInfo.id,
              userId: this.deviceInfo.user,
              start: dayjs(startDate).subtract(utcOffset, 'minute').format("YYYY-MM-DD HH:mm:ss"),
              end: dayjs(endDate).subtract(utcOffset, 'minute').format("YYYY-MM-DD HH:mm:ss")
            });
            await this.drawHistoryLine();
            this.activeType = "";
            this.isShowHistoryTrack = true;
            this.loading.close();
            // 加载定位和报警数据
            await this.addFormattedAddress(this.allHistory, (result) => {
              this.historyLocation = result
            })
            await this.addFormattedAddress(this.historyAlarm, (result) => {
              this.historyAlarmWithAddress = result
            })
          }
        } else {
          this.$message({
            type: "error",
            message: "请输入正确的时间段和查询条件!"
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.loading.close();
    },
    onBackHistoryTrack() {
      this.activeType = ''
      this.carSpeed = 1
      this.isShowHistoryTrack = false;
      this.init();
    },
    async init() {
      await this.getWebDevice();
      const locationArray = this.allLocationInfo.map(item => [item.lng, item.lat]);
      const [positionCenter] = locationArray;
      this.initAMap("history-map-container", positionCenter);
    }
  },
  beforeDestroy() {
    this.clearHistoryInfo()
  },
  mounted() {
    this.initPickerTime()
    this.init();
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
    .title-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
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

  }
}


.hisotry-map-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .hisotry-map-content {
    position: relative;
    width: calc(100% - 310px);
    height: 100%;
    border: 1px solid #ebeef5;
    .map-content {
      width: 100%;
      height: 100%;
    }
    .car-marker-menu {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      right: d2r(20px);
      top: d2r(39px);
      width: d2r(364px);
      height: d2r(37px);
      font-size: d2r(17px);
      background: #6FA8E0;
      color: #ffffff;
      z-index: 100;
      .car-marker-item {
        width: d2r(58px);
        height: d2r(37px);
        line-height: d2r(37px);
        text-align: center;
        cursor: pointer;
        &.active {
          background: #9ACDFF;
        }
      }
    }
  }
  .history-location {
    width: 300px;
    height: 100%;
  }
}

.history-alarm {
  padding-top: 10px;
  width: 100%;
  height: 200px;
}
</style>
