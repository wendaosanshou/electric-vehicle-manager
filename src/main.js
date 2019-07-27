import Vue from 'vue';
import './global';
import App from './App.vue';
import router from './router';
import store from './store/index';
import baseMixins from './mixins/base-mixin'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/element-variables.scss';

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.mixin(baseMixins)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
