<template>
  <div>
    <!-- <div style="border-top: 2px solid #EBEEF5; width: 100%; margin-top: -25px"></div>
    <div style="font-weight: bold; margin:10px 0">单位基础信息</div> -->
    <el-form label-position="right" label-width="6vw" class="addUnitForm" :model="unit" :disabled="readOnly">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="车间名称">
            <el-input type="text" v-model="unit.name" placeholder="请输入车间名称"
                      :disabled="type !== 'addUnit' || readOnly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车间简称" label-width="9vw">
            <el-input type="text" v-model="unit.shortened" placeholder="请输入车间简称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产线号码">
            <el-input type="text" v-model="unit.production_number" placeholder="请输入所在产线号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属行业" :required="true">
            <el-select v-model="value" placeholder="请选择所属行业">
              <el-option
                v-for="item in industry"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" label-width="9vw">
            <el-input
              type="text"
              v-model="unit.uscc"
              placeholder="请输入统一社会信用代码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主管单位">
            <el-input type="text" v-model="unit.competent" placeholder="请输入主管单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监管单位" label-width="9vw">
            <el-input type="text" v-model="unit.regulator" placeholder="请输入监管单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-form-item label="区域" :required="true">
        <el-row>
          <el-col :span="6" style="margin-right: 20px">
            <el-select v-model="value" placeholder="省(自治区/直辖市)">
              <el-option
                v-for="item in province"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" style="margin-right: 20px">
            <el-select v-model="value" placeholder="地（区、市、州、盟）">
              <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="value" placeholder="县（区、市、镇）">
              <el-option
                v-for="item in county"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-input type="text" v-model="unit.area" style="margin-top: 10px" placeholder="请输入所在区域"></el-input>
        </el-row>
      </el-form-item> -->

      <!-- <el-row :gutter="20">
        <el-form-item label="经纬度">
          <el-col :span="8"
            ><el-input
              type="text"
              v-model="unit.longitude"
              placeholder="请输入经度"
            ></el-input
          ></el-col>
          <el-col :span="8"
            ><el-input
              type="text"
              v-model="unit.latitude"
              placeholder="请输入纬度"
            ></el-input
          ></el-col>
          <el-col :span="8"
            ><i class="el-icon-location" style="font-size: 25px"></i>
          </el-col>
        </el-form-item>
      </el-row> -->

      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位快照">
            <i class="el-icon-camera-solid" style="font-size: 66px"></i>
            <input type="file" name="file" accept=".jpg,.png" class="el-upload__input">    
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="网站数量">
            <el-input
              type="text"
              v-model="unit.web_number"
              placeholder="请输入网站数量"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP数量" label-width="9vw" >
            <el-input type="text" v-model="unit.ip_number" placeholder="请输入IP数量" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 联系人信息 -->
    <!-- <div style="font-weight: bold; margin-bottom: 10px">
      联系人信息 <i class="el-icon-question"></i>
    </div>
    <el-form
      label-position="right"
      label-width="6vw"
      class="contactInfoForm"
    >
      <el-table :data="contactTableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="post" label="职务" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="120">
        </el-table-column>
        <el-table-column prop="contact" label="默认联系人">
        </el-table-column>
        <el-table-column prop="add" label="+" align = "center">
          <el-button></el-button>
        </el-table-column>
      </el-table>

      <div style="font-size: 10px; margin-top: 10px; margin-left: 60%">
        <span class="el-pagination__total">共 0 条</span>
        <button type="button" disabled="disabled" class="btn-prev">
          <i class="el-icon el-icon-arrow-left"></i>
        </button>
        <ul class="el-pager">
          <li class="number active">1</li>
        </ul>
        <button type="button" disabled="disabled" class="btn-next">
          <i class="el-icon el-icon-arrow-right"></i>
        </button>
        <span class="el-pagination__jump"
          >前往
          <div class="el-input el-pagination__editor is-in-pagination">
            <input
              type="number"
              autocomplete="off"
              min="1"
              max="1"
              class="el-pagination-input__inner"
              style="width: 30px"
            />
          </div>
          页
        </span>
      </div>
    </el-form> -->

    <!-- 探针设备 -->
    <!-- <div style="font-weight: bold; margin-top: 35px" >
      探针设备 <i class="el-icon-question"></i>
    </div>
    <el-form
      label-position="right"
      label-width="6vw"
      class="equipmentInfoForm"
    >
      <el-table :data="equipmentTableData" border style="width: 100%">
        <el-table-column prop="num" label="序列号" width="120">
        </el-table-column>
        <el-table-column prop="ip" label="IP" width="120">
        </el-table-column>
        <el-table-column prop="type" label="设备类型" width="120">
        </el-table-column>
        <el-table-column prop="site" label="部署位置" width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="add" label=" +" align = "center">
        </el-table-column>
      </el-table>
    </el-form>
    <div style="font-size: 10px; margin-top: 10px; margin-left: 60%">
      <span class="el-pagination__total">共 0 条</span>
      <button type="button" disabled="disabled" class="btn-prev">
        <i class="el-icon el-icon-arrow-left"></i>
      </button>
      <ul class="el-pager">
        <li class="number active">1</li>
      </ul>
      <button type="button" disabled="disabled" class="btn-next">
        <i class="el-icon el-icon-arrow-right"></i>
      </button>
      <span class="el-pagination__jump"
        >前往
        <div class="el-input el-pagination__editor is-in-pagination">
          <input
            type="number"
            autocomplete="off"
            min="1"
            max="1"
            class="el-pagination-input__inner"
            style="width: 30px"
          />
        </div>
        页
      </span>
    </div> -->
    <div style="text-align:right;">
      <el-button round @click="$emit('canceled')">取消</el-button>
      <el-button type="primary" round @click="submit">{{ this.type === "addUnit"? '添加' : (!readOnly? '提交' : '编辑') }}</el-button>
    </div>
  </div>
</template>

<script>
import {
  changeSingleUnit,
  addUnit
} from "@/api/unit";
export default {
  name: "UnitForm",
  props: {
    readOnly: { // 是否只读
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    },
    data: { // 提供的表单原始数据
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.unit = JSON.parse(JSON.stringify(this.data))
  },
  watch: {
    data(val, old) { // 监听原始数据变化
      this.unit = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    submit(){
      if (this.type === "addUnit") {
        addUnit(this.unit).then(response => {
          this.$message.success("添加成功");
          this.$emit('success')
        }).catch(response => {
          this.$message.error("添加失败: " + response.data.msg)
        });
      } else if(this.readOnly) {
        this.$emit('update:readOnly', false)
      } else {
        changeSingleUnit(this.unit).then(response => {
          this.$message.success("修改成功");
          this.$emit('success')
        }).catch(response => {
          this.$message.error("修改失败: " + response.data.msg)
        });
      }
    }
  },
  data: ()=>{
    return {
      unit: {},
    }
  }
}
</script>

<style scoped>

</style>