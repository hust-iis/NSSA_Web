<template>
  <div class="nav-bar">
    <el-row>
      <el-col :span="5">
        <div class="sysName" style="float: right">网络信息攻击模拟器</div>
      </el-col>
      <el-col :span="15">&nbsp;</el-col>
      <el-col :span="4">
        <div style="float: right; margin-right: 50px">
          <a class="el-icon-setting" href="/manage"></a>
          <a class="el-icon-switch-button" @click="logout"></a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MainNavBar",

  methods: {
    logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="stylus">
.sysName
  font-size 28px
  font-weight bold
  font-style italic
  color white
  margin-top 5px

a
  text-decoration none
  margin-right 15px
  margin-top 10px
  font-size 32px
  color #1296db
</style>
