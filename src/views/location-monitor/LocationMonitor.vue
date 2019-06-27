<template>
  <div class="location-monitor">
    <div class="monitor-title">
      <div class="title-left">
        <el-select
          class="ipt-fix"
          size="mini"
          v-model="mapValue"
          placeholder="请选择模式"
          @change="onMapSelect"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in mapList"
            :key="item.value"
          ></el-option>
        </el-select>
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
            v-for="item in searchList"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchValue" placeholder="请输入内容"></el-input>
        <el-button class="button-fix" size="mini" type="primary" @click="onSearchLocation">查询</el-button>
      </div>
    </div>
    <div class="monitor-container">
      <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div>
      <div class="map-content js-map-container" id="map-container" :style="{height: pageHeight}"></div>
    </div>

    <location-dialog v-model="filingDialogVisible"></location-dialog>
    <history-track-dialog v-model="historyTrackVisible"></history-track-dialog>
    <filing-lose-dialog v-model="filingLoseDialogVisible"></filing-lose-dialog>
    <track-mode-dialog v-model="trackModeVisible"></track-mode-dialog>
    <clear-history-dialog v-model="clearHistoryDialogVisible"></clear-history-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import MapMixin from '@/mixins/map-mixin'
import FilingLoseDialog from "./FilingLoseDialog";
import HistoryTrackDialog from "../history-track/HistoryTrackDialog";
import LocationDialog from "./LocationDialog";
import TrackModeDialog from "./TrackModeDialog";
import ClearHistoryDialog from "./ClearHistoryDialog";
import { setTimeout } from 'timers';

