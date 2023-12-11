import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/manage",
  //   name: "UserManage",
  //   component: () => import('../views/UserManageCenter'),
  //   children: [
  //     { path: 'info', component: () => import('../views/user/UserInfo') },
  //     { path: 'list', component: () => import('../views/user/UserList') },
  //     { path: 'audit', component: () => import('../views/user/UserAudit') },
  //   ]
  // },
  // {
  //   path: '/topo/:id?',
  //   name: 'topo',
  //   component: () => import('../views/NetworkTopology'),
  //   props: true // 将id作为props.id传入组件
  // },
  
  // 登录页面
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // 主页
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  // 资产管理+安全风险分析
  {
    path: '/asset',
    name: 'Asset',
    redirect: '/asset/scan',
    component: () => import('../views/AssetCenter'),
    children: [
      { path: 'unit', component: () => import('../views/asset/UnitManagement') },
      { path: 'line', component: () => import('../views/asset/ProductionLine') },
      { path: 'scan', component: () => import('../views/asset/AssetScan') },
      // { path: 'alert', component: () => import('../views/asset/EmailAlert') },
      // { path: 'traffic', component: () => import('../views/asset/TrafficMonitor') }
    ]
  },
  // 异常攻击发现
  {
    path: '/abnormal_attack',
    name: 'AbnormalAttack',
    redirect: '/abnormal_attack/traffic',
    component: () => import('../views/AbnormalAttack'),
    children: [
      {path: 'traffic', component: () => import('../views/attack/AbnormalTraffic')},
      {path: 'host', component: () => import('../views/attack/AbnormalHost')},
      {path: 'user', component: () => import('../views/attack/AbnormalUser')}
    ]
  },
  // 违规行为监测
  {
    path: '/violation_monitor',
    name: 'ViolationMonitor',
    redirect: '/violation_monitor/logs',
    component: () => import('../views/ViolationMonitor'),
    children: [
      {path: 'whitelist', component: () => import('../views/violation/ViolationWhitelist')},
      {path: 'logs', component: () => import('../views/violation/ViolationLogs')}
    ]
  },
  // 流量监测
  {
    path: "/traffic_monitor",
    name: "TrafficMonitor",
    redirect: '/traffic_monitor/monitor',
    component: () => import('../views/TrafficCenter'),
    children: [
      {path: 'monitor', component: () => import('../views/traffic/TrafficMonitor')},
      {path: 'overall', component: () => import('../views/traffic/OverallThreat')},
      {path: 'situation', component: () => import('../views/Situation')},
    ]
  },
  // 应急响应
  {
    path: "/incident",
    name: "IncidentResponse",
    component: () => import('../views/IncidentResponse'),
  },
  // 大数据态势分析
  {
    path: "/situation",
    name: "Situation",
    component: () => import('../views/Situation')
  },
  // TODO: 密码应用+密码知识库
  {
    path: '/crypto',
    name: 'Crypto',
    redirect: '/crypto/wiki',
    component: () => import('../views/CryptoCenter'),
    children: [
      {path: 'app', component: () => import('../views/crypto/CryptoApp')},
      {path: 'wiki', component: () => import('../views/crypto/CryptoWiki')}
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
