import Vue from 'vue';
import './global';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/element-variables.scss';

console.log('store', store)
Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
