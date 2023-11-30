<template>
    <asset-layout disable-aside>
      <div slot="buttons">
        <el-input style="width: 500px;" @keyup.enter.native="searchLogs"
                  v-model="searchContent" placeholder="输入用户名进行查找">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>

        <el-switch v-model="mode" style="float: right; margin-right:30px"
            active-text="拦截模式" inactive-text="学习模式">
        </el-switch>
      </div>
  
      <div slot="table">  
        <el-table :data="tableData" v-loading="loading" style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column prop="id" label="ID" width="200" fixed></el-table-column>
          <el-table-column prop="name" label="用户名" width="200" fixed></el-table-column>
          <el-table-column prop="ip" label="IP"></el-table-column>
          <el-table-column prop="url" label="URL"></el-table-column>

        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10]"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="tableTotal">
        </el-pagination>
      </div>
    </asset-layout>
  </template>
  
  <script>
  import AssetLayout from "@/components/common/AssetLayout";
  import {
    changeMode,
    searchLogs,
  } from "@/api/violation";
  
  export default {
    name: "ViolationLogs",
    components:{AssetLayout},
    data() {
      return {
        mode:true,
        loading: false,
        currentPage: 1,
        pagesize: 10,
        tableTotal: 0,
        formType: "",
        tableData: [
          {},
        ],
        searchContent: ''
      };
    },
    
    methods: {
      // API 相关
      flushLogs() { // 刷新所有Line
        // this.loading = true
        
        searchLogs(this.currentPage, this.pagesize, this.searchContent).then(response => {
          if (response.data['code'] !== 0) {
            throw response
          }
          this.tableData = response.data['data'].map(v => v['list']);
          this.tableTotal = response.data['total']
          this.loading = false
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
          this.loading = false
        })
      },

      // UI逻辑相关
      search(content) {
        this.currentPage = 1
        this.flushLogs()
      },
      handleSizeChange: function(size) {
        this.pagesize = size
        this.flushLogs()  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage
        this.flushLogs()  //点击第几页
      },

    },
    mounted() {
      this.flushLogs()
    },
    watch:{
        mode:{
            immediate:true,
            handler(newMode,oldMode){
                var status=(newMode===true?1:0)
                changeMode(status)

            }
        }
    }
  };
  </script>
  
  <style scoped>
  .addicon:hover{
    cursor:pointer;
  }
  </style>