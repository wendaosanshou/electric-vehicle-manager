import { mapGetters } from "vuex";
import dayjs from 'dayjs'

export default {
  data() {
    return {
      apkUploadUrl: "http://47.92.237.140/api/v1/file/apk",
      imageUploadUrl: "http://47.92.237.140/api/v1/img/web",
      htmlUploadUrl: "http://47.92.237.140/api/v1/img/guide",
      firmwareUploadUrl: "http://47.92.237.140/api/v1/file/firmware"
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
    getUtcTime(time) {
      if (time) {
        let utcOffset =  dayjs().utcOffset()
        return dayjs(time).subtract(utcOffset, 'minute').format("YYYY-MM-DD HH:mm:ss")
      } else {
        return time
      }
    },
    getUtcOffsestTime(time) {
      if (time) {
        let utcOffset = dayjs(time).utcOffset()
        console.log('utcOffset', utcOffset)
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
      return roleNames.filter(item => {
        return item.indexOf("商户APP") === -1 && item.indexOf('系统设置') === -1
      });
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
