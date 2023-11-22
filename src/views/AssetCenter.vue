<template>
  <div>
    <el-container>
      <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
      <el-container>
        <el-aside width="200px"><asset-side-bar></asset-side-bar></el-aside>
        <el-main style="overflow: hidden;"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import AssetSideBar from "@/components/content/AssetSideBar";
export default {
  name: "AssetCenter",
  components: {
    InnerNavBar,
    AssetSideBar
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