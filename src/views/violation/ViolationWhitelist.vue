<template>
    <asset-layout disable-aside>
      <div slot="buttons">
        <el-input style="width: 500px;" @keyup.enter.native="searchWhiteList"
                  v-model="searchContent" placeholder="输入用户名进行查找">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>

        <el-switch v-model="mode" style="float: right; margin-right:30px"
            active-text="拦截模式" inactive-text="学习模式">
        </el-switch>
      </div>
  
      <div slot="table">  
        <el-table :data="tableData" v-loading="loading" style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <!--<el-table-column type="selection"></el-table-column>-->
          <el-table-column prop="name" label="用户名" width="200" fixed></el-table-column>
          <el-table-column prop="url" label="URL"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该项吗？" style="margin-left: 10px;"
                               @confirm="deleteRow(scope.$index, scope.row)">
                  <el-button slot="reference" type="danger" size="small">删除</el-button>
                </el-popconfirm>
              </el-button-group>
            </template>
          </el-table-column>
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
  import {
    changeMode,
    searchUsr,
    deleteUsr
  } from "@/api/violation";
  
  export default {
    name: "ViolationWhiteList",
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
    mounted() {
      this.flushWhileList()
    },
    methods: {
      // API 相关
      flushWhiteList() { // 刷新所有Line
        this.loading = true
        searchUsr(this.currentPage, this.pagesize, this.searchContent).then(response => {
          if (response.data['code'] !== 0) {
            throw response
          }
          this.tableData = response.data['data'].map(v => v['fields']);
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
        this.flushWhiteList()
      },
      handleSizeChange: function(size) {
        this.pagesize = size
        this.flushWhiteList()  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage
        this.flushWhiteList()  //点击第几页
      },
      deleteRow(index, row) { // 处理删除的动作
        deleteUsr(row.name).then( response => {
          if (response.data['code'] !== 0) {
            throw response
          }
          this.$message({type: 'success', message: '删除成功!'})
          this.flushLine()
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
        })
      }
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