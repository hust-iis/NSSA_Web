<template>
  <side-bar>
    <el-row class="asb">
      <el-col>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>资产中心</span>
            </template>
            <el-menu-item index="/asset/unit">车间管理</el-menu-item>
            <el-menu-item index="/asset/line">产线管理</el-menu-item>
            <el-menu-item index="/asset/scan">资产管理</el-menu-item>
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

<style scoped></style>