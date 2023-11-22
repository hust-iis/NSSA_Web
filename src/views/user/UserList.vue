<template>
  <div>
    <!--卡片视图区域-->
    <el-card class="box-card">
      <!--搜索与添加区域
      el-row->gutter="20":间隔为20
      el-col->span="8":长度为8
      -->
      <el-row :gutter="20">
        <!-- 搜索 clearable:清空数据，@clear:查询数据-->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <!-- 添加用户 -->
        <el-col :span="4"
          ><el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
          <!-- 添加用户对话框 -->
          <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
          >
            <!-- 添加用户内容主体区域 -->
            <el-form
              :model="addUserForm"
              :rules="addUserFormRules"
              ref="addUserFormRef"
              label-width="70px"
            >
              <el-form-item label="用户名" prop="user_name">
                <el-input v-model="addUserForm.user_name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUserForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="tel">
                <el-input v-model="addUserForm.tel"></el-input> </el-form-item
            ></el-form>
            <!-- 添加用户内容底部区域 -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
          </el-dialog>
        </el-col></el-row
      >
      <!-- 用户列表区域 -->
      <!-- border->带边框,stripe->使用带斑马纹的表格,type="index"->索引列-->
      <el-table :data="userList" border stripe>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-tableColumn label="用户名" prop="user_name"></el-tableColumn>
        <el-tableColumn label="邮箱" prop="email"></el-tableColumn>
        <el-tableColumn label="手机" prop="tel"></el-tableColumn>
        <el-tableColumn label="角色" prop="authority"></el-tableColumn>
        <el-tableColumn label="攻击次数" prop="attack_num"></el-tableColumn>
        <el-tableColumn label="成功次数" prop="success_num"></el-tableColumn>
        <el-tableColumn label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-tableColumn>
        <el-tableColumn label="操作" width="180px">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <!-- 修改用户按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              label="编辑"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >

            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              label="删除"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
            <!-- 分配角色按钮 -->
            <!-- tooltip:提示框,enterable:自动隐藏 -->
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              enterable
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button> </el-tooltip> -->
          </template></el-tableColumn
        >
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
      >
      </el-pagination>
    </el-card>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        ref="editUserFormRef"
        :model="editUserForm"
        :rules="editUserFormRules"
        label-width="70px"
        @close="editDialogClosed"
      >
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editUserForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editUserForm.authority" placeholder="请选择角色">
            <el-option
              v-for="item in authorityList"
              :key="item.id"
              :label="item.authority_name"
              :value="item.authority_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsers,
  updateUser,
  register,
  deleteUser,
  getUserInfo,
} from "@/api/user_manage.js";

export default {
  name: "UserList",
  data() {
    // 验证添加用户邮箱的规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      if (!value) {
        return cb();
      }
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 验证添加用户手机的规则
    const checkMoblie = (rule, value, cb) => {
      // 验证手机的正则表达式
      if (!value) {
        return cb();
      }
      const regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (regTel.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号码"));
    };

    return {
      // 获取用户列表参数
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,

      //角色列表
      authorityList: [
        { authority_id: 1, authority_name: "普通管理员" },
        { authority_id: 2, authority_name: "用户" },
      ],
      //角色映射map
      authorityMap: {
        0: "超级管理员",
        1: "普通管理员",
        2: "用户",
      },
      // 添加用户的表单数据
      addUserForm: {
        user_name: "",
        password: "",
        email: "",
        tel: "",
      },

      // 添加用户的表单规则
      addUserFormRules: {
        user_name: [
          { required: true, message: "请输入合法的用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入合法的密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6-15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: false, message: "请输入合法的邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        tel: [
          { required: false, message: "请输入合法的手机号码", trigger: "blur" },
          { validator: checkMoblie, trigger: "blur" },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改用户的表单数据
      editUserForm: {},
      // 修改表单的验证规则对象
      editUserFormRules: {
        email: [
          { required: false, message: "请输入合法的邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        tel: [
          { required: false, message: "请输入合法的手机号码", trigger: "blur" },
          { validator: checkMoblie, trigger: "blur" },
        ],
        authority: [
          { required: false, message: "请选择用户权限", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表数据
    async getUserList() {
      const { data: res } = await getUsers(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      );
      // console.log(res);
      if (res.code !== 0) {
        return this.$message.error("获取失败");
      }
      this.userList = res.data;
      for (let user of this.userList) {
        user.authority = this.authorityMap[user.authority];
      }
      this.total = res.total;
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听page页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听switch开头状态的改变
    async userStateChange(userInfor) {
      // console.log(userInfor);
      const { data: res } = await this.$http.put(
        `users/${userInfor.id}/state/${userInfor.mg_state}`
      );
      if (res.meta.status !== 200) {
        userInfor.mg_state = !userInfor.mg_state;
        return this.$message.error("更新用户失败！");
      }
      this.$message.success("更新用户成功！");
    },
    // 监听添加用户对话框的:close关闭事件,清除数据(resetFields)
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    // 点击按钮，添加用户,validate(预校验)
    addUser() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("添加用户信息不合法！");
        // 成功后向api发出添加用户的网络请求
        const { data: res } = await register(this.addUserForm);
        // console.log(res);
        if (res.code !== 0) {
          return this.$message.error("添加用户失败!");
        }
        this.$message.success("添加用户成功!");
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户列表
        this.getUserList();
      });
    },
    // 展示编辑用户数据的对话框
    async showEditDialog(id) {
      const { data: res } = await getUserInfo(id);
      // console.log(res);
      if (res.code !== 0) return this.$message.error("查询失败！");
      this.editDialogVisible = true;
      this.editUserForm = res.data;
    },
    // 监听修改用户对话框关闭事件,resetFields重置数据
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },
    // 修改用户信息并发出请求
    editUserInfo() {
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("更新用户信息不合法！");
        // 发出修改用户信息的数据请求
        // console.log(this.editUserForm);
        const { data: res } = await updateUser(this.editUserForm);
        if (res.code !== 0) {
          return this.$message.error("更新用户信息失败！");
        }
        // 关闭修改信息对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success("更新用户信息成功！");
      });
    },
    // 根据Id删除用户
    async removeUserById(id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除，返回confirm
      // 如果用户取消删除，返回cancel
      if (confirmRes !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await deleteUser(id);
      // console.log(res);
      if (res.code !== 0) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
      this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped></style>
