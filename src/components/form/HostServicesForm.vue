<template>
  <div>
    <div style="display: flex; justify-content: flex-end;">
      <el-button @click="addSingleService()" icon="el-icon-plus" style="margin-right:10px" type="primary" plain>添加服务</el-button> 
      <el-upload action="" :show-file-list="false" accept=".xls,.xlsx"
        :auto-upload="false" :on-change="beforeFileUpload">
        <el-button class="el-icon-upload2" type="primary">导入</el-button>
      </el-upload>
      <el-button class="el-icon-download" style="margin-left: 10px" type="primary"
                 @click="handleDownload">导出</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; font-size:15px" border v-loading="loading"
              :header-cell-style="{background: '#eef1f6', color:'#606266'}">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
              <el-table-column label="端口">
        <template slot-scope="scope">
          <el-input v-if="addflag && scope.row.edit" v-model="scope.row.port"></el-input>
          <span v-else>{{scope.row.port}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.state"></el-input>
          <span v-else>{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.product"></el-input>
          <span v-else>{{scope.row.product}}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.version"></el-input>
          <span v-else>{{scope.row.version}}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPE">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.cpe"></el-input>
          <span v-else>{{scope.row.cpe}}</span>
        </template>
      </el-table-column>
      <el-table-column label="附加信息">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.extrainfo"></el-input>
          <span v-else>{{scope.row.extrainfo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="扫描时间" prop="update_time"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="small" @click="handleEdit(scope.$index)">{{ scope.row.edit? '提交' : '编辑' }}</el-button>
            <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该项吗？" style="margin-left: 10px;"
                           @confirm="deleteRow(scope.$index, scope.row)">
              <el-button slot="reference" type="danger" size="small">删除</el-button>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import {
  changeSingleHostService,
  deleteSingleService,
  importHostServiceFile,
  downloadHostServiceFile,
  getHostServices,
  addSingleService
} from "@/api/scan";
import { saveAs } from 'file-saver';
import { number } from 'echarts';

export default {
  name: "HostServicesForm",
  props: {
    ip: {
      type: String,
      default: ""
    },
    assetId:{
      type:Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      title: "",
      tableData: [{
        id:1,
        ip:  "192.168.99.99",
        port:"portT",
        state:"stateT",
        name:"nameT",
        product:"productT",
        version:"versionT",
        cpe:"cpeT",
        edit: false,
      }],
      addflag:false,
    }
  },
  mounted() {
    this.initialData()
  },
  watch: {
    ip(val,oldVal) {
      this.initialData()
    }
  },
  methods: {
    initialData() { // 获取所有Service
      this.loading = true
      getHostServices(1,99,this.assetId).then((response) => { // 成功获取，更新表项
        this.tableData = response.data['data'].list
        this.loading = false
      }).catch((err) => {
        this.tableData = []
        this.$message.error('error: ' + err.data.msg)
        this.loading = false
      })
    },
    beforeFileUpload(file, fileList) {
      if(this.loading)
        return false
      this.loading = true
      importHostServiceFile(file).then(res=>{
        this.handleUploadSuccess(res.data, file, fileList)
      }).catch(res=>{
        this.handleUploadError(res.data, file, fileList)
      })
    },
    handleUploadSuccess(res, file, fileList) { // 上传文件成功
      if(res.code === 0) {
        this.$message.success('导入成功')
        this.initialData()
      } else {
        this.handleUploadError(res, file, fileList)
      }
    },
    handleUploadError(error, file, fileList) { // 上传文件失败
      this.$message.error('导入失败'+error.msg)
      this.loading = false
    },
    handleDownload() { // 导出
      downloadHostServiceFile(this.ip).then(res=>{
        saveAs(res.data, 'services.xls')
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    },
    handleEdit(row) { // Service 编辑提交
      if(this.tableData[row].edit) {
        this.loading = true
        if(!this.addflag){
          changeSingleHostService(this.id, this.tableData[row]).then(response => {
            this.$message.success('修改成功')
            this.initialData()
          }).catch(err => {
            this.$message.error('修改失败: ' + err.data.msg)
            this.loading = false
          })
        }else{
          this.tableData[row].update_time=new Date();
          this.tableData[row].assetId=this.assetId
          let tempData={
            id:this.assetId,
            ip:  this.tableData[row].ip,
            port:this.tableData[row].port,
            state:this.tableData[row].state,
            name:this.tableData[row].name,
            product:this.tableData[row].product,
            version:this.tableData[row].version,
            cpe:this.tableData[row].cpe,
          }
          addSingleService(this.ip, tempData).then(response => {
            this.$message.success('添加成功')
            this.initialData()
          }).catch(err => {
            this.$message.error('添加失败: ' + err.data.msg)
            this.loading = false
          })
          this.addflag=false
        }
        
      }
      this.tableData[row].edit = !this.tableData[row].edit
    },
    //要写的内容
    addSingleService(){
      const newrow={
        port:"",
        state:"",
        name:"",
        product:"",
        version:"",
        cpe:"",
        extrainfo:"",
        update_time:"",
        edit: true,
      }
      this.tableData.push(newrow)
      this.addflag=true
    },
    deleteRow(index, row) {
      deleteSingleService(row.id).then( response => {
        if (response.data['code'] !== 0) {
          throw response
        }
        this.$message({type: 'success', message: '删除成功!'})
        this.initialData()
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>