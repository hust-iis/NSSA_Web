<template>
  <div>
    <el-form label-position="right" :model="info" label-width="6vw">

      <el-row>
        <el-form-item label="文本">
          <el-input v-model="info.text"></el-input>
        </el-form-item>
      </el-row>

      <el-row v-if="data.elementType === 'node'">
        <el-form-item label="IP">
          <el-input v-model="info.ip"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <div style="text-align:right;">
      <el-button @click="$emit('canceled')">取 消</el-button>
      <el-button type="primary" @click="submit">{{ !readOnly? '确 定' : '编 辑' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopologyNodeSetForm",
  props: {
    readOnly: { // 是否只读
      type: Boolean,
      default: false
    },
    data: { // 提供的表单原始数据
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.info = JSON.parse(JSON.stringify(this.data))
  },
  watch: {
    data(val, old) { // 监听原始数据变化
      this.info = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    submit(){
      if(this.readOnly) {
        this.$emit('update:readOnly', false)
      } else {
        this.$emit('set', this.info)
      }
    }
  },
  data: ()=>{
    return {
      info: {}
    }
  }
}
</script>

<style scoped>

</style>