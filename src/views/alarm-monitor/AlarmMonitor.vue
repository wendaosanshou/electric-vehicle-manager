<template>
  <div class="history-track">
    <div class="track-title">
      <div class="title-left">
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="searchType"
          placeholder="请选择号码类型">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in accountList"
            :key="item.value"></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchValue" placeholder="请输入内容"></el-input>
      </div>
      <div class="title-right">
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchAlarm">查询</el-button>
      </div>
    </div>
    <div class="monitor-container">
      <!-- <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div> -->
      <div class="map-content js-map-container" id="map-container" :style="{height: alartMonitorMapHeight}"></div>
      <el-table class="table-analysis table-analysis-fix" size="mini" :data="filterAlarmAnalysis" border style="width: 100%" max-height="180">
          <el-table-column prop="note"  min-width="130" label="告警类型">
            <template slot-scope="scope">{{getAlarmLabel(scope.row.alarm)}}</template>
          </el-table-column>
          <el-table-column prop="signal_time" min-width="130" label="告警时间">
            <template slot-scope="scope">{{getUtcOffsetTime(scope.row.signal_time)}}</template>
          </el-table-column>
          <el-table-column prop="formattedAddress" min-width="430" label="告警地点"></el-table-column>
      </el-table>
    </div>

    <alarm-tips-dialog v-model="isAlarmTipsVisible" @on-select-alarm="onSelectAlarm"></alarm-tips-dialog>
    <alarm-detail-dialog v-model="isAlarmDetailVisible"></alarm-detail-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapMutations } from "vuex";
import MapMixin from '@/mixins/map-mixin'
import AlarmDetailDialog from './AlarmDetailDialog'
import AlarmTipsDialog from './AlarmTipsDialog'

export default {
  mixins: [MapMixin],
  data() {
    return {
      isAlarmDetailVisible: false,
      isAlarmTipsVisible: false,
      searchValue: "",
      alarmValue: 0,
      searchType: 'account',
      tid: '',
      pageIndex: 1,
      pageSize: 1000,
      startDate: Date.now(),
      filterAlarmAnalysis: []
    };
  },
  computed: {
    ...mapGetters(['alarmAnalyse', 'deviceInfo', 'accountList', 'alarmTypes', 'allDeviceInfo', 'alarmTypeList'])
  },
  watch: {
    isAlarmDetailVisible() {
      if (!this.isAlarmDetailVisible) {
        this.isAlarmTipsVisible = false
        this.resetAlarmMonitor()
      }
    }
  },
  methods: {
    ...mapActions(['getAlarmAnalyseEx', 'getAlarmLatest', "getDeviceInfo"]),
    ...mapMutations(['clearAlarmAnalyse']),
    resetAlarmMonitor() {
      this.map.clearMap();
      this.clearAlarmAnalyse()
      this.filterAlarmAnalysis = []
    },
    getAlarmLabel(alarm) {
      let alarmLable = ''
      this.alarmTypeList.forEach(item => {
        if (item.value === alarm) {
          alarmLable = item.content
        }
      });
      return alarmLable
    },
    startMonitorAlarm() {
      clearInterval(this.tid)
      this.$message({
        type: "success",
        message: `告警监控定时刷新任务已开启，刷新时间间隔30秒一次`
      })
      this.tid = setInterval(() => {
        this.$message({
          type: "success",
          message: `告警监控数据已刷新~`
        })
        this.handleGetAlarmAnalyse()
      }, 30 * 1000)
    },
    async handleGetAlarmAnalyse() {
      let endDate = Date.now()
      await this.getAlarmAnalyseEx({
        id: this.deviceInfo.id,
        start: this.getUtcTime(this.startDate),
        end: this.getUtcTime(endDate),
        page_size: this.pageSize,
        page_index: this.pageIndex,
        alarm: this.alarmValue
      });
      await this.addFormattedAddress(this.alarmAnalyse, (result) => {
        this.filterAlarmAnalysis = result
      })
    },
    onSelectAlarm(value) {
      this.alarmValue = value
      this.pageSize = 10
      this.handleSearchAlarm()
    },
    async onSearchAlarm() {
      this.showLoading()
      try {
        this.alarmValue = 0
        this.pageSize = 1000
        await this.handleSearchAlarm()
      } catch (error) {
        console.log(error)
      }
      this.hideLoading()
    },
    async handleSearchAlarm() {
      console.log(this.alarmType && this.searchType)
      if (this.searchValue) {
        await this.getDeviceInfo({
          type: this.searchType,
          value: this.searchValue
        });
        await this.handleGetAlarmAnalyse()
        this.drawAlarmMap()
        this.isAlarmTipsVisible = true
        this.isAlarmDetailVisible = true
        this.startMonitorAlarm()
        console.log(this.deviceInfo)
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的查询条件!"
        });
      }
    },
    drawAlarmMap() {
      console.log(this.alarmAnalyse)
      const [{ lng, lat }] = this.alarmAnalyse
      this.initAMap('map-container', [lng, lat]);
      this.addAlarmMarkers(this.alarmAnalyse)
    },
    init() {
      let [{ lng, lat }] = this.allDeviceInfo
      this.initAMap("map-container", []);
      this.map.setFitView()
    }
  },
  components: {
    AlarmDetailDialog,
    AlarmTipsDialog,
  },
  beforeDestroy() {
    this.clearAlarmAnalyse()
    if (this.tid) {
      clearInterval(this.tid)
    }
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
      border: 1px solid #ebeef5;
    }
  }
}

.table-analysis {
  margin-top: 13px;
}
</style>
