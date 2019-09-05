/* eslint-disable */
const shortid = require('shortid');
import { mapGetters } from "vuex";
import dayjs from 'dayjs'

export default {
  data() {
    return {
      loadingPic: {},
      apkUploadUrl: "http://api.renownchn.com/api/v1/file/apk",
      imageUploadUrl: "http://api.renownchn.com/api/v1/img/web",
      htmlUploadUrl: "http://api.renownchn.com/api/v1/img/guide",
      firmwareUploadUrl: "http://api.renownchn.com/api/v1/file/firmware"
    }
  },
  computed: {
    ...mapGetters(['businessAttributeList', 'installAttributeList', 'userInfo', 'role', 'business']),
    mergeBusinessAttributeList() {
      return [{
        id: '',
        name: '全部'
      }, ...this.businessAttributeList]
    },
    mergeInstallAttributeList() {
      return [{
        id: '',
        name: '全部'
      }, ...this.installAttributeList]
    }
  },
  methods: {
    setCityBounds() {
      let citysearch = new AMap.CitySearch();
      let that = this
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function(status, result) {
        console.log(result)
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
              //地图显示当前城市
              let citybounds = result.bounds;
              that.map.setBounds(citybounds);
          }
        }
      })

      // let geocoder = new AMap.Geocoder({
      //   city: "010", //城市设为北京，默认：“全国”
      // });
      // let that = this
      // geocoder.getLocation(address, function(status, result) {
      //   console.log(result)
      //   if (status === 'complete'&&result.geocodes.length) {
      //     let lnglat = result.geocodes[0].location
      //     that.map.panTo(lnglat);
      //   }
      // });
    },
    getCurrentTime() {
      return dayjs().format('YYYY年MM月DD日')
    },
    getPageIndexList(list, pageSize, pageIndex) {
      return list.map((item, index) => {
        return {
          index: (pageIndex - 1) * pageSize + index + 1,
          ...item
        }
      })
    },
    getShortidList(list) {
      return list.map(item => {
        return {
          shortid: shortid.generate(),
          ...item
        }
      })
    },
    showLoading() {
      this.loadingPic = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      setTimeout(() => {
        this.hideLoading()
      }, 3000)
    },
    hideLoading() {
      this.loadingPic.close();
    },
    getUtcTime(time) {
      if (time) {
        let utcOffset = dayjs().utcOffset()
        return dayjs(time).subtract(utcOffset, 'minute').format("YYYY-MM-DD HH:mm:ss")
      } else {
        return time
      }
    },
    getUtcOffsetTime(time) {
      if (time) {
        let utcOffset = dayjs(time).utcOffset()
        return dayjs(time).add(utcOffset, 'minute').format('YYYY-MM-DD HH:mm')
      } else {
        return time
      }
    },
    initPickerTime() {
      const end = dayjs().toDate();
      const start = dayjs().set('h', 0).set('m', 0).set('s', 0).toDate();
      this.pickerTime = [start, end]
    },
    getFilterRoleNames(roleNames) {
      return roleNames.filter(item => item.indexOf("商户APP") === -1 && item.indexOf('系统设置') === -1);
    },
    getAttributeTypeLable(type) {
      let attributeLable = ''
      if (type === 1) {
        attributeLable = '业务办理点'
      } else if (type === 2) {
        attributeLable = '设备安装点'
      }
      return attributeLable
    },
    getAddAllTypeList(list) {
      return [{
        id: '',
        name: '全部'
      }, list]
    }
  }
};
