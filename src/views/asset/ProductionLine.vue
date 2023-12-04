<template>
    <asset-layout disable-aside>
      <!--<classify-side-bar slot="sidebar"></classify-side-bar>-->
      <div slot="buttons">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-upload action="" :show-file-list="false" accept=".xls,.xlsx" style="display: inline-block;margin-left: 10px"
          :auto-upload="false" :on-change="beforeFileUpload">
          <el-button type="primary">导入</el-button>
        </el-upload>
        <el-button type="primary" @click="handleDownload" style="margin-left: 10px">导出</el-button>
        <el-input style="width: 500px; margin-left: 15px" @keyup.enter.native="search"
                  v-model="searchContent" placeholder="筛选支持字段：产线名称、简称、id">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
  
      <div slot="table">
        <!-- 产线基础信息弹窗 -->
        <el-dialog title="产线信息" :visible.sync="showLineForm">
          <production-line-form :data="selectLine" :type="formType" :read-only.sync="onlyShowLine" @canceled="showLineForm = false" @success="handleNewEdit"></production-line-form>
        </el-dialog>
        <!-- 产线基础信息弹窗 over -->
  
        <el-table :data="tableData" v-loading="loading" style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <!--<el-table-column type="selection"></el-table-column>-->
          <el-table-column prop="id" label="序号" width="200" fixed></el-table-column>
          <el-table-column prop="name" label="产线名称"></el-table-column>
          <el-table-column prop="shortened" label="产线简称"></el-table-column>
          <el-table-column prop="asset_num" label="产线简称"></el-table-column>
          <el-table-column prop="workshop_n" label="产线id"></el-table-column>
          <el-table-column prop="asset_number" label="资产数量"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
  import AssetLayout from "@/components/common/AssetLayout";
  import ClassifySideBar from "@/components/common/ClassifySideBar";
  import {
    getLine,
    importLineFile,
    downloadLineFile,
    deleteSingleLine,
  } from "@/api/line";
  import ProductionLineForm from "@/components/form/ProductionLineForm";
  import { saveAs } from 'file-saver';
  
  export default {
    name: "ProductionLine",
    components: {
      AssetLayout,
      ClassifySideBar,
      ProductionLineForm,
    },
    data() {
      return {
        loading: false,
        selectLine: {}, // 所选定的原始数据（产线）
        showLineForm: false, // 是否展示编辑产线信息弹窗
        onlyShowLine: true, // 编辑产线信息弹窗是否为只读（sync）
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
      this.flushLine()
    },
    methods: {
      // API 相关
      flushLine() { // 刷新所有Line
        this.loading = true
        getLine(this.currentPage, this.pagesize, this.searchContent).then(response => {
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
      beforeFileUpload(file) {
        if(this.loading)
          return false
        this.loading = true
        importLineFile(file).then(res=>{
          this.handleUploadSuccess(res.data, file, fileList)
        }).catch(res=>{
          this.handleUploadError(res.data, file, fileList)
        })
      },
      handleUploadSuccess(res, file, fileList) { // 上传文件成功
        if(res.code === 0) {
          this.$message.success('导入成功')
          this.flushLine()
        } else {
          this.handleUploadError(res, file, fileList)
        }
      },
      handleUploadError(error, file, fileList) { // 上传文件失败
        this.$message.error('导入失败'+error.msg)
        this.loading = false
      },
      handleDownload() { // 导出
        downloadLineFile().then(res=>{
          saveAs(res.data, 'lines.xls')
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
        })
      },
      handleAdd() { // 添加产线
        this.formType = "addLine"; // 标识添加产线
        this.selectLine = {};
        this.showLineForm = true;
        this.onlyShowLine = false;
      },
      handleEdit(row) { // 处理"编辑"按钮动作
        this.formType = "editLine"; // 标识添加产线
        this.selectLine = row;
        this.onlyShowLine = false;
        this.showLineForm = true;
      },
      handleNewEdit() { // 处理编辑成功之后动作
        this.flushLine();
        this.showLineForm = false;
      },
      handleDetail(row) { // 处理"详情"按钮动作
        this.formType = "detailLine"; // 标识添加产线
        this.selectLine = row;
        this.onlyShowLine = true; // 设为只读
        this.showLineForm = true;
      },
      // UI逻辑相关
      search(content) {
        this.currentPage = 1
        this.flushLine()
      },
      handleSizeChange: function(size) {
        this.pagesize = size
        this.flushLine()  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage
        this.flushLine()  //点击第几页
      },
      deleteRow(index, row) { // 处理删除的动作
        deleteSingleLine(row.name).then( response => {
          if (response.data['code'] !== 0) {
            throw response
          }
          this.$message({type: 'success', message: '删除成功!'})
          this.flushLine()
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
        })
      }
    }
  };
  </script>
  
  <style scoped>
  .addicon:hover{
    cursor:pointer;
  }
  </style>