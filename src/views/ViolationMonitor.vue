<!-- 违规行为监测 -->
<template>
  <div>
    <el-container>
      <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
      <el-container>
        <el-aside width="200px"><ViolationSideBar></ViolationSideBar></el-aside>
        <el-main style="overflow: hidden;"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
    
<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import ViolationSideBar from "@/components/content/ViolationSideBar";
export default {
  name: "ViolationMonitor",
  components: {
    InnerNavBar,
    ViolationSideBar
  }
}
</script>
    
<style scoped>
.el-header {
  padding: 0;
}

.el-container {
  overflow: hidden;
}
</style>