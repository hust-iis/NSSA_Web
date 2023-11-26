<template>
    <div>
      <!-- 表格 -->
      <el-table :data="tableData" @selection-change="handleSelectionChange"
        style="width: 100%; font-size:15px; height: 100%" border v-loading="loading"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <!-- 基本信息 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="ip" label="资产IP"></el-table-column>
        <el-table-column prop="name" label="资产名称"></el-table-column>
        <el-table-column prop="errprint" label="异常信息"></el-table-column>
        <el-table-column prop="time" label="发现时间"></el-table-column>
        <!-- 操作列表 -->
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
      <!-- 底部分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="tableData.length"
        layout="sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
        currentPage: 1,
        pageSize: 10,
        // 表格数据
        tableData: [],
        // 选中的行号
        multipleSelection: []
      }
    },
    mounted() {
  
    },
    methods: {
      getTableData() {
  
      },
      deleteRow() {
  
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteSelection() {
  
      },
      // 更改表格页面大小
      handleSizeChange: function (size) {
        this.pageSize = size
        this.flushHost()  //每页下拉显示数据
      },
      // 更改当前所在页面
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.flushHost()  //点击第几页
      },
      // 刷新Host
      flushHost() {
        this.loading = true
        this.getTableData()
        this.loading = false
      },
    }
  }
  </script>