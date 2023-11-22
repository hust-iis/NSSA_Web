<template>
  <div>
    <el-form label-position="right" :model="equipment" label-width="6vw">

      <el-row>
        <el-form-item label="设备类型">
          <el-select v-model="equipment.type" placeholder="请选择设备类型">
            <el-option label="网络设备" value="网络设备"></el-option>
            <el-option label="工控设备" value="工控设备"></el-option>
            <el-option label="安全设备" value="安全设备"></el-option>
            <el-option label="服务器设备" value="服务器设备"></el-option>
            <el-option label="其他设备" value="其他设备"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="设备图标">
          <image-select v-model="equipment.icon" :images="icons"></image-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="设备名称">
          <el-input v-model="equipment.name" style="width: 60%"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="设备描述">
          <el-input v-model="equipment.descrip" style="width: 80%"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <div style="text-align:right;">
      <el-button @click="$emit('canceled')">取 消</el-button>
      <el-button type="primary" @click="submit">添 加</el-button>
    </div>
  </div>
</template>

<script>
import { addEquipment } from "@/api/topo";
import ImageSelect from "@/components/common/ImageSelect";

export default {
  name: "EquipmentAddForm",
  components: {ImageSelect},
  props: {
    icons: Array
  },
  methods: {
    submit() {
      addEquipment(this.equipment).then(response => {
        this.$message.success("添加成功");
        this.$emit('success', response.data.data.EquipmentList)
      }).catch(response => {
        this.$message.error("添加失败: " + response.data.msg)
      });
    },
    // 选择ICon
    changeIcon(e) {
      this.$refs["selectIconRef"].$el.children[0].setAttribute(
          "style",
          "background:url(" +
          e +
          ") no-repeat;color:#fff;text-indent: -9999px;background-position: 30% center;background-size:contain;background-size:35px;"
      );
    }
  },
  data: ()=>{
    return {
      equipment: {
        type: null,
        icon: null,
        name: '',
        descrip: '',
      },
      imageUrl: ''
    }
  },
  computed: {
    equipmentIcon() {
      return this.icons
    }
  }
}
</script>

<style scoped>

</style>