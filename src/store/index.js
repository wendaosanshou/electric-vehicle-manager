import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import locationMonitor from "./modules/location-monitor";
import common from "./modules/common";
import login from "./modules/login"
import roleManage from './modules/role-manage'
import userManage from './modules/user-manage'
import work from './modules/work'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    locationMonitor: locationMonitor,
    common: common,
    login: login,
    roleManage: roleManage,
    userManage: userManage,
    work: work
  },
  plugins: [vuexLocal.plugin]
});
