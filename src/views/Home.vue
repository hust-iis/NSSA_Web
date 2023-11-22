<template>
  <div class="home">
    <el-container class="inner">
      <el-header class="home-header"><main-nav-bar class="home-header__nav"></main-nav-bar></el-header>
      <el-main class="home-main"><main-menu></main-menu></el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainNavBar from "@/components/content/MainNavBar";
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'Home',
  components: {
    MainNavBar,
    MainMenu
  }
}
</script>

<style scoped lang="stylus">
.home
  width 100%
  height 100%
  padding 0
  position fixed
  background-image url("../assets/img/global.jpg")
  background-size 100% 100%
  z-index 1

.home:after
  content: ''
  height 100%
  width 100%
  position absolute
  left 0
  top 0
  background inherit
  //filter: blur(2px)
  z-index 2

.inner
  //background rgba(255,255,255,0.4)
  position absolute
  width 100%
  height 100%
  z-index 10

// 顶栏样式
.home-header
  position relative

  height 90px !important
  background-image url("../assets/img/home-top.jpg")
  background-size 100% 100%

.home-header__nav
  position relative
  top 20%

// 主体样式
.home-main
  margin-top 4vh
</style>
