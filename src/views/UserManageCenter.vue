<template>
  <div>
    <!--导航区域-->
    <el-container>
      <el-header height="60px">
        <inner-nav-bar></inner-nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px" v-show="showMenu">
          <user-list-sider-bar></user-list-sider-bar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import UserListSiderBar from "@/components/content/UserListSiderBar.vue";
import { getUserInfo } from "@/api/user_manage.js";

export default {
  name: "UserManageCenter",
  components: {
    InnerNavBar,
    UserListSiderBar
  },
  data() {
    return {
      showMenu: true
    };
  },
  created() {
    this.getThisUserInfo();
  },
  methods: {
    // 获取用户数据
    async getThisUserInfo() {
      const { data: res } = await getUserInfo(this.userName);
      // console.log(res);
      if (res.code !== 0) {
        return this.$message.error("获取失败");
      }
      this.showMenu = res.data.authority < 2 ? true : false;
      console.log(this.showMenu);
    }
  }
};
</script>

<style lang="less" scoped></style>
