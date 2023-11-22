<template>
  <side-bar>
    <el-row class="asb">
      <el-col>
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="transparent">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>资产发现</span>
            </template>
            <!--<el-menu-item index="/asset/discovery">资产发现</el-menu-item>-->
            <!--<el-menu-item index="/asset/config">发现配置</el-menu-item>-->
            <el-menu-item index="/asset/unit">单位管理</el-menu-item>
            <el-menu-item index="/asset/scan">资产扫描</el-menu-item>
            <el-menu-item index="/asset/traffic">流量监测</el-menu-item>
            <el-menu-item index="/asset/alert">应急响应</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </side-bar>
</template>

<script>
import SideBar from "@/components/common/SideBar";
export default {
  name: "AssetSideBar",
  components: {
    SideBar
  }
}
</script>

<style scoped>

</style>