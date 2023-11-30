<template>
    <div>
      <el-form label-position="right" label-width="6vw" class="addServiceForm" :model="service" :disabled="readOnly">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="端口">
              <el-input type="text" v-model="service.port" placeholder="请输入端口号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务名">
              <el-input type="text" v-model="service.name" placeholder="请输入服务名"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" label-width="9vw">
              <el-input type="text" v-model="service.state" placeholder="请输入服务状态"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品" label-width="9vw">
              <el-input type="text" v-model="service.product" placeholder="请输入产品"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="版本">
              <el-input type="text" v-model="service.version" placeholder="请输入版本号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="cpe" label-width="9vw">
              <el-input type="text" v-model="service.cpe" placeholder="请输入cpe"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="补充信息">
              <el-input type="text" v-model="service.extrainfo" placeholder="请输入补充信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
      </el-form>
      <div style="text-align:right;">
        <el-button round @click="$emit('canceled')">取消</el-button>
        <el-button type="primary" round @click="submit">{{ this.type === "addService"? '添加' : (!readOnly? '提交' : '编辑') }}</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import {
    addService
  } from "@/api/scan";
  export default {
    name: "ServiceForm",
    props: {
      readOnly: { // 是否只读
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ""
      },
      data: { // 提供的表单原始数据
        type: Object,
        default: {}
      }
    },
    mounted() {
      this.service = JSON.parse(JSON.stringify(this.data))
    },
    watch: {
      data(val, old) { // 监听原始数据变化
        this.service = JSON.parse(JSON.stringify(val))
      }
    },
    methods: {
      submit(){
        if (this.type === "addService") {
          addService(this.service).then(response => {
            this.$message.success("添加成功");
            this.$emit('success')
          }).catch(response => {
            this.$message.error("添加失败: " + response.data.msg)
          });
        } else if(this.readOnly) {
          this.$emit('update:readOnly', false)
        } else {
          changeSingleService(this.service).then(response => {
            this.$message.success("修改成功");
            this.$emit('success')
          }).catch(response => {
            this.$message.error("修改失败: " + response.data.msg)
          });
        }
      }
    },
    data: ()=>{
      return {
        service: {},
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>