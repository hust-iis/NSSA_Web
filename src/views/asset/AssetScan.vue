<template>
  <el-container>
    <el-header height="100px">
      <div>
        <el-row>
          <span>扫描任务： </span>
          <el-button @click="dialogFormVisible = true;">编辑任务</el-button>
          <span style="margin-left: 100px">扫描已结束，发现资产{{tableTotal}}个，总用时0小时0分30秒</span>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-button type="primary" @click="topoGenSucc()">查看拓扑图</el-button>
          <el-button type="primary" @click="topoGenerate" class="top-items">拓扑图生成</el-button>
          <el-upload action="" :show-file-list="false" accept=".xls,.xlsx" class="top-items" style="display: inline-block"
            :auto-upload="false" :on-change="beforeFileUpload">
            <el-button class="el-icon-upload2" type="primary">导入</el-button>
          </el-upload>
          <el-button class="el-icon-download top-items" type="primary" @click="handleDownload">导出</el-button>
          <el-input style="width: 450px" @keyup.enter.native="search" class="top-items"
                    v-model="searchContent" placeholder="筛选支持字段：IP地址、主机名、单位名称、操作系统">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button type="primary" @click="addAsset()" style="float: right; margin-right: 20px;">添加资产</el-button>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-table :data="tableData" style="width: 100%; font-size:15px; height: 100%" border
                  v-loading="loading" :header-cell-style="{background: '#eef1f6', color:'#606266'}">
          <!--<el-table-column type="selection"></el-table-column>-->
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="ip" label="IP地址">
            <template slot-scope="scope">
              <el-button type="text" @click="showServiceForm(scope.$index)">{{ scope.row.ip }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="asset_name" label="主机名"></el-table-column>
          <el-table-column prop="position" label="位置"></el-table-column>
          <el-table-column prop="device_sn" label="设备序列号"></el-table-column>
          <el-table-column prop="device_vendor" label="供应商"></el-table-column>
          <el-table-column prop="device_type" label="设备类型"></el-table-column>
          <el-table-column prop="device_working_hours" label="工作时间"></el-table-column>
          <el-table-column prop="cpu_used" label="cpu使用率"></el-table-column>
          <el-table-column prop="remain_mem" label="剩余内存"></el-table-column>
          <el-table-column prop="remain_harddisk" label="剩余硬盘大小主机名"></el-table-column>
          <el-table-column prop="network_speed" label="网速"></el-table-column>
          <el-table-column prop="os" label="操作系统"></el-table-column>
          <el-table-column prop="mac" label="MAC地址"></el-table-column>
          <el-table-column prop="update_time" label="更新时间"></el-table-column>
          <el-table-column prop="productionline_name" label="产线名称"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="small" @click="showAssetForm(scope.$index, scope.row)">编辑</el-button>
                <el-button type="primary" size="small" @click="showServiceForm(scope.$index)">服务</el-button>
                <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该项吗？" style="margin-left: 10px;"
                               @confirm="deleteRow(scope.$index, scope.row)">
                  <el-button slot="reference" type="danger" size="small">删除</el-button>
                </el-popconfirm>
              </el-button-group>
            </template>
          </el-table-column>
<!-- 我添加的内容 -->
          <el-table-column label="风险分析">
            <template slot-scope="scope">
              <el-button type="warning" @click="showVt(scope.$index, scope.row)">风险值</el-button>
            </template></el-table-column>
<!-- 我添加的内容结束 -->
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
      <!--任务配置弹窗-->
      <el-dialog title="扫描任务配置" :visible.sync="dialogFormVisible" >
        <el-form :model="ScanTaskform" ref="ScanTaskform" :rules="scanFormRules"
                 :label-width="formLabelWidth" style="margin-right: 30px;" size="mini">
          <el-form-item label="网段" prop="netSeg">
            <el-input v-model="ScanTaskform.netSeg" placeholder="格式：192.168.1.0/24"></el-input>
          </el-form-item>
          <el-form-item label="扫描最大线程数" >
            <el-slider
                v-model="ScanTaskform.maxThreadNum" :min="1" :max="5"
                show-input style="margin-left: 15px;">
            </el-slider>
          </el-form-item>
          <el-form-item label="nmap扫描端口范围" prop="portRange">
            <el-input v-model="ScanTaskform.portRange" placeholder="格式：xx-xx"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="handleClickScan">开始扫描</el-button>
        </div>
      </el-dialog>
      <!--Service展示\编辑弹窗-->
      <el-dialog :title="serviceTableIP + '的服务列表'" :visible.sync="serviceTableVisible" width="80vw">
        <host-services-form :ip="serviceTableIP" :asset_id="serviceTableID" ref="serviceTable"></host-services-form>
      </el-dialog>
      <!-- 生成拓扑图弹窗 -->
      <el-dialog title="拓扑图生成" :visible.sync="topoGenVisible" width="50vw">
        <topo-gen-by-net-form @canceled="topoGenVisible = false" @success="topoGenSucc"></topo-gen-by-net-form>
      </el-dialog>
      <!-- Host表项编辑弹窗 -->
      <el-dialog title="资产详情" :visible.sync="assetFormVisible" >
        <el-form :model="assetFormEdit"  :label-width="formLabelWidth"
                 style="margin:0 30px 0 60px; width: 500px;" :disabled="assetReadFlag">
          <el-form-item label="ID" >
            <span>{{assetFormEdit.id}}</span>
          </el-form-item>
          <el-form-item label="IP地址" >
            <el-input v-model="assetFormEdit.ip" v-show="assetAdding"></el-input>
            <span v-show="!assetAdding">{{assetFormEdit.ip}}</span>
          </el-form-item>
          <el-form-item label="主机名" >
            <el-input v-model="assetFormEdit.name"></el-input>
          </el-form-item>
          <el-form-item label="位置" >
            <el-input v-model="assetFormEdit.position"></el-input>
          </el-form-item>
          <el-form-item label="sn" >
            <el-input v-model="assetFormEdit.sn"></el-input>
          </el-form-item>
          <el-form-item label="供应商" >
            <el-input v-model="assetFormEdit.vendor"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" >
            <el-input v-model="assetFormEdit.type"></el-input>
          </el-form-item>
          <el-form-item label="工作时常" >
            <el-input v-model="assetFormEdit.working_hours"></el-input>
          </el-form-item>
          <el-form-item label="CPU使用率" >
            <el-input v-model="assetFormEdit.cpu_used"></el-input>
          </el-form-item>
          <el-form-item label="剩余内存" >
            <el-input v-model="assetFormEdit.remain_mem"></el-input>
          </el-form-item>
          <el-form-item label="网速" >
            <el-input v-model="assetFormEdit.network_speed"></el-input>
          </el-form-item>
          <el-form-item label="操作系统" >
            <el-input v-model="assetFormEdit.os"></el-input>
          </el-form-item>
          <el-form-item label="MAC地址" >
            <el-input v-model="assetFormEdit.mac"></el-input>
          </el-form-item>
          <el-form-item label="产线id" >
            <el-input v-model="assetFormEdit.productionline_id"></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属单位" >
            <el-select v-model="assetFormEdit.department_name">
              <el-option v-for="(unit) in unitList" :key="unit.name"
                :label="unit.name" :value="unit.name"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer" v-show="footVisible">
          <el-button @click="assetFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit('assetFormEdit')"  v-show="!assetAdding">保存修改</el-button>
          <el-button type="primary" @click="handleAddAsset('assetFormEdit')"  v-show="assetAdding">确认添加</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹窗 over -->
      <!-- 下面是我新加的内容，用于风险分析的弹窗 -->
      <el-dialog title="扫描任务配置" :visible.sync="riskFormVisible" >
        <el-form :model="riskForm" ref="riskForm"
                 :label-width="formLabelWidth" style="margin-right: 60px;" size="mini">
          <el-form-item label="资产价值" prop="asset_value">
            <el-input v-model="riskForm.asset_value" placeholder="请输入资产价值"></el-input>
          </el-form-item>
          <el-form-item label="威胁值" prop="threat_value">
            <span>{{ riskForm.threat_value }}</span>
          </el-form-item>
          <el-form-item label="脆弱值" >
            <span>{{ riskForm.vulnerability_value }}</span>
          </el-form-item>
          <el-form-item label="风险值" prop="risk_value" size="large" style="color: orange;">
            <span>{{ riskForm.risk_value }}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="riskFormVisible = false">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="calRiskValue">重新计算</el-button>
        </div>
      </el-dialog>
       <!-- 新加的内容结束 -->
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import AssetLayout from "@/components/common/AssetLayout";
import {
  changeSingleHost,
  deleteSingleHost,
  importHostFile,
  downloadHostFile,
  getScanHost,
  startScanHost,
  addSingleAsset,
  getVulThreat,
  calRisk
} from "@/api/scan";
import { getUnit } from "@/api/unit";
import { saveAs } from 'file-saver';
import HostServicesForm from "@/components/form/HostServicesForm";
import TopoGenByNetForm from "@/components/form/TopoGenByNetForm";


export default {
  name: "AssetScan",
  components: {
    HostServicesForm,
    AssetLayout,
    TopoGenByNetForm,

  },
  data() {
    return {
      // tableData: [],
      // tableTotal: 0,
      tableData: [{
        "id":1,
        "ip": "192.168.99.99",
        "name": "TEST",
        "position": "",
        "device_sn": "",
        "device_vendor": "TEST",
        "device_type": "",
        "device_working_hours": "",
        "cpu_used": 0,
        "remain_mem": 0,
        "remain_harddisk": 0,
        "network_speed": 0,
        "os": "Arris TG862 WAP",
        "mac": "AA:BB:CC:DD:EE:FF",
        "update_time": "Sun Nov 27 00:14:27 2023",
        "productionline_id": 0
      },
      {
        "id":2,
        "ip": "192.168.99.100",
        "name": "TEST",
        "position": "",
        "device_sn": "",
        "device_vendor": "TEST",
        "device_type": "",
        "device_working_hours": "",
        "cpu_used": 0,
        "remain_mem": 0,
        "remain_harddisk": 0,
        "network_speed": 0,
        "os": "Arris TG862 WAP",
        "mac": "AA:BB:CC:DD:EE:FF",
        "update_time": "Sun Nov 27 00:14:27 2023",
        "productionline_id": 0
      }
    ],
      tableTotal: 1,
      currentPage: 1,
      pagesize: 10,
      unitList: [],
      serviceTableIP: "",
      serviceTableID: "",
      loading: false,
      dialogFormVisible: false,
      serviceTableVisible: false,
      assetReadFlag: false,
      footVisible: true,
      topoGenVisible: false, 
      assetFormVisible: false,
      riskFormVisible:false,
      assetAdding:false,
      calR_id:"",
      ScanTaskform: {
        netSeg: '',
        portRange: '',
        maxThreadNum: 1
      },
      scanFormRules: {
        netSeg: [
          { required: true, message: '请输入网段', trigger: 'blur' },
        ],
        portRange: [
          { required: true, message: '请输入端口范围', trigger: 'blur' },
          { pattern: /\d+-\d+/, message: '端口范围格式: xx-xx', trigger: 'blur'}
        ],
      },
      assetFormEdit: {
        // ip: '11',
        // hostname: '',
        // type: '',
        // mac: '',
        // os: '',
        // vendor: '',
        // index:0
      },
      // 这里是新添加的弹窗值
      riskForm:{
        asset_value:'',
        threat_value:1,
        vulnerability_value:2,
        risk_value:100
      },
      formLabelWidth: '150px',
      searchContent: '',
    }
  },
  mounted() {
    this.flushHost()
    this.flushUnit()
  },
  methods: {
    // API 相关
    startScan () { // 开始扫描
      this.loading = true;
      startScanHost(this.ScanTaskform).then(response => {
        this.flushHost();
      }).catch(response => {
        this.$message.error('扫描失败: ' + response.data.msg)
        this.loading = false;
      })
    },
    flushHost() { // 刷新所有Host
      this.loading = true
      getScanHost(this.currentPage, this.pagesize, this.searchContent).then(response => {
        if (response.data['code'] !== 0) {
          throw response
        }
        this.tableData = response.data['data'].list;
        this.tableTotal = response.data['data'].total
        this.loading = false
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
        this.loading = false
      })
    },
    flushUnit() {
      getUnit(1, 1e9, '').then(response => {
        if (response.data['code'] !== 0) {
          throw response
        }
        this.unitList = response.data['data'].list;
        console.log(this.unitList)
      }).catch(response => { })
    },
    topoGenerate() {
      this.topoGenVisible = true;
    }, 
    topoGenSucc() {
      let r = this.$router.resolve({name: 'topo'})
      window.open(r.href, '_blank')
    },
    beforeFileUpload(file, fileList) {
      if(this.loading)
        return false
      this.loading = true
      importHostFile(file).then(res=>{
        this.handleUploadSuccess(res.data, file, fileList)
      }).catch(res=>{
        this.handleUploadError(res.data, file, fileList)
      })
    },
    handleUploadSuccess(res, file, fileList) { // 上传文件成功
      if(res.code === 0) {
        this.$message.success('导入成功')
        this.flushHost()
      } else {
        this.handleUploadError(res, file, fileList)
      }
    },
    handleUploadError(error, file, fileList) { // 上传文件失败
      this.$message.error('导入失败: '+error.msg)
      this.loading = false
    },
    handleDownload() { // 导出
      downloadHostFile().then(res=>{
        saveAs(res.data, 'hosts.xls')
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    },
    handleEdit(forName) { // Host 编辑
      this.loading = true
      changeSingleHost(this.assetFormEdit.id,this.assetFormEdit).then(response => {
        this.$message.success('修改成功')
        this.flushHost()
      }).catch(err => {
        this.$message.error('修改失败: ' + err.data.msg)
        this.loading = false
      })
      this.assetFormVisible = false
      // this.$set(this.tableData, this.assetFormEdit.index,
      //     {
      //       ip:this.assetFormEdit.ip,
      //       hostname:this.assetFormEdit.hostname,
      //       type:this.assetFormEdit.type,
      //       mac:this.assetFormEdit.mac,
      //       os:this.assetFormEdit.os,
      //       vendor:this.assetFormEdit.vendor,
      //     })
    },
    //////////////////////////////////////////////这里是新加的，添加资产的按钮
    handleAddAsset(forName) { // Host 添加
      this.loading = true
      this.assetFormEdit.update_time=new Date()
      addSingleAsset(this.assetFormEdit).then(response => {
        this.$message.success('保存成功')
        this.flushHost()
      }).catch(err => {
        this.$message.error('保存失败: ' + err.data.msg)
        this.loading = false
      })
      this.assetFormVisible = false
      this.assetAdding=false
    },

    // UI逻辑相关
    search(content) { // 搜索
      this.currentPage = 1
      this.flushHost()
    },
    handleClickScan() { // 开始扫描
      this.$refs.ScanTaskform.validate((valid) => {
        if (valid) {
          this.startScan();
        } else {
          return false;
        }
      });
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      this.flushHost()  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.flushHost()  //点击第几页
    },
    showServiceForm(index) { // 点击IP后显示"该IP下的所有服务"弹窗
      this.serviceTableVisible = true
      if(this.serviceTableIP === this.tableData[index].ip) // IP相同时，强制重载
        this.$refs.serviceTable.initialData()
      this.serviceTableIP = this.tableData[index].ip
      this.serviceTableID=index
    },
    showAssetForm(index, row) {
      this.assetAdding=false
      this.assetFormVisible = true
      this.assetReadFlag = false
      this.assetFormEdit = Object.assign({}, row)
      this.assetFormEdit.index = index
      this.footVisible = true
    },
    addAsset(){
      this.assetFormVisible = true
      this.assetReadFlag = false
      this.assetFormEdit = Object.assign({}, {})
      this.assetAdding=true
    },
    AssetInfo(index, row) {
      this.assetFormVisible = true
      this.assetReadFlag = true
      this.assetFormEdit = Object.assign({}, row)
      this.assetFormEdit.index = index
      this.footVisible = false
    },
    deleteRow(index, row) {
      deleteSingleHost(row.id).then( response => {
        if (response.data['code'] !== 0) {
          throw response
        }
        this.$message({type: 'success', message: '删除成功!'})
        this.flushHost()
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    },
    // 获取风险值，脆弱值
    showVt(index,row){
      this.riskFormVisible = true
      getVulThreat(row.id).then(response=>{
        if(response.data['code']!==0){
          throw response
        }
        this.calR_id=row.id
        this.riskForm=res.data['data']
        // this.riskForm.asset_value=res.data['data'].asset_value
        // this.riskForm.threat_value=res.data['data'].threat_value
        // this.riskForm.vulnerability_value=res.data['data'].vulnerability_value
        // this.riskForm.risk_value=res.data['data'].risk_value
      })
    },
    calRiskValue(){
      calRisk(this.calR_id, this.riskForm.asset_value).then(response=>{
        if(response.data['code']!==0){
          throw response
        }
        this.riskForm.risk_value=res.data['data'].risk_value
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
      
    }
  }
}
</script>

<style scoped>
.el-main {
  overflow: hidden;
}

.top-items {
  margin-left: 10px;
}
</style>