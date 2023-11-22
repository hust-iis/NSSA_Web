<template>
  <div>
    <el-form label-position="right" :model="info" label-width="6vw">

      <el-row>
        <el-form-item label="网段">
          <el-input v-model="info.net" placeholder="请输入目标网段（格式：x.x.x.x/x）"></el-input>
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
import {
  getNetTopologyByNetSeg,
} from "@/api/topo";
export default {
  name: "TopoGenByNetForm",
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
        getNetTopologyByNetSeg(this.info).then(response => {
          this.$message.success("拓扑图生成成功");
          this.$emit('success')
        }).catch(response => {
          this.$message.error("生成失败: " + response.data.msg)
        });
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