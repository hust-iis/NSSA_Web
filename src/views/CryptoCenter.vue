<template>
  <el-container style="height: 100vh;">
    <el-header>
      <h1 class="title">密码应用管理页</h1>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="wiki" @select="handleMenuSelect" style="height: 100%;" router>
          <!-- FIXME: 正确的切换方式 -->
          <el-menu-item index="/crypto/app">密码应用信息</el-menu-item>
          <el-menu-item index="/crypto/wiki">国产密码知识库</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
  
<script>
export default {
  methods: {
    handleMenuSelect(index) {
      this.$router.push(index);
    },
  },
};
</script>
  
<style scoped>
.title {
  color: #fff;
  margin: 0;
  line-height: 60px;
  padding-left: 20px;
  background-color: #409EFF;
}
</style>