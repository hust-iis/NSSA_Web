<template>
  <div class="menu">
    <div class="list">
      <!-- 资产 -->
      <div class="title">
        <span class="title-front" style="border: 1px solid red">&nbsp;</span>
        <img class="title-icon" style="width: 24px; height: 24px" src="@/assets/img/home/title-resource.png" alt="">
        <p class="title-text">资产中心</p>
      </div>
      <div class="group">
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">车间管理</main-menu-item>
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">产线管理</main-menu-item>
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">资产管理</main-menu-item>
      </div>
      <!-- 异常攻击发现 -->
      <div class="title">
        <span class="title-front" style="border: 1px solid red">&nbsp;</span>
        <img class="title-icon" style="width: 24px; height: 24px" src="@/assets/img/home/title-resource.png" alt="">
        <p class="title-text">异常攻击发现</p>
      </div>
      <div class="group">
        <main-menu-item to="/abnormal_attack/traffic" picture="item-asset-scan.png">异常流量感知</main-menu-item>
        <main-menu-item to="/abnormal_attack/user" picture="item-asset-scan.png">异常用户监测</main-menu-item>
        <main-menu-item to="/abnormal_attack/host" picture="item-asset-scan.png">异常主机监测</main-menu-item>
      </div>
      <!-- 违规行为检测 -->
      <div class="title">
        <span class="title-front" style="border: 1px solid red">&nbsp;</span>
        <img class="title-icon" style="width: 24px; height: 24px" src="@/assets/img/home/title-resource.png" alt="">
        <p class="title-text">违规行为检测</p>
      </div>
      <div class="group">
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">智能学习名单</main-menu-item>
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">违规行为记录</main-menu-item>
      </div>
      <!-- 流量监测 -->
      <div class="title">
        <span class="title-front" style="border: 1px solid red">&nbsp;</span>
        <img class="title-icon" style="width: 24px; height: 24px" src="@/assets/img/home/title-resource.png" alt="">
        <p class="title-text">流量检测</p>
      </div>
      <div class="group">
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">流量检测</main-menu-item>
      </div>
      <!-- 大数据态势感知 -->
      <div class="title">
        <span class="title-front" style="border: 1px solid red">&nbsp;</span>
        <img class="title-icon" style="width: 24px; height: 24px" src="@/assets/img/home/title-resource.png" alt="">
        <p class="title-text">流量检测</p>
      </div>
      <div class="group">
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">大数据态势分析</main-menu-item>
        <main-menu-item to="/asset/scan" picture="item-asset-scan.png">态势应急响应</main-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import MainMenuItem from "@/components/common/MainMenuItem";
export default {
  name: "MainMenu",
  components: { MainMenuItem }
}
</script>

<style scoped lang="stylus">
// 整体
.menu
  padding-left 5vw

.list
  display flex
  flex-direction column
  align-items flex-start

// 分组标题
.title
  position relative
  height 35px
  color white
  margin-bottom 40px

  display flex
  align-items center

// 分组标题 - 左侧竖线
.title-front
  display inline-block
  height 35px
  width 3px

// 分组标题 - 图标
.title-icon
  display inline-block
  width 25px
  height 25px
  margin-left 16px

// 分组标题 - 文字
.title-text
  position relative
  display inline-block
  font-size 18px
  margin-left 10px

// 单个分组
.group
  display flex
  flex-direction row
  flex-wrap wrap

  margin-bottom 20px

// 项目间距
.group >>> .item:not(:first-child)
  margin-left 100px
</style>