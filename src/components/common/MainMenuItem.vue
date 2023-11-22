<template>
  <div class="item">
    <router-link :to="to" target="_blank">
      <div class="item-container">
        <div class="item-picture">
          <img :src="require('../../assets/img/home/'+picture)" class="item-img" alt="">
        </div>
        <div :class="{'item-title': true, 'item-beta': beta}">
          <p><slot/></p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MainMenuItem",
  props: {
    picture: String,
    to: String | Object,
    beta: Boolean // 是否为开发中功能
  }
}
</script>

<style scoped lang="stylus">
// 去除下划线
a
  text-decoration none

.item
  transition transform .45s

.item:hover
  transform scale(1.07, 1.07)

// 单个项目（可点击）
.item-container
  display flex
  align-items center
  margin-bottom 30px

// 项目左侧图标
.item-picture
  padding 10px
  border 2px solid #2677bf
  box-shadow 0 0 8px #2677bf, 0 0 2px #2677bf inset

  background-color: rgba(7, 23, 56, 0.6);

.item-picture img
  width 60px
  height 60px

  border-radius 5px

// 项目文字
.item-title
  position relative
  box-sizing border-box
  width 180px
  height 60px

  border 2px solid #2677bf
  border-left none
  box-shadow 0 0 8px #2677bf, 0 0 2px #2677bf inset
  background-color: rgba(7, 23, 56, 0.4);

  display flex
  align-items center
  justify-content center

.item-title p
  margin 0

  font-size 24px
  color white
  text-align center
  font-weight normal

// Beta版本标识
.item-beta
  position: relative;

.item-beta:after
  content 'beta'
  color #3aab43
  font-family Verdana, Arial, Consolas, Tahoma

  position absolute
  top 0
  right 0

</style>