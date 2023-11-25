<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 表格本体 -->
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" label="标题" ></el-table-column>
      <el-table-column prop="category" label="类别"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="createDate" label="创建日期"></el-table-column>
      <el-table-column prop="lastUpdateDate" label="最后更新日期"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="small">查看详情</el-button>
          <el-button @click="deleteItem(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页器 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="tableData.length"
      layout="sizes, prev, pager, next, jumper"></el-pagination>
    <!-- 详情弹窗 -->
    <el-dialog :visible="showDetailDialog" title="详情" @close="closeDetailDialog">
      <el-form :model="selectedDetail" :readonly="true" label-position="top">
        <el-form-item label="index">
          <el-input v-model="selectedDetail.index" readonly></el-input>
        </el-form-item>
        <el-form-item label="title">
          <el-input v-model="selectedDetail.title" readonly></el-input>
        </el-form-item>
        <el-form-item label="category">
          <el-input v-model="selectedDetail.category" readonly></el-input>
        </el-form-item>
        <el-form-item label="type">
          <el-input v-model="selectedDetail.type" readonly></el-input>
        </el-form-item>
        <el-form-item label="author">
          <el-input v-model="selectedDetail.author" readonly></el-input>
        </el-form-item>
        <el-form-item label="createDate">
          <el-input v-model="selectedDetail.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="lastUpdateDate">
          <el-input v-model="selectedDetail.lastUpdateDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="detail">
          <el-input v-model="selectedDetail.detail" type="textarea" rows="4" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      currentPage: 1,
      pageSize: 10,
      tableData: [
        {
          index: 1,
          title: '国产密码管理政策',
          category: '政策',
          type: '政策法规',
          author: '国家密码管理局',
          createDate: '2020-05-01',
          lastUpdateDate: '2021-09-15',
        },
        {
          index: 2,
          title: '国产密码法律解读',
          category: '法律',
          type: '政策法规',
          author: '法律专家',
          createDate: '2019-12-10',
          lastUpdateDate: '2021-08-20',
        },
        {
          index: 3,
          title: '国产密码算法标准',
          category: '标准',
          type: '政策法规',
          author: '国家密码管理局',
          createDate: '2020-03-05',
          lastUpdateDate: '2021-10-01',
        },
        {
          index: 4,
          title: '国产密码应急处置指南',
          category: '指南',
          type: '常用问题',
          author: '国家密码管理局',
          createDate: '2021-01-20',
          lastUpdateDate: '2021-09-30',
        },
        // 其他假数据...
      ],
      showDetailDialog: false, // 控制详情弹窗的显示与隐藏
      selectedDetail: {}, // 存储选中数据的详细信息
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    search() {
      // 向后端发送搜索请求，可以在这里使用 axios 或其他网络请求库发送请求
      // 示例代码：
      // axios.post('/api/search', { keyword: this.searchInput })
      //   .then(response => {
      //     // 处理搜索结果
      //   })
      //   .catch(error => {
      //     // 处理错误
      //   });
      console.log('发送搜索请求');
    },
    viewDetail(row) {
      this.selectedDetail = row; // 将选中数据的全部信息存储到selectedDetail变量中
      this.showDetailDialog = true; // 打开详情弹窗
    },
    closeDetailDialog() {
      this.showDetailDialog = false; // 关闭详情弹窗
    },
    deleteItem(row) {
      // 处理删除操作
      console.log('删除', row);
    },
  },
};
</script>