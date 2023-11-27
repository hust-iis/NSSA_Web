<template>
  <div>
    <nav-bar class="nav">
      <div class="sysName" slot="left">安全态势感知与分析系统</div>
      <div slot="right" class="userNav">
        <el-dropdown>
          <span class="el-icon-user">{{ userName }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showUsers">用户信息</el-dropdown-item>
            <el-dropdown-item @click.native="showChpwd">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <a class="el-icon-setting" href="/"></a> -->
        <a class="el-icon-house" href="/home"></a>
      </div>
    </nav-bar>

    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="DialogClosed">
      <el-form :model="chpwdForm" ref="pwdForm" :rules="rules">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="chpwdForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input v-model="chpwdForm.new_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="chpwdForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('pwdForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import { changePassword } from "@/api/user_manage.js";

export default {
  name: "InnerNavBar",
  components: {
    NavBar,
  },
  data() {
    // 检测新密码和确认密码一致性
    let checkpass = (rule, value, callback) => {
      if (value == this.chpwdForm.new_password) {
        callback();
      } else {
        callback(new Error("密码不一致"));
      }
    };

    return {
      activeIndex: "1",
      //userName从sessionStorage获取，如果没有，则默认为test
      userName: localStorage.getItem("user_name") || "test",

      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: checkpass, trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
      chpwdForm: {
        password: "",
        new_password: "",
        checkPassword: "",
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    showUsers() {
      this.$router.push("/manage");
    },
    showChpwd() {
      this.dialogFormVisible = true;
    },
    logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    DialogClosed() {
      this.$refs["pwdForm"].resetFields();
      this.dialogFormVisible = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.$message.error("密码不一致");
          return;
        }
        // console.log(this.chpwdForm);
        const { data: res } = await changePassword(this.chpwdForm);
        if (res.code === 0) {
          this.$message.success("修改密码成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.sysName
  font-size 30px
  font-weight bold
  font-style italic
  padding-left 10px
  padding-top 10px
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.userNav
  text-align: right
  padding-right: 20px

  .el-icon-user
    font-size 22px
    cursor pointer
    margin-right 15px
    margin-top 15px
  a
    color: #606266 !important
    font-size 22px
    text-decoration none
    margin-right 5px
    color black

/* 令下边框覆盖整个宽度 */
.el-menu-demo
  border-bottom none !important

.nav
  border-bottom solid 1px #e6e6e6
</style>
