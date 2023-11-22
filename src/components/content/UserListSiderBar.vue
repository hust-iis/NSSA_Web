<template>
  <side-bar>
    <el-row class="tsb">
      <el-col>
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="transparent"
        >
        <el-menu-item index="/manage/info">
            <i class="el-icon-document"></i>
            <template #title>个人信息</template>
          </el-menu-item>
          <el-menu-item index="/manage/list">
            <i class="el-icon-document"></i>
            <template #title>用户信息</template>
          </el-menu-item>
          <el-menu-item index="/manage/audit">
            <i class="el-icon-document"></i>
            <template #title>用户审计</template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </side-bar>
</template>

<script>
import SideBar from "@/components/common/SideBar";

export default {
  name: "UserListSiderBar",
  components: {
    SideBar,
  },
  methods: {},
};
</script>

<style scoped></style>
