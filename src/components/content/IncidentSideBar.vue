<template>
    <side-bar>
      <el-row class="asb">
        <el-col>
          <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent">
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>应急响应</span>
              </template>
              
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