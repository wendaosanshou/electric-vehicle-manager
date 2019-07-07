<template>
  <div class="electric-fence">
    <div class="fence-title">
      <div class="track-time">
        <el-date-picker
          v-model="value2"
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
          v-model="searchValue"
          placeholder="请选择电子围栏"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in accountList"
            :key="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="title-right">
        <el-button class="button-fix" size="mini" type="primary" @click="onSearchFence">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleAddFence">新增围栏</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleSaveFence">保存</el-button>
      </div>
    </div>

    <div class="monitor-container js-map-container" :style="{height: pageHeight}">
      <div class="map-content" id="electric-map-container"></div>
      <div class="electric-desc-content">
        <div class="electric-item">
          <div class="electric-item-title">闯禁区违法情况</div>
          <div class="electric-item-content">暂无数据</div>
        </div>
        <div class="electric-item">
          <div class="electric-item-title">违章停放情况</div>
          <div class="electric-item-content">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";

export default {
  mixins: [MapMixin],
  data() {
    return {
      value2: "",
      positionCenter: [116.43, 39.92],
      rectangleEditor: {},
      searchNumber: "",
      searchType: 0,
      searchTypeList: [
        {
          value: 0,
          label: "全部告警类型"
        },
        {
          value: 1,
          label: "位移告警"
        },
        {
          value: 2,
          label: "震动告警"
        },
        {
          value: 3,
          label: "温度告警"
        },
        {
          value: 4,
          label: "超速告警"
        },
        {
          value: 5,
          label: "摔倒告警"
        },
        {
          value: 6,
          label: "电瓶低电压告警"
        },
        {
          value: 7,
          label: "外置电源断电告警"
        },
        {
          value: 8,
          label: "内置电池低电压告警"
        }
      ],
      searchValue: "",
      searchList: [
        {
          value: 0,
          label: "手机号"
        },
        {
          value: 1,
          label: "终端IMEI"
        },
        {
          value: 2,
          label: "防盗备案号"
        },
        {
          value: 3,
          label: "IMSI"
        },
        {
          value: 4,
          label: "身份证号"
        }
      ],
      aMap: {}
    };
  },
  computed: {
    ...mapGetters(["pickerOptions", "accountList", "allLocationInfo"])
  },
  methods: {
    ...mapActions(['getWebDevice']),
    handleAddFence() {
      this.map.clearMap()
      let center = this.map.getCenter();
      var southWest = new AMap.LngLat(center.lng - 0.02, center.lat - 0.01);
      var northEast = new AMap.LngLat(center.lng + 0.02, center.lat + 0.01);

      var bounds = new AMap.Bounds(southWest, northEast);

      var rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor: "red",
        strokeWeight: 6,
        strokeOpacity: 0.5,
        strokeDasharray: [30, 10],
        // strokeStyle还支持 solid
        strokeStyle: "dashed",
        fillColor: "blue",
        fillOpacity: 0.5,
        cursor: "pointer",
        zIndex: 50
      });

      rectangle.setMap(this.map);
      // 缩放地图到合适的视野级别
      this.map.setFitView([rectangle]);

      this.rectangleEditor = new AMap.RectangleEditor(this.map, rectangle);

      this.rectangleEditor.on("adjust", function(event) {
        console.log("触发事件：adjust");
      });

      this.rectangleEditor.on("end", function(event) {
        console.log("触发事件： end");
      });

      setTimeout(() => {
        this.rectangleEditor.open();
      }, 100);
    },
    handleOpenFence() {
      this.rectangleEditor.close();
    },
    handleSaveFence() {
      this.rectangleEditor.close();
      this.map.clearMap()
    },
    onSearchFence() {},
    drawAMap() {
      const [{lng, lat}] = this.allLocationInfo
      const positionCenter = [lng, lat]
      this.initAMap("electric-map-container", positionCenter);
    },
    async init() {
      await this.getWebDevice();
      this.drawAMap()
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

.electric-fence {
  padding: d2r(20px) d2r(43px) 0 d2r(42px);
  .fence-title {
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
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
      box-sizing: border-box;
      flex-grow: 1;
      height: 100%;
    }
    .electric-desc-content {
      box-sizing: border-box;
      width: d2r(320px);
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      .electric-item {
        width: d2r(300px);
        margin-top: d2r(10px);
        flex-grow: 1;
        border: 1px solid rgba(229, 233, 238, 1);
        &:nth-child(1) {
          margin-top: 0;
        }
        .electric-item-title {
          box-sizing: border-box;
          padding-left: d2r(10px);
          width: 100%;
          height: d2r(40px);
          font-size: d2r(14px);
          text-align: left;
          line-height: d2r(40px);
          background: #9e9db6ff;
          color: #3b4859ff;
        }
        .electric-item-content {
          width: 100%;
          height: d2r(340px);
          line-height: d2r(340px);
          font-size: d2r(13px);
          color: #3b4859ff;
        }
      }
    }
  }
}
</style>
