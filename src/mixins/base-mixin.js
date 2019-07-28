import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fileUploadUrl: "http://47.92.237.140/api/v1/img/web"
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
    getFilterRoleNames(roleNames) {
      return roleNames.filter(item => {
        return item.indexOf("商户APP") === -1;
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
