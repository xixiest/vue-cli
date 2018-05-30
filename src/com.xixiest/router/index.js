import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '设备列表',
    hidden: true,
    children: [{ path: 'home', component: _import('device/DeviceList') }]
  },
  // 设备
  {
    path: '/device',
    component: Layout,
    redirect: '/device/DeviceIndex',
    icon: 'devices',
    name: '设备管理',
    noDropdown: true,
    children: [{
      path: 'DeviceIndex', name: '设备列表', component: _import('device/DeviceList'),
      meta: { role: ['admin'] }
    }, {
      path: 'deviceDetail/:id', name: '设备详情', component: _import('device/DeviceDetail'), hidden: true
    }]
  },
  // {
  //   path: '/alarm',
  //   component: Layout,
  //   redirect: '/alarm/AlarmIndex',
  //   icon: 'a',
  //   name: '告警',
  //   noDropdown: true,
  //   children: [{
  //     path: 'AlarmIndex', name: '告警查看', component: _import('alarm/AlarmList'),
  //     meta: { role: ['admin'] }
  //   }]
  // },
  {
    path: '/manualEntry',
    component: Layout,
    redirect: '/manualEntry/ConfigList',
    icon: 'b',
    name: '',
    noDropdown: true,
    children: [{
      path: 'index', name: '录入配置', component: _import('manualEntry/ConfigList'),
      meta: { role: ['admin'] }
    }]
  },
  {
    path: '/manualEntry/UsePage',
    component: _import('manualEntry/UsePage'),
    name: '备用页面',
    hidden: true
  },
  {
    path: '/manualEntry/UseForm/:name',
    component: _import('manualEntry/UseForm'),
    name: '备用表单',
    hidden: true
  },
  {
    path: '/systemConf',
    component: Layout,
    redirect: '/systemConf/index',
    icon: 'device',
    name: '',
    noDropdown: true,
    children: [{
      path: 'index', name: '系统配置', component: _import('systemConf/index'),
      meta: { role: ['admin'] }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

