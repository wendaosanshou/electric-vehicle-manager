import Vue from "vue";
import Vuex from "vuex";
import locationMonitor from "./modules/location-monitor";
import common from "./modules/common";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    locationMonitor: locationMonitor,
    common: common
  }
});
