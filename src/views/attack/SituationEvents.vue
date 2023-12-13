<template>
  <!-- 态势感知事件表格 -->
  <div>
    <!-- 表格展示 -->
    <el-table :data="tableData" @selection-change="handleSelectionChange"
      style="width: 100%; font-size:15px; height: 100%" border v-loading="loading"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <!-- 基本信息 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="event_type" label="事件类型">
        <template slot-scope="scope">
          <span v-if="scope.row.event_type == 1">DDoS</span>
          <span v-if="scope.row.event_type == 2">Webshell</span>
          <span v-if="scope.row.event_type == 3">僵尸网络</span>
          <span v-if="scope.row.event_type == 4">木马</span>
          <span v-if="scope.row.event_type == 5">蠕虫</span>
          <span v-if="scope.row.event_type == 6">病毒</span>
          <span v-if="scope.row.event_type == 7">SQL注入</span>
          <span v-if="scope.row.event_type == 8">XML注入</span>
          <span v-if="scope.row.event_type == 9">跨站脚本攻击</span>
          <span v-if="scope.row.event_type == 10">端口扫描</span>
          <span v-if="scope.row.event_type == 11">0day/apt</span>
        </template>
      </el-table-column>
      <el-table-column prop="happened_at" label="发生时间"></el-table-column>
      <el-table-column prop="event_info" label="详细信息"></el-table-column>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10]" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="tableTotal">
      </el-pagination>
      <el-button style="position: absolute; top: 0; right: 0;" @click="deleteSelection">批量删除</el-button>
    </div>

  </div>
</template>

<script>
import {
  deleteSituationEventItems,
  getSituationEvents
} from "@/api/abnormal_attack";

export default {
  data() {
    return {
      loading: true,
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
    // 查询态势感知事件
    getSituationEvents() {
      getSituationEvents(this.currentPage, this.pageSize, "", "", "")
        .then((response) => {
          var tempList = []
          if (response.data['data'].length > 0) {
            response.data["data"].map((item) => {
              // 将item解析并push到list中
              tempList.push({
                id: item.pk,
                event_type: item['fields']["event_type"],
                happened_at: item['fields']["happened_at"],
                event_info: item['fields']["event_info"],
              })
            })
            this.tableData = tempList
            this.tableTotal = response.data['total']
          }
        }).catch((response) => {
          this.$message.error(response.data.msg);
        }).finally()
    },
    // 删除单个态势感知事件
    deleteRow(index, row) {
      var delete_ids = []
      delete_ids.push(row.id)
      deleteSituationEventItems(delete_ids.toString()).
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

    // 批量删除态势感知事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteSelection() {
      if (this.multipleSelection.length > 0) {
        var list = []
        this.multipleSelection.forEach(row => {
          list.push(row.id)
        });
        deleteSituationEventItems(list.toString()).
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
      this.getSituationEvents()
      this.loading = false
    },
  },
  computed: {
  }
}
</script>
