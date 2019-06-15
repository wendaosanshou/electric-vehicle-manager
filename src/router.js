import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import UserManage from './views/system-settings/UserManage.vue';
import UserAdd from './views/system-settings/user-add/UserAdd.vue';
import RecordInfoManage from './views/record-info-manage/RecordInfoManage.vue'
import RecordSetting from './views/record-setting/RecordSetting.vue'
import ProcessManage from './views/process-manage/ProcessManage.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
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
        name: 'record-setting',
        component: RecordSetting
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
