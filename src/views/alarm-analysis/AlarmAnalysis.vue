<template>
  <div class="history-track">
    <div class="track-title">
      <div class="track-time">
        <el-date-picker
          v-model="pickerTime"
          size="mini"
          class="ipt-fix"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>
      <div class="title-right">
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
      </div>
      <div class="title-right">
        <el-button class="button-fix" size="mini" type="primary" @click="onSearchAlarm">查询</el-button>
      </div>
    </div>
    <div class="monitor-container">
      <div class="map-content js-map-container" id="map-container" :style="{height: pageHeight}"></div>
      <alarm-tips-dialog v-model="isAlarmTipsVisible"></alarm-tips-dialog>
      <alarm-analysis-table 
        v-model="isAlarmTableVisible" 
        :pageIndex="pageIndex" 
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
        ></alarm-analysis-table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import AlarmTipsDialog from "../alarm-monitor/AlarmTipsDialog";
import AlarmAnalysisTable from "./AlarmAnalysisTable";

export default {
  mixins: [MapMixin],
  data() {
    return {
      isAlarmTipsVisible: false,
      isAlarmTableVisible: false,
      pickerTime: "",
      searchValue: "",
      alarmValue: 0,
      pageIndex: 1,
      pageSize: 10,
      searchType: 'account'
    };
  },
  computed: {
    ...mapGetters([
      "deviceIds",
      "pickerOptions",
      "accountList",
      "alarmTypes",
      "deviceInfo",
      'alarmAnalyse',
      'allDeviceInfo'
    ])
  },
  watch: {
    isAlarmTableVisible() {
      if (!this.isAlarmTableVisible) {
        this.isAlarmTipsVisible = false;
      }
    }
  },
  methods: {
    ...mapActions(["getAlarmAnalyse", "getDeviceInfo"]),
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.onSearchAlarm()
    },
    async onSearchAlarm() {
      const [startDate, endDate] = this.pickerTime;
      console.log(startDate, endDate, this.searchValue)
      if (startDate && endDate && this.searchValue) {
        await this.getDeviceInfo({
          type: this.searchType,
          value: this.searchValue
        });
        await this.getAlarmAnalyse({
          id: this.deviceInfo.id,
          start: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"),
          page_size: this.pageSize,
          page_index: this.pageIndex,
          alarm: this.alarmValue
        });
        this.isAlarmTipsVisible = true;
        this.isAlarmTableVisible = true;
        this.addAlarmMarkers()
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
      let seldomNumber = Math.random()
      this.alarmAnalyse.forEach(item => {
        console.log('alarmAnalyse', item.lng)
        item.lng += Math.random() * 0.1
        item.lat += Math.random() * 0.1
        this.addMarker([item.lng, item.lat], this.getAlarmMarkerContent(item));
      });
      this.map.setFitView();
    },
    drawAlarmMap() {
      if (this.alarmAnalyse && this.alarmAnalyse.length > 0) {
        const [{lng, lat}] = this.alarmAnalyse
        this.initAMap('map-container', [lng, lat]);
        this.addAlarmMarkers()
      }
    },
    init() {
      let [{lng, lat}] = this.allDeviceInfo
      console.log('init', this.allDeviceInfo)
      this.initAMap("map-container", [lng, lat]);
      this.map.setFitView()
    }
  },
  components: {
    AlarmTipsDialog,
    AlarmAnalysisTable
  },
  mounted() {
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
