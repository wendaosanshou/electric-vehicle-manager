/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

function throttle(fn, wait, options = {}) {
  let timer;
  let previous = 0;
  let throttled = function () {
      let now = +new Date();
      // remaining 不触发下一次函数的剩余时间
      if (!previous && options.leading === false) previous = now;
      let remaining = wait - (now - previous);
      if (remaining < 0) {
          if (timer) {
              clearTimeout(timer);
              timer = null;
          }
          previous = now;
          fn.apply(this, arguments)
      } else if (!timer && options.trailing !== false) {
          timer = setTimeout(() => {
              previous = options.leading === false ? 0 : new Date().getTime();
              timer = null;
              fn.apply(this, arguments);
          }, remaining);
      }
  }
  return throttled;
}


export default {
  data() {
    return {
      loading: {},
      graspRoadPath: [],
      lastPoint: [],
      allHistory: []
    };
  },
  computed: {
    ...mapGetters(["historyInfo"])
  },
  methods: {
    initPickerTime() {
      const end = dayjs().toDate();
      const start = dayjs()
        .set("h", 0)
        .set("m", 0)
        .set("s", 0)
        .toDate();
      this.pickerTime = [start, end];
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
      if (this.activeType === "stop") {
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
        this.carMarker.moveAlong(this.graspRoadPath, 400 * this.carSpeed);
      }
    },
    getCarMarkerContent() {
      let markerContent = document.createElement("div");
      let carContent = document.createElement("div");
      markerContent.append(carContent)
      markerContent.className = "mark-car"
      carContent.className = "mark-car-content";
      return markerContent;
    },
    drawCarMarker(historyInfo) {
      let paths = historyInfo.map(item => [item.lng, item.lat]);
      let [firstPosition] = paths;
      this.graspRoadPath = paths
      this.carMarker = new AMap.Marker({
        map: this.map,
        position: firstPosition,
        content: this.getCarMarkerContent(),
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, 0),
        zIndex: 10000
      });

      let passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: "#0960BD", //线颜色
        strokeWeight: 6, //线宽
        lineJoin: "round",
        showDir: true
      });
      let that = this
      let throttleSetCenter = throttle(() => {
        // console.log('setCenter', that.lastPoint)
        this.map.panTo(that.lastPoint)
      }, 300, {
        leading: false
      })
      this.carMarker.on("moving", function(e) {
        // console.log('moving', e)
        if (e.passedPath && e.passedPath.length > 1) {
          let [lastPoint] = e.passedPath.slice(-1)
          that.lastPoint = [lastPoint.lng, lastPoint.lat]
          throttleSetCenter()
        }
        passedPolyline.setPath(e.passedPath);
      });
      // this.map.setZoomAndCenter(15, firstPosition)
    },
    drawGraspRoadPath(historyInfo) {
      let paths = historyInfo.map(item => [item.lng, item.lat]);
      // console.log("drawGraspRoadPath", paths);
      new AMap.Polyline({
        map: this.map,
        path: paths,
        strokeWeight: 6,
        strokeColor: "#0960BD",
        lineJoin: "round",
        showDir: true,
        zIndex: 10
      });
      // this.map.setFitView();
    },
    drawCableLine(historyInfo) {
      let paths = historyInfo.filter(item => item.lng && item.lat).map(item => {
        return [item.lng, item.lat]
      });
      if (paths && paths.length > 0) {
        new AMap.Polyline({
          map: this.map,
          path: paths,
          strokeWeight: 4,
          strokeOpacity: 0.8,
          strokeColor: "#E4E4ED",
          // strokeColor: "#0960BD",
          lineJoin: "round",
          strokeStyle: "dashed",
          zIndex: 10
        });
      }
    },
    convertGraspRoad(paths) {
      let graspRoad = new AMap.GraspRoad();
      console.log("paths", paths);
      return new Promise((resolve, reject) => {
        graspRoad.driving(paths, (error, result) => {
          if (!error) {
            console.log("===points===", result.data);
            let graspRoadPath = result.data.points.map(item => {
              return [item.x, item.y];
            });
            // console.log("====graspRoadPath===", graspRoadPath);
            // this.drawGraspRoadPath(graspRoadPath)
            this.graspRoadPath = this.graspRoadPath.concat(graspRoadPath);
            resolve();
          } else {
            this.$message({
              type: "error",
              message: "历史轨迹数据转化异常~"
            });
            reject();
          }
        });
      });
    },
    getDrawGraspRoadPath(path) {
      let firstTime = 0;
      return path.map((item, index) => {
        let utcOffset = dayjs(`${item.signal_time}`).utcOffset();
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
    getHistoryLineData(path) {
      return path.map(item => [item.lng, item.lat]);
    },
    async drawGraspRoadLine() {
      this.map.clearMap();
      this.graspRoadPath = [];
      for (let index = 0; index < this.historyInfo.length; index = index + 500) {
        let path = this.historyInfo.slice(index, index + 500);
        path = this.getDrawGraspRoadPath(path);
        await this.convertGraspRoad(path);
      }
      this.drawGraspRoadPath(this.graspRoadPath);
      this.drawCarMarker(this.graspRoadPath);
    },
    getLineMarkerContent(item) {
      let markerContent = document.createElement("div");
      let iconContent = document.createElement("div");
      let timeContent = document.createElement("div");
      markerContent.className = "history-point-mark";
      iconContent.className = "history-point-inner";
      timeContent.className = "history-point-time";
      timeContent.innerHTML = this.getUtcOffsetTime(item.signal_time);
      markerContent.append(iconContent);
      markerContent.append(timeContent);
      setTimeout(() => {
        let $this = $(markerContent);
        $this.on("click", () => {
          console.log("on-click");
          let hasActive = $this.attr("class").indexOf("is-active") > -1;
          if (hasActive) {
            $this.removeClass("is-active");
          } else {
            $this.addClass("is-active");
          }
        });
      }, 100);
      return markerContent;
    },
    getStartMarkerContent(item, type = "start") {
      let markerContent = document.createElement("div");
      let timeContent = document.createElement("div");
      let iconContent = document.createElement("div");
      let typeClass = type === "start" ? "is-start" : "is-end";
      markerContent.className = `track-mark is-active ${typeClass}`;
      iconContent.className = "track-mark-content";
      timeContent.className = "track-mark-time";
      timeContent.innerHTML = this.getUtcOffsetTime(item.signal_time);
      markerContent.append(iconContent);
      markerContent.append(timeContent);
      setTimeout(() => {
        $(iconContent).on("click", () => {
          let $parent = $(iconContent).parent(".track-mark");
          let hasActive = $parent.attr("class").indexOf("is-active") > -1;
          if (hasActive) {
            $parent.removeClass("is-active");
          } else {
            $parent.addClass("is-active");
          }
        });
      }, 100);
      return markerContent;
    },
    drawUiMarkers(historyInfo) {
      let that = this
      console.log(historyInfo)
      AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) {

        if (!PointSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        var pointSimplifierIns = new PointSimplifier({
            map: that.map, //所属的地图实例
            zIndex: 110,
            getPosition: function(item) {
                console.log(item)
                if (!item) {
                    return null;
                }
                //返回经纬度
                return [item.lng, item.lat];
            },
            getHoverTitle: function(dataItem, idx) {
              console.log(dataItem)
              return dataItem.signal_time
            },
            renderOptions: {
              //点的样式
              pointStyle: {
                width: 7,
                height: 7,
                fillStyle: '#ffffff',
                lineWidth: 2,
                strokeStyle: '#0960BD'
              },
              //鼠标hover时的title信息
              hoverTitleStyle: {
                position: 'top'
              }
            }
        });

        window.pointSimplifierIns = pointSimplifierIns;

        pointSimplifierIns.setData(historyInfo);

        pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
            //console.log(e.type, record);
        });
      });
    },
    drawHistoryLineMaker(historyInfo) {
      let unitNum = Math.floor(historyInfo.lenght / 100) > 1 ? Math.floor(historyInfo.lenght / 100) : 1
      console.log('drawHistoryLineMaker', unitNum, historyInfo.lenght)
      for (let index = 0; index < historyInfo.length; index++) {
        const item = historyInfo[index];
        if (index % unitNum === 0) {
          new AMap.Marker({
            map: this.map,
            position: [item.lng, item.lat],
            content: this.getLineMarkerContent(item),
            anchor: "middle-center",
            offset: new AMap.Pixel(0, 0)
          });
        }
      }
    },
    drawStartEndMaker(startItem, type) {
      new AMap.Marker({
        map: this.map,
        position: [startItem.lng, startItem.lat],
        content: this.getStartMarkerContent(startItem, type),
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, 0)
      });
    },
    drawHistoryMaker(historyInfo) {
      if (historyInfo && historyInfo.length === 1) {
        let startEl = historyInfo[0];
        this.drawStartEndMaker(startEl, "start");
      } else if (historyInfo && historyInfo.length === 2) {
        let startEl = historyInfo[0];
        let endEl = historyInfo[historyInfo.length - 1];
        this.drawStartEndMaker(startEl, "start");
        this.drawStartEndMaker(endEl, "end");
      } else if (historyInfo && historyInfo.length > 2) {
        let startEl = historyInfo[0];
        let middleList = historyInfo.slice(1, -1);
        let endEl = historyInfo[historyInfo.length - 1];
        this.drawStartEndMaker(startEl, "start");
        // this.drawHistoryLineMaker(middleList);
        this.drawUiMarkers(middleList)
        this.drawStartEndMaker(endEl, "end");
      }
    },
    getDeviceStatusContent(item) {
      console.log(item)
      let markerContent = document.createElement("div");
      let timeContent = document.createElement("div");
      let tipsContent = document.createElement("div");
      let { signal_time, recv_time, deviceStatusTips } = item
      timeContent.innerHTML = `${signal_time}至${recv_time}`
      tipsContent.innerHTML = `${deviceStatusTips}`
      markerContent.className = "device-status-content";
      timeContent.className = "device-time-content";
      tipsContent.className = "device-tips-content";
      markerContent.append(timeContent);
      markerContent.append(tipsContent)
      return markerContent
    },
    drawDeviceStatus(item) {
      if (item && item.lng) {
        let position = [item.lng, item.lat]
        console.log('drawDeviceStatus', position)
        let infoWindow = new AMap.InfoWindow({
          content: this.getDeviceStatusContent(item),
          anchor: "bottom-center",
          offset: new AMap.Pixel(16, -26)
        });
        infoWindow.open(this.map, position)
      }
    },
    async drawHistoryLine() {
      this.map.clearMap();
      if (this.historyInfo && this.historyInfo.length > 0) {
        let prevHistory = this.historyInfo[0]
        let prevIndex = 0
        this.allHistory = []
        for (let index = 0; index < this.historyInfo.length; index++) {
          const currentHistory = this.historyInfo[index];
          // 画轨迹
          this.drawGraspRoadPath(currentHistory);
          // 画点
          if (index > prevIndex && prevHistory.length > 0 && currentHistory.length > 0) {
            let [prevLastPoint] = prevHistory.slice(-1)
            let [currentStartPoint] = currentHistory
            this.drawCableLine([prevLastPoint, currentStartPoint])
            prevIndex = index
            prevHistory = currentHistory
          }
          this.allHistory = this.allHistory.concat(currentHistory)
        }
        console.log('allHistory', JSON.parse(JSON.stringify(this.allHistory)), JSON.parse(JSON.stringify(this.historyInfo)))
        this.drawHistoryMaker(this.allHistory);
        this.drawCarMarker(this.allHistory);
      }
      this.map.setFitView();
    }
  }
};
