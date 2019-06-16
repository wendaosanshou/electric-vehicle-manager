import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import LocationMonitor from './views/location-monitor/LocationMonitor.vue'
import HistoryTrack from './views/history-track/HistoryTrack.vue'
import AlarmMonitor from './views/alarm-monitor/AlarmMonitor.vue'
import AlarmAnalysis from './views/alarm-analysis/AlarmAnalysis.vue'
import ElectricFence from './views/electric-fence/ElectricFence.vue'
import RecordInfoManage from './views/record-info-manage/RecordInfoManage.vue'
import RecordSetting from './views/record-setting/RecordSetting.vue'
import ProcessManage from './views/process-manage/ProcessManage.vue'
import UserManage from './views/system-settings/user-manage/UserManage.vue';
import UserAdd from './views/system-settings/user-manage/user-add/UserAdd.vue';
import RoleManage from './views/system-settings/role-manage/RoleManage.vue'
import BusinessPointManage from './views/system-settings/business-point-manage/BusinessPointManage.vue'
import AppAdvisory from './views/system-settings/app-advisory/AppAdvisory.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'location-monitor',
        name: 'LocationMonitor',
        component: LocationMonitor
      }, {
        path: 'history-track',
        name: 'HistoryTrack',
        component: HistoryTrack
      },{
        path: 'alarm-monitor',
        name: 'AlarmMonitor',
        component: AlarmMonitor
      },{
        path: 'alarm-analysis',
        name: 'AlarmAnalysis',
        component: AlarmAnalysis
      }, {
        path: 'electric-fence',
        name: 'ElectricFence',
        component: ElectricFence
      }, {
        path: 'user-manage',
        name: 'UserManage',
        component: UserManage,
      }, {
        path: 'user-add',
        name: 'UserAdd',
        component: UserAdd,
      },{
        path: 'user-edit',
        name: 'UserEdit',
        component: UserAdd,
      }, {
        path: 'record-manage',
        name: 'RecordInfoManage',
        component: RecordInfoManage
      }, {
        path: 'process-manage',
        name: 'ProcessManage',
        component: RecordInfoManage
      }, {
        path: 'process-search',
        name: 'ProcessSearch',
        component: ProcessManage
      }, {
        path: 'record-setting',
        name: 'RecordSetting',
        component: RecordSetting
      }, {
        path: 'role-manage',
        name: 'RoleManage',
        component: RoleManage
      }, {
        path: 'business-manage',
        name: 'BusinessPointManage',
        component: BusinessPointManage
      }, {
        path: 'equipment-manage',
        name: 'EquipmentManage',
        component: BusinessPointManage
      }, {
        path: 'app-advisory',
        name: 'AppAdvisory',
        component: AppAdvisory
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
