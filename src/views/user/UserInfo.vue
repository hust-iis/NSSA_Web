<template>
  <div>
    <!--卡片视图区域-->
    <el-card class="box-card">
      
      <div>
        <el-descriptions title="基本资料" direction="vertical" :column="3" border>
  <el-descriptions-item label="用户名" >{{userInfo.user_name}}</el-descriptions-item>
  <el-descriptions-item label="角色" >{{userInfo.authority}}</el-descriptions-item>
    <el-descriptions-item label="ID" >{{userInfo.id}}</el-descriptions-item>

  <el-descriptions-item label="手机号">{{userInfo.tel}}</el-descriptions-item>
    <el-descriptions-item label="攻击次数" >{{userInfo.attack_num}}</el-descriptions-item>
  <el-descriptions-item label="成功次数" >{{userInfo.success_num}}</el-descriptions-item>
  <el-descriptions-item label="邮箱" >{{userInfo.email}}</el-descriptions-item>

 
</el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user_manage.js";

export default {
  name: "UserInfo",
  data() {
    return {
      userName: "",
      userInfo: {},
      //角色映射map
      authorityMap: {
        0: "超级管理员",
        1: "普通管理员",
        2: "用户"
      }
    };
  },
  created() {
    this.userName = localStorage.getItem("user_name");
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
      this.userInfo = res.data;
      this.userInfo.authority = this.authorityMap[res.data.authority];
    //   console.log(this.userInfo);
    }
  }
};
</script>

<style lang="less" scoped></style>
