<template>
  <el-select
      v-model="selectValue"
      ref="selectIconRef"
      :placeholder="placeholder"
      class="select-outer"
  >
    <template v-slot:empty>
      <div class="dropdown-container">
        <p v-if="images.length === 0" style="color: #606266">暂无图片</p>

        <!-- 下拉框主体-->
        <div class="dropdown-grid-view">
          <div v-for="image in images" class="dropdown-item" @click.prevent="handleSelectImage(image)">
            <img :src="image" class="dropdown-image" alt="image"/>
          </div>
        </div>

      </div>
    </template>
  </el-select>
</template>

<script>
export default {
  name: "ImageSelect",
  model: {
    prop: 'selectedImage',
    event: 'select'
  },
  props: {
    images: {
      required: true,
      type: Array,
      default: []
    },
    placeholder: String,
    selectedImage: String // 用于v-model绑定
  },
  data() {
    return {
      selectValue: '' // 无用
    }
  },
  methods: {
    handleSelectImage(image) {
      this.$refs["selectIconRef"].blur()
      this.$emit('select', image) // 发出修改事件，令父组件来更新选中图片selectedImage
    },
    // 选择Image
    changeImage(image) {
      this.$refs["selectIconRef"].$el.children[0].setAttribute(
          "style",
          "background:url(" +
          image +
          ") no-repeat;color:#fff;text-indent: -9999px;background-position: 30% center;background-size:contain;background-size:35px;"
      );
    }
  },
  watch: {
    selectedImage(val, old) {
      this.changeImage(val)
    }
  }
}
</script>

<style scoped>
.select-outer {
  width: 100px;
}

/* Grid布局项目 即每张图片整体样式 */
.dropdown-item {
  cursor: pointer;
  padding: 3px;

  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px transparent solid;
  transition: all .125s ease-in-out;
}
.dropdown-item:hover {
  border: 1px #409eff solid;
  box-shadow: 0 0 1px 1px #60aeff, 0 0 1px #60aeff inset;
}

/* 单个图片 */
.dropdown-image {
  width: 32px;  /* = dropdown-item.width */
  height: 32px; /* = dropdown-item.height */
}

/* 下拉菜单Grid布局 */
.dropdown-grid-view {
  display: grid;

  grid-template-columns: repeat(4, 36px); /* 每行项目(图片)个数 = 4 */ /* = dropdown-item.width + .border + .padding */
  grid-template-rows: repeat(auto-fill, 36px); /* = dropdown-item.height + .border + .padding */

  grid-gap: 10px 10px;
}

/* 下拉菜单包裹块 */
.dropdown-container {
  width: 180px; /* >= 36 * 4 + 10 * 3 */ /* >= dropdown-grid-view.grid-template-columns * 4 + grid-gap * 3 */
  max-height: 100px;
  overflow: auto;
  overflow-x: hidden;

  padding: 10px;

/* firefox滑块设置 */
  scrollbar-color: rgba(228, 228, 228, 0.7) transparent;
  scrollbar-width: thin;
}
/* 其它浏览器滑块设置 */
.dropdown-container::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(228, 228, 228, 0.7);
} /* 滑块颜色 */
.dropdown-container::-webkit-scrollbar-thumb:hover {
  background-color: #cecece;
} /* 滑块鼠标经过颜色 */
.dropdown-container::-webkit-scrollbar-thumb:active {
  background-color: #b8b8b8;
} /* 滑块鼠标摁下颜色 */
.dropdown-container::-webkit-scrollbar {
  width: 10px;
}
.dropdown-container::-webkit-scrollbar-track {
  background-color: transparent;
} /* 滚动条的滑轨背景颜色 */
</style>