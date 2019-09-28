<template>
  <div class="track-lose-dialog">
    <el-dialog
      class="dialog-fix dialog-container"
      title="追踪模式"
      width="1280px"
      :visible.sync="dialogVisible"
      @close="onDialogHide">
      <div class="track-dialog-content">
        <div class="track-header">
          <div class="track-header-account">车辆账号：{{userInfo.phone}}</div>
          <div class="track-header-username">车主姓名：{{userInfo.name}}</div>
          <div class="track-header-selector">
            <span>追踪粒度：</span>
            <el-select class="ipt-fix ipt-selector" size="mini" v-model="selectValue" placeholder="请选择追踪力度">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in selectList"
                :key="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button class="btn-search btn-fix" size="mini" type="primary" @click="onSearchGpsInfo">查询</el-button>
          <div class="btn-label">实时数据更新倒计时：{{selectValue - trackTime}},实时数据已更新次数：{{trackCount}}</div>
        </div>
        <div class="track-content">
          <div class="map-container">
            <div class="map-content" id="js-track-map"></div>
            <div class="history-location">
              <el-table class="table-analysis table-analysis-fix" size="mini" :data="addAddressTrickList" border style="width: 300px" height="527px" max-height="527px">
                <el-table-column prop="signal_time"  min-width="130" label="经过时间">
                  <template slot-scope="scope">{{getUtcOffsetTime(scope.row.signal_time)}}</template>
                </el-table-column>
                <el-table-column prop="formattedAddress" min-width="130" label="经过地点"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="track-alarm">
            <el-table class="table-analysis table-analysis-fix" size="mini" :data="addAddressTrickAlarms" border style="width: 100%" max-height="200px">
              <el-table-column prop="note" min-width="130" label="告警类型">
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button
          class="btn-confirm"
          size="mini"
          type="primary"
          @click="onDialogConfirm">设置</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapMutations } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import HistoryMixin from "@/mixins/history-mixin";
import { setTimeout, setInterval, clearInterval } from 'timers';

export default {
  mixins: [MapMixin, HistoryMixin],
  data() {
    return {
      dialogVisible: false,
      trackId: '',
      trackTime: 0,
      trackCount: 0,
      selectList: [{
        value: 30,
        label: '极限模式（三十秒一次）'
      }, {
        value: 60,
        label: '追踪模式（一分钟一次）'
      }, {
        value: 300,
        label: '普通模式（五分钟一次）'
      }],
      selectValue: 30,
      addAddressTrickList: [],
      addAddressTrickAlarms: []
    };
  },
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: Boolean
  },
  computed: {
    ...mapGetters(['currentLocationInfo', 'deviceParams', 'deviceInfo', 'trickAlarms', 'trickList', 'trickAlarmId']),
    positionCenter() {
      const { lat, lng } = this.currentLocationInfo;
      return [lng, lat];
    },
    vehicleInfo() {
      if (this.deviceInfo && this.deviceInfo.vehicle_info) {
        return this.deviceInfo.vehicle_info
      }
      return {}
    },
    userInfo() {
      if (this.deviceInfo && this.deviceInfo.user_info) {
        return this.deviceInfo.user_info
      }
      return {}
    }
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
      if (this.dialogVisible) {
        this.handleSearchGpsInfo()
        setTimeout(() => {
          this.init()
          this.initDeviceParams()
          this.updateTrackAlarmId(0)
        }, 10)
      } else {
        this.resetTrack()
      }
    }
  },
  methods: {
    ...mapActions(["getUserInfoGps", "setDeviceTrace", "getDeviceParams", "getWebDevice"]),
    ...mapMutations(['resetTrackAlarms', 'updateTrackAlarmId']),
    resetTrack() {
      clearInterval(this.trackId)
      this.trackTime = 0
      this.trackCount = 0
      this.resetTrackAlarms()
    },
    initWatchTrack() {
      this.$message({
        type: "success",
        message: `追踪模式定时刷新任务已开启，刷新时间间隔${this.selectValue}秒一次`
      })
      clearInterval(this.trackId)
      this.trackId = setInterval(() => {
        this.trackTime = this.trackTime + 1
        console.log(this.trackTime)
        if (this.trackTime === this.selectValue) {
          this.trackCount = this.trackCount + 1
          this.trackTime = 0
          this.handleSearchGpsInfo()
          this.$message({
            type: "success",
            message: `实时轨迹数据已刷新~`
          })
        }
      }, 1000)
    },
    async initDeviceParams() {
      await this.getDeviceParams({
        id: this.currentLocationInfo.id
      })
      this.selectValue = this.deviceParams.interval_time
    },
    onDialogHide() {
      this.$emit("change", false);
    },
    async onDialogConfirm() {
      this.onDialogHide()
    },
    async onSearchGpsInfo() {
      this.showLoading()
      // await this.setDeviceTrace({
      //   id: this.currentLocationInfo.id,
      //   second: this.selectValue
      // })
      await this.handleSearchGpsInfo()
      this.initWatchTrack()
      this.hideLoading()
    },
    async handleSearchGpsInfo() {
      try {
        let userId = ""
        if (this.userInfo && this.userInfo.id) {
          userId = this.userInfo.id
        } else if (this.deviceInfo && this.deviceInfo.id) {
          userId = this.deviceInfo.id
        }
        if (userId) {
          await this.getUserInfoGps({
            userId,
            alarmId: this.trickAlarmId
          })
          await this.addFormattedAddress(this.trickAlarms, (result) => {
            this.addAddressTrickAlarms = result
          })
          await this.addFormattedAddress(this.trickList, (result) => {
            this.addAddressTrickList = result
          })
          this.drawTrickListLine()
        } else {
          this.$message({
            type: "error",
            message: `该设备服务异常~`
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.hideLoading()
    },
    drawTrickListLine() {
      this.map.clearMap();
      this.drawHistoryMaker(this.trickList)
      // eslint-disable-next-line
      this.map.setFitView()
    },
    async init() {
      this.initAMap("js-track-map", this.positionCenter);
    }
  },
  beforeDestroy() {
    this.resetTrack()
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.track-dialog-content {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: d2r(33px) d2r(39px) d2r(16px) d2r(50px);
}

.track-dialog-content {
  .track-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .track-header-username {
      margin-left: d2r(40px);
    }
    .track-header-selector {
      margin-left: d2r(96px);
    }
    .btn-search {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: d2r(160px);
      height: d2r(35px);
      margin-left: d2r(40px);
      border-radius: 0;
    }
  }
  .track-content {
    margin-top: d2r(33px);
    .map-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      .map-content {
        width: 900px;
        height: 527px;
        border: 1px solid #ebeef5;
      }
    }
  }
  .track-alarm {
    margin-top: 10px;
  }
}

.btn-label {
  text-align: right;
  font-size: d2r(13px);
  margin-left: auto;
}
</style>
