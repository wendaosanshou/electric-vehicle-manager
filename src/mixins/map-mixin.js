/* eslint-disable */
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      map: {},
      heatMap: {},
      searchType: 'account',
      searchValue: '',
      pageHeight: '800px',
      markerClusterer: [],
      cluster: {}
    }
  },
  methods: {
    ...mapActions(['getDeviceInfo']),
    ...mapMutations(['updateCurrentLocationInfo']),
    getMapHeight() {
      let pageHeight = document.documentElement.clientHeight
      let rect = document.querySelector('.js-map-container').getBoundingClientRect()
      let { top } = rect
      let mapHeight = pageHeight - top - 10
      console.log('getMapHeight', pageHeight, top, mapHeight)
      this.pageHeight = `${mapHeight}px`
    },
    renderClusterMarker(context, markers, marker) {
      let markerContent = document.createElement('div')
      let markerContent1 = document.createElement('div')
      markerContent.append(markerContent1)
      markerContent.className = 'mark-content'
      markerContent1.className = 'mark-content-1'
      markerContent1.innerHTML = context.count
      $(markerContent1).on('click', () => {
        console.log('renderClusterMarker-click')
      })
      context.marker.setContent(markerContent)
    },
    addMarkerClusterer(markers) {
      this.map.plugin(['AMap.MarkerClusterer'], () => {
        this.cluster = new AMap.MarkerClusterer(
          this.map, // 地图实例
          this.markerClusterer, // 海量点组成的数组
          {
            // styles: styles,
            gridSize: 80,
            renderClusterMarker: this.renderClusterMarker
          }
        )
      })
    },
    addLocationMarker(info) {
      const position = [info.lng, info.lat]
      this.map.clearMap()
      // that.addCicleMarkers();
      this.addInfoWindow(position, this.getLocationMarkerContent())
      setTimeout(() => {
        this.initLocaionEvent(position)
      }, 100)
    },
    getLocationMarkerContent() {
      let markerContent = document.createElement('div')
      let markerLabel1 = document.createElement('div')
      let markerLabel2 = document.createElement('div')
      let markerLabel3 = document.createElement('div')
      let markerLabel4 = document.createElement('div')
      let markerLabel5 = document.createElement('div')
      let markerIcon = document.createElement('i')
      let markerList = [
        {
          node: markerLabel1,
          label: '备案<br/>信息',
          className: 'location-marker-label location-marker-label-1'
        },
        {
          node: markerLabel2,
          label: '历史<br/>轨迹',
          className: 'location-marker-label location-marker-label-2'
        },
        {
          node: markerLabel3,
          label: '追踪<br/>模式',
          className: 'location-marker-label location-marker-label-3'
        },
        {
          node: markerLabel4,
          label: '丢失<br/>立案',
          className: 'location-marker-label location-marker-label-4'
        },
        {
          node: markerLabel5,
          label: '清除<br/>轨迹',
          className: 'location-marker-label location-marker-label-5'
        },
        {
          node: markerIcon,
          label: '',
          className: 'location-marker-icon'
        }
      ]
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
    initLocaionEvent(position) {
      let that = this
      $('.location-marker')
        .on('click', '.location-marker-label', function() {
          $('.location-marker-label').removeClass('active')
          let $this = $(this)
          console.log($this.attr('class'))
          $this.addClass('active')
          that.toogleLocationLabel($this.attr('class'), position, that)
        })
        .on('click', '.location-marker-icon', () => {
          that.addCicleMarkers()
        })
    },
    getCicleMarkerContent(positionInfo) {
      let { path } = this.$route
      console.log(path)
      let markerContent = document.createElement('div')
      let markerContent1 = document.createElement('div')
      markerContent.className = 'mark-content'
      markerContent1.className = 'mark-content-1'
      markerContent.append(markerContent1)
      markerContent1.innerHTML = '1'
      setTimeout(() => {
        $(markerContent).on('click', e => {
          console.log('markerContent-click')
          e.stopPropagation()
          if (path === '/location-monitor') {
            this.updateCurrentLocationInfo(positionInfo)
            // setTimeout(() => {
            //   this.addLocationMarker(positionInfo)
            // }, 100)
            this.addLocationMarker(positionInfo)
          } else if (path === '/history-track') {
            this.updateCurrentLocationInfo(positionInfo)
            const { imei } = positionInfo
            this.searchType = 'imei'
            this.searchValue = imei
          }
        })
      }, 100)
      return markerContent
    },
    addCicleMarkers() {
      console.log('addCicleMarkers')
      this.map.clearMap()
      this.markerClusterer = []
      this.allLocationInfo.forEach(item => {
        const { lng, lat } = item
        const position = [lng, lat]
        this.addMarker(position, this.getCicleMarkerContent(item))
      })
      this.addMarkerClusterer()
      // this.map.setFitView();
    },
    addCicleMarkersNoClear() {
      this.markerClusterer = []
      this.allLocationInfo.forEach(item => {
        const { lng, lat } = item
        const position = [lng, lat]
        this.addMarker(position, this.getCicleMarkerContent(item))
      })
      this.addMarkerClusterer()
      // this.map.setFitView();
    },
    addMarker(position, content) {
      let marker = new AMap.Marker({
        map: this.map,
        position: position,
        content: content,
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
        anchor: 'middle-center',
        offset: new AMap.Pixel(0, 0)
      })
      this.markerClusterer.push(marker)
    },
    addInfoWindow(position, content) {
      let infoWindow = new AMap.InfoWindow({
        content: content, //使用默认信息窗体框样式，显示信息内容
        anchor: 'bottom-center',
        offset: new AMap.Pixel(6, 22)
      })
      infoWindow.open(this.map, position)
    },
    addControl(map) {
      AMap.plugin(["AMap.ToolBar"],function(){
        var controlBar = new AMap.ToolBar()
        map.addControl(controlBar)
      });
      AMap.plugin(["AMap.Scale"],function(){
        var scaleBar = new AMap.Scale()
        map.addControl(scaleBar)
      });
    },
    initAMap(selector, position = []) {
      // 初始化地图
      let params = {
        expandZoomRange: true,
        zoom: 10,
        zooms: [3, 20],
        resizeEnable: true
      }
      if (position && position.length > 0) {
        params.center = position
      }
      this.map = new AMap.Map(selector, params)
      this.addControl(this.map)
    },
    isSupportCanvas() {
      var elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    initHeatMap(selector, position, heatmapData) {
      let params = {
        resizeEnable: true,
        zoom: 10,
        zooms: [3, 20]
      }
      if (position && position.length > 0) {
        params.center = position
      }
      this.heatmap = new AMap.Map(selector, params)

      if (!this.isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
      }

      this.heatmap.plugin(['AMap.Heatmap'], () => {
        //初始化heatmap对象
        let heatmap = new AMap.Heatmap(this.heatmap, {
          radius: 25, //给定半径
          opacity: [0, 0.8]
        })
        // console.log(heatmapData, heatmap)
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        })
      })
      this.addControl(this.heatmap)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getMapHeight()
      setTimeout(() => {
        this.getMapHeight()
      }, 100)
    })
  }
}
