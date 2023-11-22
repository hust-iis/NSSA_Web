<template>
  <el-container>
    <el-aside v-if="!disableAside" width="200px"><slot name="sidebar"></slot></el-aside>
    <el-container>
      <el-header><slot name="buttons"></slot></el-header>
      <el-main><slot name="table"></slot></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "AssetLayout",
  props: {
    disableAside: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>