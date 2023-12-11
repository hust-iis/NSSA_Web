<template>
  <div>
    <!-- 搜索栏 -->
    <el-input style="width: 450px" @keyup.enter.native="search" class="top-items" v-model="searchContent"
      placeholder="筛选支持字段：发生时间,来源,目标,详细信息">
      <el-button slot="append" icon="el-icon-search" @click="getAbnormalTraffics"></el-button>
    </el-input>
    <!-- 表格展示 -->
    <el-table :data="tableData" @selection-change="handleSelectionChange"
      style="width: 100%; font-size:15px; height: 100%" border v-loading="loading"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <!-- 基本信息 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="type" label="事件类型" :filters="[
        { text: 'DDoS', value: 0 },
        { text: 'Webshell', value: 1 },
        { text: '僵尸网络', value: 2 },
        { text: '木马', value: 3 },
        { text: '蠕虫', value: 4 },
        { text: '病毒', value: 5 },
        { text: 'SQL注入', value: 6 },
        { text: 'XML注入', value: 7 },
        { text: '跨站脚本攻击', value: 8 },
        { text: '端口扫描', value: 9 },]" :filter-method="filterHandler">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">DDoS</span>
          <span v-if="scope.row.type == 1">Webshell</span>
          <span v-if="scope.row.type == 2">僵尸网络</span>
          <span v-if="scope.row.type == 3">木马</span>
          <span v-if="scope.row.type == 4">蠕虫</span>
          <span v-if="scope.row.type == 5">病毒</span>
          <span v-if="scope.row.type == 6">SQL注入</span>
          <span v-if="scope.row.type == 7">XML注入</span>
          <span v-if="scope.row.type == 8">跨站脚本攻击</span>
          <span v-if="scope.row.type == 9">端口扫描</span>
          <span v-if="scope.row.type == 10">0day/apt</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="发生时间"></el-table-column>
      <el-table-column prop="src_ip" label="来源"></el-table-column>
      <el-table-column prop="dst_ip" label="目标"></el-table-column>
      <el-table-column prop="detail" label="详细信息"></el-table-column>
      <!-- 操作按钮 -->
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
    <div style="position: relative;">
      <!-- 底部分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal">
      </el-pagination>
      <el-button style="position: absolute; top: 0; right: 0;" @click="deleteSelection">批量删除</el-button>
    </div>

  </div>
</template>
  
<script>
import {
  getTraffics,
  delTraffic,
  delTraffics,
} from "@/api/abnormal_attack";

export default {
  data() {
    return {
      loading: true,
      searchContent: '',
      currentPage: 1,
      pageSize: 10,
      tableTotal: 0,
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.flushHost()
  },
  methods: {
    // 查询异常流量事件
    getAbnormalTraffics() {
      getTraffics(this.currentPage, this.pageSize, this.searchContent)
        .then((response) => {
          var tempList = []
          response.data["data"]['traffic'].map((item) => {
            // 将item解析并push到list中
            tempList.push({
              id: item["id"],
              type: item["type"],
              time: item["time"],
              src_ip: item["src_ip"],
              dst_ip: item["dst_ip"],
              detail: item["detail"],
            })
          })
          this.tableData = tempList
          this.tableTotal = response.data["data"]['count']
        }).catch((response) => {
          this.$message.error(response.data.msg);
        }).finally()
    },
    // 删除单个异常流量事件
    deleteRow(index, row) {
      delTraffic(row.id).
        then(response => {
          if (response.data['code'] !== 0) {
            throw response
          }
          this.$message({ type: 'success', message: '删除成功!' })
          this.flushHost()
        }).catch(response => {
          this.$message.error('error: ' + response.data.msg)
        })
    },
    // 批量删除异常流量事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // FIXME:批量删除异常流量事件
    deleteSelection() {
      if (this.multipleSelection.length > 0) {
        var list = []
        this.multipleSelection.forEach(row => {
          list.push(row.id)
        });
        delTraffic(list.toString()).
          then(response => {
            if (response.data['code'] !== 0) {
              throw response
            }
            this.$message({ type: 'success', message: '删除成功!' })
            this.flushHost()
          }).catch(response => {
            this.$message.error('error: ' + response.data.msg)
          })
      }
    },
    // 按类型筛选
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
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
      this.getAbnormalTraffics()
      this.loading = false
    },
  },
  computed: {
  }
}
</script>
  