<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="密码方案"></el-table-column>
      <el-table-column prop="product" label="密码产品"></el-table-column>
      <el-table-column prop="host" label="运行主机"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="small">查看详情</el-button>
        </template>
      </el-table-column>
      <!-- 其他列 -->
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
      tableData: [
        {
          name: '全盘系统加密',
          product: 'TPM可信硬件',
          host: '192.168.43.34',
          status: '运行中',
          encryptionInfo: '加密信息A',
          decryptionInfo: '解密信息A',
        },
        {
          name: '文件系统加密',
          product: 'BitLocker文件加密系统',
          host: '192.168.43.34',
          status: '运行中',
          encryptionInfo: '加密信息A',
          decryptionInfo: '解密信息A',
        },
        {
          name: '数据库加密',
          product: 'AWS数据库加密',
          host: '192.168.43.34',
          status: '运行中',
          encryptionInfo: '加密信息A',
          decryptionInfo: '解密信息A',
        },
        {
          name: '前置代理加密',
          product: 'Sock5加密传输',
          host: '192.168.43.34',
          status: '运行中',
          encryptionInfo: '加密信息A',
          decryptionInfo: '解密信息A',
        },
        {
          name: '文件加密',
          product: 'Azure文件加密',
          host: '10.0.0.12',
          status: '已停止',
          encryptionInfo: '加密信息B',
          decryptionInfo: '解密信息B',
        },
        {
          name: '通信加密',
          product: 'TLS通信加密',
          host: '172.16.0.8',
          status: '运行中',
          encryptionInfo: '加密信息C',
          decryptionInfo: '解密信息C',
        },
      ],
      selectedDetail: {}, // 存储选中数据的详细信息
    };
  },
  methods: {
    viewDetail(row) {
      this.selectedDetail = row; // 将选中数据的全部信息存储到selectedDetail变量中
      this.showDetailDialog = true; // 打开详情弹窗
    },
  },
};
</script>