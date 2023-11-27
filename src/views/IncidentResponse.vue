<!-- 应急响应 -->
<template>
  <div>
    <el-container>
      <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
      <el-container>
        <el-aside width="200px"><incident-side-bar></incident-side-bar></el-aside>
        
        <el-main style="overflow: hidden">
          <el-header height="60px">
          <el-row :gutter="20">
            <span>收件箱：</span>
            <span v-show="!email.isEdit">{{ email.addrress }}</span>
            <el-input
              v-show="email.isEdit"
              type="text"
              style="width: 200px"
              v-model="email.addrress"
            />
            <el-button
              v-show="!email.isEdit"
              type="primary"
              @click="editEmailAddr"
              style="margin-left: 10px"
              >编辑</el-button
            >
            <el-button
              v-show="email.isEdit"
              type="success"
              @click="saveEmailAddr"
              >保存</el-button
            >
            <el-button
              type="default"
              @click="settingsVisible = true"
              style="margin-left: 60px"
              >更多设置</el-button
            >
          </el-row>
        </el-header>
          <el-alert
            v-for="threat in threats"
            :key="threat.key"
            :title="threat.title"
            :type="dangerLevel(threat.danger)"
            :description="threat.detail"
            style="margin-top: 10px"
          />

          <el-button @click="gotoAbnormal" style="margin-top: 20px;">查看异常详情</el-button>

          <el-dialog title="邮件告警设置" :visible.sync="settingsVisible">
            <el-form
              :model="settingsForm"
              ref="settingsForm"
              label-width="120px"
              style="margin-right: 60px"
            >
              <el-form-item label="邮件主题"
                ><el-input v-model="settingsForm.subject"
              /></el-form-item>
              <el-form-item label="发件人显示"
                ><el-input v-model="settingsForm.sender"
              /></el-form-item>
              <el-form-item label="选择发送方式">
                <el-col :span="11">
                  <el-select
                    v-model="settingsForm.way"
                    prop="way"
                    placeholder="请选择"
                  >
                    <el-option label="立即发送" value="immediate"></el-option>
                    <el-option label="分批发送" value="batch"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" class="text-center">
                  <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                  <el-time-picker
                    v-model="settingsForm.sendingTime"
                    placeholder="Pick a time"
                    style="width: 100%"
                  />
                </el-col>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="settingsVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveSettings">确定</el-button>
            </div>
          </el-dialog>

          <Notification
            ref="notification"
            placement="topRight"
            :duration="null"
            :top="30"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
    
<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import IncidentSideBar from "@/components/content/IncidentSideBar";
import axios from "axios";
import Notification from "@/components/form/Notification";
export default {
  name: "IncidentResponse",
  components: {
    InnerNavBar,
    Notification,
    IncidentSideBar
  },
  data() {
    return {
      settingsVisible: false,
      email: {
        addrress: "295664857@qq.com",
        isEdit: false,
      },
      threats: [],
      settingsForm: {
        subject: "",
        sender: "",
        way: "",
        sendingTime: "",
      },
      // tableData: [],
      // loading:false
    };
  },
  methods: {
    editEmailAddr() {
      this.email.isEdit = true;
    },
    saveEmailAddr() {
      this.email.isEdit = false;
      console.log("此时应该给后端发送收件地址更改了！");
    },

    getInfo() {
      console.log(11111);
      axios.get("http://localhost:8080/yingji/xiangying").then((res) => {
        this.threats = res.data.alertInfo;
      });
    },
    dangerLevel(num) {
      return num >= 5 ? "error" : "warning";
    },
    saveSettings() {
      const notification = {
        title: "Success",
        description: "邮件相关设置保存成功！",
      };
      this.settingsVisible = false;
      this.$refs.notification.success(notification); // success调用
      //   this.$refs.notification.open(notification) // 默认使用
      // this.$refs.notification.info(notification) // info调用
      // this.$refs.notification.error(notification) // error调用
      // this.$refs.notification.warn(notification) // warning调用
    },
    gotoAbnormal(){
      // console.log("即将跳转"),
	    this.$router.push("/traffic_monitor/monitor")
    }
    // flushHost() {
    //   // 刷新所有Host
    //   this.loading = true
    //   axios.get('http://localhost:8080/biaoge/shuju').then((res) => {
    //     this.tableData = res.data.tableData;
    //     // console.log(res.data)
    //     console.log(res.data.tableData)
        
    //   });
    //   this.loading = false
    // },
  },
  mounted() {
    this.getInfo();
    // this.flushHost()
  },
};
</script>
    
<style scoped>
.el-header {
  padding: 0;
}

.el-container {
  overflow: hidden;
}
</style>