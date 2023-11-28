<template>
  <div>
    <!-- 搜索栏 -->
    <el-input style="width: 450px" @keyup.enter.native="search" class="top-items" v-model="searchContent"
      placeholder="筛选支持字段：资产IP,资产名称,异常信息,发现事件">
      <el-button slot="append" icon="el-icon-search" @click="getAbnormalHosts"></el-button>
    </el-input>
    <!-- 表格展示 -->
    <el-table :data="tableData" @selection-change="handleSelectionChange"
      style="width: 100%; font-size:15px; height: 100%" border v-loading="loading"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <!-- 基本信息 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="ip" label="资产IP"></el-table-column>
      <el-table-column prop="name" label="资产名称"></el-table-column>
      <el-table-column prop="detail" label="异常信息"></el-table-column>
      <el-table-column prop="time" label="发现事件"></el-table-column>
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
  getHosts,
  delHosts,
  delHost,
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
    // 查询异常主机事件
    getAbnormalHosts() {
      getHosts(this.currentPage, this.pageSize, this.searchContent)
        .then((response) => {
          var tempList = []
          response.data["data"]['host'].map((item) => {
            // 将item解析并push到list中
            tempList.push({
              id: item["id"],
              ip: item["ip"],
              name: item["name"],
              detail: item["detail"],
              time: item["time"],
            })
          })
          this.tableData = tempList
          this.tableTotal = response.data["data"]['count']
        }).catch((response) => {
          this.$message.error(response.data.msg);
        }).finally()
    },
    // 删除单个异常主机事件
    deleteRow(index, row) {
      delHost(row.id).
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

    // 批量删除异常主机事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // FIXME: 批量删除异常主机事件
    deleteSelection() {
      if (this.multipleSelection.length > 0) {
        var list = []
        this.multipleSelection.forEach(row => {
          list.push(row.id)
        });
        delHosts(list.toString()).
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
      this.getAbnormalHosts()
      this.loading = false
    },
  },
  computed: {
  }
}
</script>
  