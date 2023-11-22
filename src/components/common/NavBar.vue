<template>
  <div class="nav-bar">
    <el-row type="flex" justify="space-between">
      <el-col :span="6"><slot name="left"></slot></el-col>
      <el-col :span="6"><slot name="center"></slot></el-col>
      <el-col :span="6"><slot name="right"></slot></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped lang="stylus">

</style>