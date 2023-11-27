<template>
  <div>
    <el-container>
      <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
      <el-container>
        <el-aside width="200px"><attack-side-bar></attack-side-bar></el-aside>
        <el-main style="overflow: hidden;"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import AttackSideBar from "@/components/content/AttackSideBar";
export default {
  name: "AssetCenter",
  components: {
    InnerNavBar,
    AttackSideBar
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