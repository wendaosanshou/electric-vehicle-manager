export default {
  data() {
    return {
      map: {},
      heatMap: {},
      pageHeight: '800px'
    };
  },
  methods: {
    getMapHeight() {
      let pageHeight = document.documentElement.clientHeight
      let rect = document.querySelector('.js-map-container').getBoundingClientRect()
      let { top } = rect
      let mapHeight = pageHeight - top - 16
      console.log('getMapHeight', pageHeight, top, mapHeight)
      this.pageHeight = `${mapHeight}px`
    },
    addControl() {
      const scale = new AMap.Scale({
        visible: false
      });
      const toolBar = new AMap.ToolBar({
        visible: false
      });
      this.map.addControl(scale);
      this.map.addControl(toolBar);
      scale.show();
    },
    initAMap(id, position = [116.43, 39.92]) {
      // 初始化地图
      this.map = new AMap.Map(id, {
        zoom: 13,
        center: position,
        resizeEnable: true
      });
      this.addControl();
    },
    isSupportCanvas() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
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
    initHeatMap(id, position) {
      let map = new AMap.Map(id, {
        resizeEnable: true,
        center: position,
        zoom: 11
      });

      if (!this.isSupportCanvas()) {
        alert("热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~");
      }

      map.plugin(["AMap.Heatmap"], () => {
        //初始化heatmap对象
        this.heatmap = new AMap.Heatmap(map, {
          radius: 25, //给定半径
          opacity: [0, 0.8]
        });
        //设置数据集：该数据为北京部分“公园”数据
        this.heatmap.setDataSet({
          data: heatmapData,
          max: 100
        });
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getMapHeight()
    })
  }
};
