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
          placeholder="请选择账号类型"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in accountList"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchValue" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchLocation">查询</el-button>
        <!-- <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchAllDevice">查询全部</el-button> -->
      </div>
    </div>
    <!-- {{getLocation(allLocationInfo)}}--{{getLocation(allDeviceInfo)}} -->
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
import { mapGetters, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import FilingLoseDialog from "./FilingLoseDialog";
import HistoryTrackDialog from "../history-track/HistoryTrackDialog";
import LocationDialog from "./LocationDialog";
import TrackModeDialog from "./TrackModeDialog";
import ClearHistoryDialog from "./ClearHistoryDialog";
import { setTimeout } from "timers";

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
        {
          value: 1,
          label: "热力图模式"
        }
      ],
      searchType: "account",
      searchValue: ""
    };
  },
  computed: {
    ...mapGetters([
      "deviceIds",
      "allLocationInfo",
      "currentLocationInfo",
      "deviceInfo",
      "accountList",
      "allDeviceInfo"
    ]),
    isAllowSearch() {
      return this.searchType && this.searchValue;
    }
  },
  methods: {
    ...mapActions(["getWebDevice", "getDeviceInfo", "getDeviceInfoAndUpdate", "getAllDevice"]),
    getLocation(list) {
      return list.map(item => {
        return {
          lat: item.lat,
          lng: item.lng
        }
      })
    },
    async onSearchLocation() {
      if (this.isAllowSearch) {
        await this.getDeviceInfoAndUpdate({
          type: this.searchType,
          value: this.searchValue
        });
        this.drawAMap();
        setTimeout(() => {
          this.filingDialogVisible = true;
        }, 300);
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的查询条件!"
        });
      }
    },
    async toogleLocationLabel(className, position, that) {
      if (className.indexOf("location-marker-label-1") > -1) {
        await this.getDeviceInfo({
          type: "imei",
          value: this.currentLocationInfo.imei
        });
        this.filingDialogVisible = true;
      } else if (className.indexOf("location-marker-label-2") > -1) {
        this.historyTrackVisible = true;
      } else if (className.indexOf("location-marker-label-3") > -1) {
        this.trackModeVisible = true;
      } else if (className.indexOf("location-marker-label-4") > -1) {
        this.filingLoseDialogVisible = true;
      } else if (className.indexOf("location-marker-label-5") > -1) {
        this.clearHistoryDialogVisible = true;
      }
    },
    onDialogHide() {
      this.filingDialogVisible = false;
    },
    getHeatMapData() {
      let heatmapData = this.allDeviceInfo.filter(item => {
        return item.lat > 0 && item.lng > 0
      }).map(item => {
        return {
          lat: item.lat,
          lng: item.lng,
          count: 50
        }
      })
      console.log('getHeatMapData', heatmapData)
      return heatmapData
    },
    getLocationArray(deviceInfo) {
      return deviceInfo.map(item => {
        return [item.lng, item.lat];
      });
    },
    drawAMap() {
      const locationArray = this.getLocationArray(this.allLocationInfo);
      const [positionCenter] = locationArray;
      // alert(positionCenter)
      this.initAMap("map-container", positionCenter);
      this.addCicleMarkers();
    },
    async drawHeatMap() {
      let heatMapData = this.getHeatMapData()
      let [firstItem] = heatMapData
      let positionCenter = [firstItem.lng, firstItem.lat]
      this.initHeatMap("map-container", positionCenter, heatMapData);
      this.heatmap.setZoomAndCenter(8, positionCenter);
    },
    onMapSelect(value) {
      if (this.mapValue === 0) {
        this.drawAMap()
      } else if (this.mapValue === 1) {
        this.drawHeatMap()
      }
    },
    async onSearchAllDevice() {
      await this.getWebDevice();
      await this.getAllDevice()
      this.onMapSelect();
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
    this.onSearchAllDevice();
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
