<template>
    <side-bar>
      <el-row class="asb">
        <el-col>
          <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent">
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>流量检测</span>
              </template>
              <el-menu-item index="/traffic_monitor/monitor">流量变化图</el-menu-item>
              <el-menu-item index="/traffic_monitor/overall">总体威胁事件</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </side-bar>
  </template>
  
  <script>
  import SideBar from "@/components/common/SideBar";
  export default {
    name: "TrafficSideBar",
    components: {
      SideBar
    }
  }
  </script>
  
  <style scoped></style>