export default {
  mixins: [MapMixin],
  data() {
    return {
      filingDialogVisible: false,
      filingLoseDialogVisible: false,
      historyTrackVisible: false,
      trackModeVisible: false,
      clearHistoryDialogVisible: false,
      positionCenter: [116.43, 39.92],
      mapValue: 0,
      mapList: [
        {
          value: 0,
          label: "地图模式"
        },
        // {
        //   value: 1,
        //   label: "热力图模式"
        // }
      ],
      searchType: 'account',
      searchValue: "",
      searchList: [
        {
          value: 'account',
          label: "手机号"
        },
        {
          value: 'imei',
          label: "终端IMEI"
        },
        {
          value: 'record',
          label: "防盗备案号"
        },
        {
          value: 'iccid',
          label: "IMSI"
        },
        {
          value: 'cert',
          label: "身份证号"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["allDeviceInfo", "deviceIds", "allLocationInfo", 'currentLocationInfo', 'deviceInfo']),
    allDeviceIds() {
      return this.allDeviceInfo.map(item => item.id);
    }
  },
  methods: {
    ...mapMutations(['updateCurrentLocationInfo']),
    ...mapActions(["getAllDeviceInfo", "getSomeDeviceInfo", "getDeviceInfo"]),
    async onSearchLocation() {
      await this.getDeviceInfo({
        type: this.searchType,
        value: this.searchValue
      })
      this.filingDialogVisible = true;
    },
    onDialogHide() {
      this.filingDialogVisible = false;
    },
    onMapSelect(value) {
      if (this.mapValue === 0) {
        this.initAMap('map-container', this.positionCenter);
        this.addCicleMarkers()
      } else if (this.mapValue === 1) {
        this.initHeatMap('map-container', this.positionCenter);
      }
    },
    addLocationMarker(info) {
      const position = [info.lng, info.lat]
      this.map.clearMap();
      this.addInfoWindow(position, this.getLocationMarkerContent())
      this.map.setZoomAndCenter(17, position)
      setTimeout(() => {
        this.initLocaionEvent(position)
      }, 100)
    },
    getLocationMarkerContent() {
      let markerContent = document.createElement("div");
      let markerLabel1 = document.createElement("div");
      let markerLabel2 = document.createElement("div");
      let markerLabel3 = document.createElement("div");
      let markerLabel4 = document.createElement("div");
      let markerLabel5 = document.createElement("div");
      let markerIcon = document.createElement("i");
      let markerList = [{
        node: markerLabel1,
        label: '备案<br/>信息',
        className: 'location-marker-label location-marker-label-1'
      },{
        node: markerLabel2,
        label: '历史<br/>轨迹',
        className: 'location-marker-label location-marker-label-2'
      },{
        node: markerLabel3,
        label: '追踪<br/>模式',
        className: 'location-marker-label location-marker-label-3'
      },{
        node: markerLabel4,
        label: '丢失<br/>立案',
        className: 'location-marker-label location-marker-label-4'
      },{
        node: markerLabel5,
        label: '清除<br/>轨迹',
        className: 'location-marker-label location-marker-label-5'
      },{
        node: markerIcon,
        label: '',
        className: 'location-marker-icon'
      }]
      markerList.forEach(item => {
        item.node.className = item.className
        item.node.innerHTML = item.label
       
        markerContent.append(item.node)
      })
      markerContent.className = 'location-marker'
      setTimeout(() => {
        $('.amap-info-close').on('click', () => {
          this.addCicleMarkers()
        })
      }, 100)
      return markerContent
    },
    async toogleLocationLabel(className) {
      if (className.indexOf('location-marker-label-1') > -1) {
        await this.getDeviceInfo({
          type: 'imei',
          value: this.currentLocationInfo.imei
        })
        this.filingDialogVisible = true;
      } else if (className.indexOf('location-marker-label-2') > -1) {
        this.historyTrackVisible = true
      } else if (className.indexOf('location-marker-label-3') > -1) {
        this.trackModeVisible = true
      } else if (className.indexOf('location-marker-label-4') > -1) {
        this.filingLoseDialogVisible = true
      } else if (className.indexOf('location-marker-label-5') > -1) {
        this.clearHistoryDialogVisible = true
      }
    },
    initLocaionEvent(position) {
      let that = this
       $('.location-marker').on('click', '.location-marker-label', function() {
          $('.location-marker-label').removeClass('active')
          let $this = $(this)
          console.log($this.attr('class'))
          $this.addClass('active')
          that.toogleLocationLabel($this.attr('class'))
        }).on('click', '.location-marker-icon', () => {
          that.aMap.setZoomAndCenter(15, position)
        })
    },
    getCicleMarkerContent(positionInfo) {
      let markerContent = document.createElement("div");
      let markerContent1 = document.createElement("div");
      let markerContent2 = document.createElement("div");
      let markerContent3 = document.createElement("div");
      markerContent.className = "mark-content";
      markerContent1.className = "mark-content-1";
      markerContent2.className = "mark-content-2";
      markerContent3.className = "mark-content-3";
      markerContent2.append(markerContent3);
      markerContent1.append(markerContent2);
      markerContent.append(markerContent1);
      markerContent3.innerHTML = '000';
      setTimeout(() => {
        $(markerContent).on('click', () => {
          this.updateCurrentLocationInfo(positionInfo)
          this.addLocationMarker(positionInfo)
        })
      }, 100)
      return markerContent;
    },
    addCicleMarkers() {
      this.map.clearMap();
      this.allLocationInfo.forEach(item => {
        const position = [item.lng, item.lat]
        this.addMarker(position, this.getCicleMarkerContent(item));
      });
      this.map.setFitView();
    },
    addMarker(position, content) {
      new AMap.Marker({
        map: this.map,
        position: position,
        content: content,
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
        offset: new AMap.Pixel(-13, -30)
      });
    },
    addInfoWindow(position, content) {
      let infoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center',
        content: content  //使用默认信息窗体框样式，显示信息内容
      });
      infoWindow.open(this.map,position)
    },
    getLocationArray(locationInfo) {
      return locationInfo.map(item => { 
        return [item.lng , item.lat]
      })
    },
    async init() {
      await this.getAllDeviceInfo();
      const locationArray = this.getLocationArray(this.allLocationInfo)
      const [positionCenter] = locationArray
      console.log('positionCenter', positionCenter)
      this.initAMap('map-container', positionCenter);
      this.addCicleMarkers()
    }
  },
  components: {
    LocationDialog,
    HistoryTrackDialog,
    FilingLoseDialog,
    TrackModeDialog,
    ClearHistoryDialog
  },
  mounted() {
    // this.onMapSelect();
    // this.getAllDeviceInfo();
    this.init()
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.location-monitor {
  padding: d2r(20px) d2r(43px) 0 d2r(42px);
  .monitor-title {
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
        width: d2r(219px);
        margin-right: d2r(10px);
      }
      .ipt-number {
        width: d2r(540px);
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

.dialog-small-right {
  .dialog-content {
    max-height: d2r(611px);
    background: #ffffff;
    overflow: scroll;
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
        height: d2r(34px);
        line-height: d2r(34px);
        font-size: d2r(13px);
        color: #9b9b9b;
        text-align: left;
        padding-left: d2r(23px);
        margin-top: 2px;
        background: rgba(221, 221, 221, 0.24);
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
