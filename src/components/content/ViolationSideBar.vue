<template>
  <side-bar>
    <el-row class="asb">
      <el-col>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>违规行为监测</span>
            </template>
            <el-menu-item index="/violation_monitor/whitelist">智能学习名单</el-menu-item>
            <el-menu-item index="/violation_monitor/logs">违规行为记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </side-bar>
</template>
  
<script>
import SideBar from "@/components/common/SideBar";
export default {
  name: "ViolationSideBar",
  components: {
    SideBar
  }
}
</script>
  
<style scoped></style>