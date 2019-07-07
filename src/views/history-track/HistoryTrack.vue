<template>
  <div class="history-track">
    <div class="track-title">
      <div class="track-time">
        <el-date-picker
          v-model="pickerTime"
          size="mini"
          clss="ipt-fix"
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
        <el-button class="button-fix" size="mini" type="primary" @click="onHistorySearch">查询</el-button>
        <!-- <el-button class="button-fix" size="mini" type="primary" @click="onBackHistoryTrack">退出</el-button> -->
      </div>
    </div>

    <div class="monitor-container">
      <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div>
      <div class="car-marker-menu" v-if="isShowHistoryTrack">
        <div
          class="car-marker-item"
          :class="{active: carSpeed === 0.25}"
          @click="onSetSpeed(0.25)"
        >1/4X</div>
        <div
          class="car-marker-item"
          :class="{active: carSpeed === 0.5}"
          @click="onSetSpeed(0.5)"
        >1/2X</div>
        <div class="car-marker-item" :class="{active: carSpeed === 2}" @click="onSetSpeed(2)">2X</div>
        <div class="car-marker-item" :class="{active: carSpeed === 4}" @click="onSetSpeed(4)">4X</div>
        <div class="car-marker-item" @click="pauseMove">暂停</div>
        <div class="car-marker-item" @click="startMove">开始</div>
        <div class="car-marker-item" @click="stopMove">停止</div>
        <div class="car-marker-item" @click="onBackHistoryTrack">退出</div>
      </div>
      <div class="map-content js-map-container" id="history-map-container" :style="{height: pageHeight}"></div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapMutations, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import { setTimeout } from "timers";

export default {
  mixins: [MapMixin],
  data() {
    return {
      loading: {},
      pickerTime: [],
      isShowHistoryTrack: false,
      isPauseMove: false,
      carSpeed: 1,
      value2: "",
      carMarker: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchValue: "",
      searchType: 'account',
    };
  },
  computed: {
    ...mapGetters(["historylineArr", "deviceIds", "allLocationInfo", "currentLocationInfo", "accountList", "deviceInfo"])
  },
  methods: {
    ...mapMutations(['updateCurrentLocationInfo']),
    ...mapActions(["getHistoryInfo", "getWebDevice", "getDeviceInfo"]),
    async onHistorySearch() {
      const [startDate, endDate] = this.pickerTime;
      try {
         if (startDate && endDate && this.searchValue) {
        this.renderLoading()
        await this.getDeviceInfo({
          type: this.searchType,
          value: this.searchValue
        });
        await this.getHistoryInfo({
          id: this.deviceInfo.id,
          start: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")
        });
        this.drawHistoryLine();
        this.drawCarMarker();
        this.isShowHistoryTrack = true;
      } else {
        this.$message({
          type: "error",
          message: "请选择正确的时间段!"
        });
      }
      } catch (error) {
        console.log(error)
      }
      this.loading.close()
    },
    renderLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    onSetSpeed(speed) {
      this.carSpeed = speed;
    },
    pauseMove() {
      this.isPauseMove = true;
      this.carMarker.pauseMove();
    },
    stopMove() {
      this.isPauseMove = false;
      this.carSpeed = 1;
      this.carMarker.stopMove();
    },
    resumeMove() {
      this.carMarker.resumeMove();
    },
    startMove() {
      if (this.isPauseMove) {
        this.resumeMove();
      } else {
        this.carMarker.moveAlong(this.historylineArr, 200 * this.carSpeed);
      }
    },
    getCarMarkerContent() {
      let markerContent = document.createElement("div");
      markerContent.className = "mark-car";
      return markerContent;
    },
    drawCarMarker() {
      let [firstPosition] = this.historylineArr;
      this.carMarker = new AMap.Marker({
        map: this.map,
        position: firstPosition,
        content: this.getCarMarkerContent(),
        offset: new AMap.Pixel(-26, -13)
      });

      var passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: "#AF5", //线颜色
        strokeWeight: 6 //线宽
      });

      this.carMarker.on("moving", function(e) {
        passedPolyline.setPath(e.passedPath);
      });
    },
    drawHistoryLine() {
      this.map.clearMap();
      var polyline = new AMap.Polyline({
        map: this.map,
        path: this.historylineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      this.map.setFitView();
    },
    renderLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    getLocationArray(locationInfo) {
      return locationInfo.map(item => {
        return [item.lng, item.lat];
      });
    },
    onBackHistoryTrack() {
      this.isShowHistoryTrack = false
      this.init()
    },
    async init() {
      await this.getWebDevice();
      const locationArray = this.getLocationArray(this.allLocationInfo);
      const [positionCenter] = locationArray;
      // alert(positionCenter)
      this.initAMap("history-map-container", positionCenter);
      this.addCicleMarkers();
    }
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
    .map-content {
      width: 100%;
      height: 100%;
    }
  }
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
  background: #6fa8e0ff;
  color: #ffffff;
  z-index: 100;
  .car-marker-item {
    width: d2r(58px);
    height: d2r(37px);
    line-height: d2r(37px);
    text-align: center;
    cursor: pointer;
    &.active {
      background: #9acdffff;
    }
  }
}
</style>
