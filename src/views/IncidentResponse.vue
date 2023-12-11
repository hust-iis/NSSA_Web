<!-- 应急响应 -->
<template>
  <div>
    <el-container>
      <el-header height="60px"><inner-nav-bar></inner-nav-bar></el-header>
      <el-container>
        <el-aside width="200px"><incident-side-bar></incident-side-bar></el-aside>
        <el-main style="overflow: hidden">
          <!-- 顶部邮箱设置 -->
          <el-header height="60px">
            <el-row :gutter="20" type="flex" justify="space-between">
              <el-col>
                <span>收件箱：</span>
                <span v-show="!email.isEdit">{{ email.addrress }}</span>
                <el-input v-show="email.isEdit" type="text" style="width: 200px" v-model="email.addrress" />
                <el-button v-show="!email.isEdit" type="primary" @click="editEmailAddr" style="margin-left: 10px">编辑</el-button>
                <el-button v-show="email.isEdit" type="success" @click="saveEmailAddr">保存</el-button>
              </el-col>
              <el-col style="text-align: right;">
                <el-button type="default" @click="settingsVisible = true" style="margin-left: 60px">更多设置</el-button>
              </el-col>
            </el-row>
          </el-header>

          <!-- 新的威胁展示 -->
          <el-divider><span style="font-weight: 600; font-size: 16px; color: var(--el-text-color-regular);">应急响应事件</span></el-divider>
          <el-card v-for="threat in threats" :key="threat.id"
            class="announcement-card normal" shadow="never">
            <template #header>
              <div class="announcement-card__title" style="display: flex; justify-content: space-between">
                <template>
                  <span v-if="threat.type == 0">异常流量事件</span>
                  <span v-if="threat.type == 1">异常用户事件</span>
                  <span v-if="threat.type == 2">异常主机事件</span>
                </template>  
                <el-button type="primary" @click="finishThreat(threat.id)">已读</el-button>
              </div>
            </template>
            <el-scrollbar max-height="400px">
              <div class="announcement-card__content">
                <div v-for="(value, key) in threat.content" :key="key">
                  {{ key }}: {{ value }}
                </div>
              </div>
            </el-scrollbar>
          </el-card>
          
          <!-- 底部的【查看更多】按钮 -->
          <el-button @click="gotoAbnormal" style="margin-top: 20px;">查看更多异常详情</el-button>
          
          <!-- 邮件设置弹窗 -->
          <el-dialog title="邮件告警设置" :visible.sync="settingsVisible">
            <el-form :model="settingsForm" ref="settingsForm" label-width="120px" style="margin-right: 60px">
              <el-form-item label="邮件主题"><el-input v-model="settingsForm.subject" /></el-form-item>
              <el-form-item label="发件人显示"><el-input v-model="settingsForm.sender" /></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="settingsVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveSettings">确定</el-button>
            </div>
          </el-dialog>
          <!-- 邮箱设置保存成功弹窗 -->
          <Notification ref="notification" placement="topRight" :duration="null" :top="30" />

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
    
<script>
import InnerNavBar from "@/components/content/InnerNavBar";
import IncidentSideBar from "@/components/content/IncidentSideBar";
import Notification from "@/components/form/Notification";
import {
  getIncidentResponsEvents,
  finishIncidentResponsEvent,
  uploadVulThreat
} from "@/api/incident_response"
export default {
  name: "IncidentResponse",
  components: {
    InnerNavBar,
    Notification,
    IncidentSideBar
  },
  data() {
    return {
      // 威胁事件
      currentPage: 1,
      pageSize: 10,
      tableTotal: 0,
      threats: [
        // {
        //   id: 1,
        //   title: "威胁1",
        //   content: "alksfhkladsfhlkajsdfhlajkshdf asdf"
        // },
        // {
        //   id: 2,
        //   title: "威胁2",
        //   content: "拉克丝的废话啦扣税的风流啊是的法律"
        // },
        // {
        //   id: 3,
        //   title: "威胁3",
        //   content: "偶闻夫人很难看阿萨的本能和顾客垃圾啊韩国部署多个开来看过"
        // },
        // {
        //   id: 4,
        //   title: "威胁4",
        //   content: "圣诞节快乐发给胡昆仑山地方和概括来讲是"
        // },
        // {
        //   id: 5,
        //   title: "威胁5",
        //   content: "节快乐的方式婢女架空历史的包袱鬼哭狼嚎"
        // }
      ],
      // 邮箱设置
      email: {
        addrress: "295664857@qq.com",
        isEdit: false,
      },
      // 邮箱设置表单
      settingsVisible: false,
      settingsForm: {
        subject: "",
        sender: "",
        way: "",
        sendingTime: "",
      },
    };
  },
  methods: {
    // 修改邮箱地址
    editEmailAddr() {
      this.email.isEdit = true;
    },
    // 保存邮箱地址
    saveEmailAddr() {
      this.email.isEdit = false;
      let tempdata={
        "email_recipient": this.email.addrress,
        "email_subject": this.settingsForm.subject,
        "email_addresser_name":this.settingsForm.sender
      }
      uploadSettings(tempdata).then((response) => { // 成功获取，更新表项
        const notification = {
        title: "Success",
        description: "更改邮件地址成功！",
      };
      this.$refs.notification.success(notification); // success调用
      }).catch((err) => {
        this.tableData = []
        this.$message.error('error: ' + err.data.msg)
        this.loading = false
      })
     
      
    },
    // 获取威胁事件
    getInfo() {
      getIncidentResponsEvents(this.currentPage, this.pageSize, 0)
        .then((response) => {
          this.threats = response.data["data"]['warning'].map((item) => ({
            ...item,
            content: JSON.parse(item["detail"])
          }))
          this.tableTotal = response.data["data"]['count']
        }).catch((response) => {
          console.log(response)
          this.$message.error(response.data.msg);
        }).finally()
    },
    // 已读一条消息
    finishThreat(id) {
      finishIncidentResponsEvent(id).then(response => {
        if (response.data['code'] !== 0) {
            throw response
          }
          this.$message({ type: 'success', message: '成功!' })
          this.getInfo()
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
        })
    },
    // 威胁事件等级
    dangerLevel(num) {
      return num >= 5 ? "error" : "warning";
    },
    // 保存邮箱设置
    saveSettings() {
      let tempdata={
        "email_recipient": this.email.addrress,
        "email_subject": this.settingsForm.subject,
        "email_addresser_name":this.settingsForm.sender
      }
      uploadSettings(tempdata).then((response) => { // 成功获取，更新表项
        const notification = {
          title: "Success",
          description: "邮件相关设置保存成功！",
        };
        this.settingsVisible = false;
        this.$refs.notification.success(notification); // success调用
      }).catch((err) => {
        this.tableData = []
        this.$message.error('error: ' + err.data.msg)
        this.loading = false
      })
    },
    gotoAbnormal() {
      // console.log("即将跳转"),
      this.$router.push("/traffic_monitor/monitor")
    },
  },
  mounted() {
    this.getInfo();
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

/* 公告列表 */
.announcement-list {
  flex: 1;
  padding-right: 30px;

  display: flex;
  flex-direction: column;
}
.announcement-card {
  min-width: 500px;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.06);
}
.announcement-card.normal {
  max-height: 500px;
}
.announcement-card+.announcement-card {
  margin-top: 20px;
}
.announcement-card__title {
  word-wrap: normal;
  white-space: pre-line;
}
.announcement-card__content {
  text-align: left;
  padding-right: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>