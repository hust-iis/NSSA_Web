<template>
  <div>
    <!--卡片视图区域-->
    <el-card class="box-card">
      <!--搜索与添加区域
      el-row->gutter="20":间隔为20
      el-col->span="8":长度为8
      -->

      <!-- 添加用户--del -->

      <!-- 用户列表区域 -->
      <!-- border->带边框,stripe->使用带斑马纹的表格,type="index"->索引列-->
      <el-table :data="userAuditList" border stripe>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-tableColumn label="用户名" prop="user_name"></el-tableColumn>
        <el-tableColumn label="角色" prop="authority"></el-tableColumn>
        <el-tableColumn label="ip" prop="ip"></el-tableColumn>
        <el-tableColumn label="状态" prop="status"></el-tableColumn>
        <el-tableColumn label="操作方法" prop="method"></el-tableColumn>
        <el-tableColumn label="url" prop="url"></el-tableColumn>
        <el-tableColumn label="请求体" prop="request_body"></el-tableColumn>
        <el-tableColumn label="操作时间" prop="operate_time"></el-tableColumn>
     
        <!-- 操作--del -->
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改用户的对话框--del -->
  </div>
</template>

<script>
import { getUsersAudit } from "@/api/user_manage.js";

export default {
  name: "UserAudit",
  data() {
    return {
      // 获取用户审计列表参数
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      userAuditList: [],
      total: 0,

      //角色列表
      authorityList: [
        { authority_id: 0, authority_name: "超级管理员" },
        { authority_id: 1, authority_name: "普通管理员" },
        { authority_id: 2, authority_name: "用户" }
      ],
      //角色映射map
      authorityMap: {
        0: "超级管理员",
        1: "普通管理员",
        2: "用户"
      }
    };
  },
  created() {
    this.getUserAuditList();
  },
  methods: {
    // 获取用户列表数据
    async getUserAuditList() {
      const { data: res } = await getUsersAudit(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      // console.log(res);
      if (res.code !== 0) {
        return this.$message.error("获取失败");
      }
      this.userAuditList = res.data;
      for (let user of this.userAuditList) {
        user.authority = this.authorityMap[user.authority];
      }
      this.total = res.total;
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserAuditList();
    },
    // 监听page页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserAuditList();
    }
  }
};
</script>

<style lang="less" scoped></style>
