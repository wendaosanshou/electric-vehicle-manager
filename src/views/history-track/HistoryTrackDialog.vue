<template>
  <div class="history-track-dialog">
    <el-dialog
      class="dialog-fix dialog-container"
      title="历史轨迹"
      width="1209px"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <!-- {{historylineArr}} -->
      <!-- {{historylineArr}} -->
      <div class="history-dialog-content">
        <div class="history-dialog-title">
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
          <el-button class="button-fix" size="mini" type="primary" @click="onSearchHistory">查询</el-button>
        </div>
        <div class="map-container">
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
            <div class="car-marker-item" @click="backHistory">退出</div>
          </div>
          <div class="history-map-container" id="history-map-container"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      loading: {},
      map: {},
      isShowHistoryTrack: false,
      isPauseMove: false,
      carSpeed: 1,
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
      pickerTime: "",
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
  watch: {
    visible() {
      this.dialogVisible = this.visible;
      if (this.visible) {
        setTimeout(() => {
          this.initAMap();
        }, 10);
      } else {
        this.isShowHistoryTrack = false
      }
    }
  },
  computed: {
    ...mapGetters(["historylineArr", "currentLocationInfo"]),
    positionCenter() {
      const { lat, lng } = this.currentLocationInfo;
      return [lng, lat];
    }
  },
  methods: {
    ...mapActions(["getHistoryInfo"]),
    backHistory() {
      this.isShowHistoryTrack = false
      this.initAMap();
    },
    onDialogHide() {
      this.$emit("change", false);
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
      console.log('firstPosition', firstPosition)
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
    initAMap() {
      // 初始化地图
      this.map = new AMap.Map("history-map-container", {
        zoom: 17,
        center: this.positionCenter,
        resizeEnable: true
      });
    },
    renderLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    async onSearchHistory() {
      console.log(this.pickerTime);
      this.renderLoading()
      const [startDate, endDate] = this.pickerTime;
      if (startDate && endDate) {
        await this.getHistoryInfo({
          id: this.currentLocationInfo.id,
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
      this.loading.close()
    }
  },
  mounted() {
    this.initAMap();
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.history-dialog-content {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: d2r(0) d2r(40px) d2r(41px) d2r(52px);
}
.history-dialog-title {
  width: 100%;
  height: d2r(100px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.map-container {
  position: relative;
  width: 100%;
  height: d2r(646px);
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
  .history-map-container {
    width: 100%;
    height: d2r(646px);
  }
}
</style>
