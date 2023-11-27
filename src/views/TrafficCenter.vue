<template>
    <div>
      <el-container>
        <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
        <el-container>
          <el-aside width="200px"><traffic-side-bar></traffic-side-bar></el-aside>
          <el-main style="overflow: hidden;"><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import InnerNavBar from "@/components/content/InnerNavBar";
  import TrafficSideBar from "@/components/content/TrafficSideBar";
  export default {
    name: "TrafficCenter",
    components: {
      InnerNavBar,
      TrafficSideBar
    }
  }
  </script>
  
  <style scoped>
  .el-header{
    padding: 0;
  }
  .el-container {
    overflow: hidden;
  }
  </style>