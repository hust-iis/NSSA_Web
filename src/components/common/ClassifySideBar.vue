<template>
  <el-tree
      :data="classifyData"
      show-checkbox
      node-key="id"
      :default-checked-keys="[0]"
      :props="defaultProps">
  </el-tree>
</template>

<script>
export default {
  name: "ClassifySideBar",
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      classifyData: [{
        id: 0,
        label: '全国',
        children: [{
          id: 1,
          label: '湖北',
          children: [{
            id: 2,
            label: '武汉市',
            children: [{
              id: 3,
              label: '洪山区'
            }, {
              id: 4,
              label: '东西湖区'
            }, {
              id: 5,
              label: '武昌区'
            }, {
              id: 6,
              label: '硚口区'
            }, {
              id: 7,
              label: '江汉区'
            }]
          }]
        }]
      }]
    }
  }
}
</script>

<style scoped>

</style>