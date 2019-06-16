<template>
  <div class="electric-fence">
    <div class="fence-title">
      <div class="title-left">
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="searchType"
          placeholder="请选择告警类型"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in searchTypeList"
            :key="item.value"
          ></el-option>
        </el-select>
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
      </div>
      <div class="title-right">
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
      value2: "",
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
  methods: {
    onMapSelect(value) {
      if (this.mapValue === 0) {
        this.initAMap();
      }
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
