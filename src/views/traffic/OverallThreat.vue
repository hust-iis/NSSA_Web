<template>
  <div>
    <el-container>
      <el-header height="60px">总体威胁事件</el-header>

      <el-main style="overflow: hidden">
        <el-row>
          <el-button @click="flushData">获取最新数据</el-button>
        </el-row>
        <div id="threatChart" style="width: 1100px; height: 500px"></div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import * as echarts from "echarts";
import { getOverallThreat } from "@/api/traffic_monitor";
// import { onMounted, onUnmounted } from "vue";
const defaultOption = {
  legend: {},
  tooltip: {
    trigger: "axis",
    showContent: false,
  },
  //在这里进行axios数据请求就行
  dataset: {
    source: [],
  },
  xAxis: { type: "category" },
  yAxis: { gridIndex: 0 },
  grid: { top: "55%" },
  series: [
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
      color: "#5C3317",
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
      color: "#8E2323",
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
      color: "#2F4F4F",
    },
    {
      type: "pie",
      id: "pie",
      //seriesLayoutBy: "row",
      radius: "30%",
      center: ["50%", "25%"],
      color: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
        "#5C3317",
        "#8E2323",
        "#2F4F4F",
      ],
      emphasis: {
        focus: "self",
      },
      label: {
        formatter: "{b}: {@2012} ({d}%)",
      },
      encode: {
        itemName: "异常攻击类型",
        value: "2012",
        tooltip: "2012",
      },
    },
  ],
};
export default {
  name: "OverallThreat",
  data() {
    return {
      interval: 0,
      threatChart: null
    }
  },
  methods: {
    flushData() {
      // 表头
      let datelist = [];
      let overall_data = [];
      let now = new Date();
      let len = 7; // 向前7天
      while (len--) {
        datelist.unshift(now.toLocaleDateString());
        now = new Date(+now - 3600 * 1000 * 24);
      }
      datelist.unshift("异常攻击类型");
      overall_data.push(datelist);
      // 数据
      getOverallThreat().then((response) => {
        if (response.data["code"] !== 0) {
          throw response;
        }
        let tempData = response.data["data"].attack_type_counts;
        for (let key in tempData) {
          // 将属性名和属性值合并成一个新数组，并添加到结果数组中
          overall_data.push([key, ...tempData[key]]);
        }
        this.threatChart.setOption({
          dataset: {
            source: overall_data,
          }
        });
      }).catch((response) => {
        this.$message.error("error: " + response.data.msg);
        this.loading = false;
      });
    },
    initThreatChart() {
      let chart = echarts.init(document.getElementById("threatChart"));
      chart.setOption(defaultOption);
      chart.on("updateAxisPointer", function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          chart.setOption({
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      this.threatChart = chart;
      this.flushData();
    }

  },
  mounted() {
    this.initThreatChart();
  },
  beforeDestroy() {
    this.threatChart.dispose();
    clearInterval(this.interval)
  },
};
</script>
      
<style scoped>
.el-header {
  padding: 0;
}

.el-container {
  overflow: hidden;
}
</style>