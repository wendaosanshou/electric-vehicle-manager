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
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchHistory">查询</el-button>
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
            <div class="car-marker-item" :class="{active: activeType === 'pause'}" @click="pauseMove">暂停</div>
            <div class="car-marker-item" :class="{active: activeType === 'start'}" @click="startMove">开始</div>
            <div class="car-marker-item" :class="{active: activeType === 'stop'}" @click="stopMove" @mouseleave="leaveStopMove">停止</div>
            <div class="car-marker-item" :class="{active: activeType === 'destory'}" @click="onBackHistoryTrack">退出</div>
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
      activeType: '',
      carSpeed: 1,
      pickerTime: "",
      dialogVisible: false,
      graspRoadPath: []
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
    ...mapGetters(["historyLineInfo", "currentLocationInfo"]),
    positionCenter() {
      const { lat, lng } = this.currentLocationInfo;
      return [lng, lat];
    }
  },
  methods: {
    ...mapActions(["getHistoryInfo"]),
    onBackHistoryTrack() {
      this.activeType = 'destory'
      this.isShowHistoryTrack = false
      this.initAMap();
    },
    onDialogHide() {
      this.$emit("change", false);
    },
    onSetSpeed(speed) {
      if(this.activeType === '') {
        this.carSpeed = speed;
      }
    },
    pauseMove() {
      this.activeType = 'pause'
      this.isPauseMove = true;
      this.carMarker.pauseMove();
    },
    stopMove() {
      this.activeType = 'stop'
      this.isPauseMove = false;
      this.carSpeed = 1;
      this.carMarker.stopMove();
      this.drawHistoryLine()
    },
    leaveStopMove() {
      if (this.activeType = 'stop') {
        this.activeType = ''
      }
    },
    resumeMove() {
      this.carMarker.resumeMove();
    },
    startMove() {
      this.activeType = 'start'
      if (this.isPauseMove) {
        this.resumeMove();
      } else {
        this.carMarker.moveAlong(this.graspRoadPath, 800 * this.carSpeed);
      }
    },
    getCarMarkerContent() {
      let markerContent = document.createElement("div");
      markerContent.className = "mark-car";
      return markerContent;
    },
    drawCarMarker(path) {
      let [firstPosition] = path;
      console.log('firstPosition', firstPosition)
      this.carMarker = new AMap.Marker({
        map: this.map,
        position: firstPosition,
        content: this.getCarMarkerContent(),
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, 0)
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
    drawGraspRoad(paths) {
      let that = this;
      var graspRoad = new AMap.GraspRoad();
      return new Promise((resolve, reject) => {
        graspRoad.driving(paths, (error, result) => {
          console.log(result)
          if (!error) {
            let path2 = []
            var newPath = result.data.points;
            for (var i = 0; i < newPath.length; i += 1) {
              path2.push([newPath[i].x, newPath[i].y]);
            }
            var newLine = new AMap.Polyline({
              path: path2,
              strokeWeight: 8,
              strokeOpacity: 0.8,
              strokeColor: "#0091ea",
              showDir: true
            });
            this.map.add(newLine);
            console.log('path2', path2.length)
            this.graspRoadPath = this.graspRoadPath.concat(path2)
            resolve();
          }
        });
      });
    },
    async drawHistoryLine() {
      this.map.clearMap();
      this.graspRoadPath = [];
      for (
        let index = 0;
        index < this.historyLineInfo.length;
        index = index + 200
      ) {
        let path = this.historyLineInfo.slice(index, index + 500);
        await this.drawGraspRoad(path);
      }
      this.drawCarMarker(this.graspRoadPath);
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
      try {
         const [startDate, endDate] = this.pickerTime;
        if (startDate && endDate) {
          await this.getHistoryInfo({
            id: this.currentLocationInfo.id,
            start: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
            end: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")
          });
          await this.drawHistoryLine();
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
