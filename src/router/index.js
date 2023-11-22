import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";

import Traffic from '../views/asset/TrafficMonitor'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // {
  //     path: "/",
  //     name: "Traffic",
  //     component: Traffic,
  //   },

  {
    path: "/manage",
    name: "UserManage",
    component: () => import('../views/UserManageCenter'),
    children: [
      { path: 'info', component: () => import('../views/user/UserInfo') },
      { path: 'list', component: () => import('../views/user/UserList') },
      { path: 'audit', component: () => import('../views/user/UserAudit') },
      
    ]
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: '/topo/:id?',
    name: 'topo',
    component: () => import('../views/NetworkTopology'),
    props: true // 将id作为props.id传入组件
  },
  {
    path: '/asset',
    name: 'Asset',
    redirect: '/asset/scan',
    component: () => import('../views/AssetCenter'),
    children: [
      { path: 'scan', component: () => import('../views/asset/AssetScan') },
      { path: 'unit', component: () => import('../views/asset/UnitManagement') },
      { path: 'alert', component: () => import('../views/asset/EmailAlert') },
      { path: 'traffic', component: () => import('../views/asset/TrafficMonitor') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
