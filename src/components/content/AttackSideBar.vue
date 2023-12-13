<template>
  <side-bar>
    <el-row class="asb">
      <el-col>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>异常攻击发现</span>
            </template>
            <el-menu-item index="/abnormal_attack/traffic">异常流量感知</el-menu-item>
            <el-menu-item index="/abnormal_attack/user">异常用户监测</el-menu-item>
            <el-menu-item index="/abnormal_attack/host">异常主机监测</el-menu-item>
            <el-menu-item index="/abnormal_attack/events">态势感知事件</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </side-bar>
</template>

<script>
import SideBar from "@/components/common/SideBar";
export default {
  name: "AttackSideBar",
  components:{
    SideBar
  }
}
</script>

<style scoped>

</style>