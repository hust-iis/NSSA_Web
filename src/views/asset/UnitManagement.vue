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
                v-model="searchContent" placeholder="筛选支持字段车间名称、行业、区域、监管车间、主管车间">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>

    <div slot="table">
      <!-- 车间基础信息弹窗 -->
      <el-dialog title="车间信息" :visible.sync="showUnitForm">
        <unit-form :data="selectUnit" :type="formType" :read-only.sync="onlyShowUnit" @canceled="showUnitForm = false" @success="handleNewEdit"></unit-form>
      </el-dialog>
      <!-- 车间基础信息弹窗 over -->

      <el-table :data="tableData" v-loading="loading" style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <!--<el-table-column type="selection"></el-table-column>-->
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="车间名称" width="200" fixed></el-table-column>
        <el-table-column prop="shortened" label="车间简称"></el-table-column>
        <el-table-column prop="production_number" label="产线号码"></el-table-column>
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
  getUnit,
  importUnitFile,
  downloadUnitFile,
  deleteSingleUnit,
} from "@/api/unit";
import UnitForm from "@/components/form/UnitForm";
import { saveAs } from 'file-saver';

export default {
  name: "UnitManagement",
  components: {
    AssetLayout,
    ClassifySideBar,
    UnitForm,
  },
  data() {
    return {
      loading: false,
      selectUnit: {}, // 所选定的原始数据"车间）
      showUnitForm: false, // 是否展示编"车间信息弹窗
      onlyShowUnit: true, // 编"车间信息弹窗是否为只读（sync）
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
    this.flushUnit()
  },
  methods: {
    // API 相关
    flushUnit() { // 刷新所有Unit
      this.loading = true
      getUnit(this.currentPage, this.pagesize, this.searchContent).then(response => {
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
      importUnitFile(file).then(res=>{
        this.handleUploadSuccess(res.data, file, fileList)
      }).catch(res=>{
        this.handleUploadError(res.data, file, fileList)
      })
    },
    handleUploadSuccess(res, file, fileList) { // 上传文件成功
      if(res.code === 0) {
        this.$message.success('导入成功')
        this.flushUnit()
      } else {
        this.handleUploadError(res, file, fileList)
      }
    },
    handleUploadError(error, file, fileList) { // 上传文件失败
      this.$message.error('导入失败'+error.msg)
      this.loading = false
    },
    handleDownload() { // 导出
      downloadUnitFile().then(res=>{
        saveAs(res.data, 'units.xls')
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    },
    handleAdd() { // 添"车间
      this.formType = "addUnit"; // 标识添"车间
      this.selectUnit = {};
      this.showUnitForm = true;
      this.onlyShowUnit = false;
    },
    handleEdit(row) { // 处理"编辑"按钮动作
      this.formType = "editUnit"; // 标识添"车间
      this.selectUnit = row;
      this.onlyShowUnit = false;
      this.showUnitForm = true;
    },
    handleNewEdit() { // 处理编辑成功之后动作
      this.flushUnit();
      this.showUnitForm = false;
    },
    handleDetail(row) { // 处理"详情"按钮动作
      this.formType = "detailUnit"; // 标识添"车间
      this.selectUnit = row;
      this.onlyShowUnit = true; // 设为只读
      this.showUnitForm = true;
    },
    // UI逻辑相关
    search(content) {
      this.currentPage = 1
      this.flushUnit()
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      this.flushUnit()  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.flushUnit()  //点击第几页
    },
    deleteRow(index, row) { // 处理删除的动作
      deleteSingleUnit(row.name).then( response => {
        if (response.data['code'] !== 0) {
          throw response
        }
        this.$message({type: 'success', message: '删除成功!'})
        this.flushUnit()
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