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
          v-model="searchValue"
          placeholder="请选择活动区域"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in searchList"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input class="ipt-fix ipt-number" size="mini" v-model="searchNumber" placeholder="请输入内容"></el-input>
        <el-button class="button-fix" size="mini" type="primary">查询</el-button>
      </div>
    </div>

    <div class="monitor-container">
      <div class="map-tips">地图默认标尺为“5公里”，可以放大缩小。</div>
      <div class="map-content" id="map-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aMap: {},
      heatMap: {},
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
      searchValue: 0,
      searchNumber: "",
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
      ]
    };
  },
  methods: {
    onMapSelect(value) {
      if (this.mapValue === 0) {
        this.initAMap();
      } else if (this.mapValue === 1) {
        this.initHeatMap();
      }
    },
    isSupportCanvas() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
    addMarker() {
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.92),
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        offset: new AMap.Pixel(-13, -30)
      });
    },
    initMap() {
      this.onMapSelect();
    },
    initAMap() {
      const scale = new AMap.Scale({
        visible: false
      });
      const toolBar = new AMap.ToolBar({
        visible: false
      });
      this.aMap = new AMap.Map("map-container", {
        resizeEnable: true
      });
      this.aMap.addControl(scale);
      this.aMap.addControl(toolBar);
      scale.show();
    },
    initHeatMap() {
      var map = new AMap.Map("map-container", {
        resizeEnable: true,
        center: [116.418261, 39.921984],
        zoom: 11
      });

      if (!this.isSupportCanvas()) {
        alert(
          "热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~"
        );
      }

      var heatmap;
      map.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
          radius: 25, //给定半径
          opacity: [0, 0.8]
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        });
      });
    }
  },
  mounted() {
    this.initMap();
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
</style>
