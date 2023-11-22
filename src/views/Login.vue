<template>
  <div class="loginHome">
    <p class="Header">网络信息攻击模拟器</p>
    <!-- 粒子特效 -->
    <div id="liziceshi">
      <vue-particles
        color="#38B0DE"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#38B0DE"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
        class="lizi"
      />
    </div>
    <div class="login-container">
      <div style="color: #000; text-align: center;height: 50px;">
        登录
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user_name" class="itemUser">
          <el-input
            type="text"
            v-model="ruleForm.user_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="itemUser">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!--      <el-form-item label="年龄" prop="age">-->
        <!--        <el-input v-model.number="ruleForm.age"></el-input>-->
        <!--      </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register, login } from "@/api/user_manage";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账户"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user_name: "",
        password: "",
      },
      rules: {
        user_name: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      },
      isLogin: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLogin = true;
          login(this.ruleForm).then((res) => {
            if (res.data.code === 0) {
              this.$message.success("登录成功");
              //将token存入sessionStorage
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem("user_name", res.data.data.user_name);
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.loginHome {
  background-image: url("../assets/img/global.jpg");
  height: 100%;
  width: 100%;
  position: fixed;
  background-position: center center;
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
  background-size: cover;
}

.lizi {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
}

.itemUser .el-form-item__label {
  color: black;
}
.Header {
  font-weight: 700;
  font-size: 40px;
  text-align: center;
  color: white;
}
.login-container {
  width: 400px;
  height: 290px;

  /* background: #e5e9f2; */
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
}
</style>
