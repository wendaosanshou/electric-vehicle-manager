import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import locationMonitor from "./modules/location-monitor";
import alarmMonitor from "./modules/alarm-monitor";
import common from "./modules/common";
import login from "./modules/login"
import roleManage from './modules/role-manage'
import userManage from './modules/user-manage'
import deviceManage from './modules/device-manage'
import electricFence from './modules/electric-fence'
import work from './modules/work'
import attributeManage from './modules/attribute-manage'
import guideManage from './modules/guide-manage'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  modules: {
    locationMonitor: locationMonitor,
    common: common,
    login: login,
    roleManage: roleManage,
    userManage: userManage,
    deviceManage: deviceManage,
    alarmMonitor: alarmMonitor,
    work: work,
    electricFence: electricFence,
    attributeManage: attributeManage,
    guideManage: guideManage
  },
  plugins: [vuexLocal.plugin]
});
