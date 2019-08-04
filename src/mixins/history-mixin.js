/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import dayjs from 'dayjs'

export default {
    data() {
        return {
            loading: {},
        }
    },
  computed: {
    ...mapGetters(["historyInfo"])
  },
  methods: {
    initPickerTime() {
        const end = dayjs().toDate();
        const start = dayjs().set('h', 0).set('m', 0).set('s', 0).toDate();
        this.pickerTime = [start, end]
    },
    renderLoading() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    onSetSpeed(speed) {
      if (this.activeType === "") {
        this.carSpeed = speed;
      }
    },
    pauseMove() {
      this.activeType = "pause";
      this.isPauseMove = true;
      this.carMarker.pauseMove();
    },
    stopMove() {
      this.activeType = "stop";
      this.isPauseMove = false;
      this.carSpeed = 1;
      this.carMarker.stopMove();
      this.drawHistoryLine();
    },
    leaveStopMove() {
      if ((this.activeType = "stop")) {
        this.activeType = "";
      }
    },
    resumeMove() {
      this.carMarker.resumeMove();
    },
    startMove() {
      this.activeType = "start";
      if (this.isPauseMove) {
        this.resumeMove();
      } else {
        this.carMarker.moveAlong(this.graspRoadPath, 1000 * this.carSpeed);
      }
    },
    getCarMarkerContent() {
      let markerContent = document.createElement("div");
      markerContent.className = "mark-car";
      return markerContent;
    },
    drawCarMarker(path) {
      let [firstPosition] = path;
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
      this.map.setFitView();
    },
    drawGraspRoadPath(paths) {
      console.log('drawGraspRoadPath', paths)
      new AMap.Polyline({
        map: this.map,
        path: paths,
        strokeWeight: 7,
        strokeOpacity: 0.8,
        strokeColor: "#0091ea",
        showDir: true
      });
      this.map.setFitView()
    },
    convertGraspRoad(paths) {
      let that = this;
      let graspRoad = new AMap.GraspRoad();
      console.log("paths", paths);
      return new Promise((resolve, reject) => {
        graspRoad.driving(paths, (error, result) => {
          if (!error) {
            let graspRoadPath = result.data.points.map(item => {
              return [item.x, item.y];
            });
            console.log("graspRoadPath", graspRoadPath);
            // this.drawGraspRoadPath(graspRoadPath)
            this.graspRoadPath = this.graspRoadPath.concat(graspRoadPath);
            resolve();
          } else {
            this.$message({
              type: "error",
              message: '历史轨迹数据转化异常~'
            })
            reject()
          }
        });
      });
    },
    getDrawGraspRoadPath(path) {
      let firstTime = 0;
      return path.map((item, index) => {
        let utcOffset =  dayjs(`${item.signal_time}`).utcOffset()
        let currentTime =
          dayjs(`${item.signal_time}`)
            .subtract(utcOffset, "minute")
            .valueOf() / 1000;
        let delayTime = 0;
        if (index == 0) {
          delayTime = currentTime;
          firstTime = currentTime;
        } else {
          delayTime = currentTime - firstTime;
        }
        return {
          x: item.lng,
          y: item.lat,
          sp: item.speed,
          ag: item.course,
          tm: delayTime
        };
      });
    },
    async drawHistoryLine() {
      this.map.clearMap();
      this.graspRoadPath = [];
      for (let index = 0; index < this.historyInfo.length; index = index + 500) {
        let path = this.historyInfo.slice(index, index + 500);
        path = this.getDrawGraspRoadPath(path)
        await this.convertGraspRoad(path);
      }
      this.drawGraspRoadPath(this.graspRoadPath);
      this.drawCarMarker(this.graspRoadPath);
    }
  }
};
