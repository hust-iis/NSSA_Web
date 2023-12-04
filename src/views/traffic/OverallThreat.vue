<template>
    <div>
      <el-container>
        <el-header height="60px">总体威胁事件</el-header>
        
        <el-main style="overflow: hidden;">
            <el-row>
                <span>总体威胁事件</span>
                <el-button @click="getNewestInfo">获取最新数据</el-button>
            </el-row>
            <div id="threatChart" style="width:1000px; height:500px"></div>
        
        </el-main>
        
      </el-container>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  import { getOverallThreat } from "@/api/traffic_monitor";
  import {onMounted, onUnmounted} from "vue";
  export default {
    name: "OverallThreat",
    setup(){
          let threatChart=echarts
          // let chart=threatChart.init(document.getElementById("threatChart"))
          onMounted(() => {
            initThreatChart();
          });
  
          onUnmounted(() => {
              threatChart.dispose;
          });
          function initThreatChart(){
              let chart=threatChart.init(document.getElementById("threatChart"))
              var option;
              setTimeout(function () {
                  // 我新加的
              let now = new Date();
              let dateList = [];
              let len = 7;
              while (len--) {
                  dateList.unshift(now.toLocaleDateString());
                  now = new Date(+now - 3600*1000*24);
              }
              dateList.unshift('异常攻击类型')
              // console.log(dateList)
              let overall_data=[]
              getOverallThreat().then(response => {
                if (response.data['code'] !== 0) {
                    throw response
                }
                overall_data=response.data['data'].all_daily_counts
            }).catch(response => {
                this.$message.error('error: ' + response.data.msg)
                this.loading = false
            })
              
              //新加部分结束
              option = {
                  legend: {},
                  tooltip: {
                  trigger: 'axis',
                  showContent: false
                  },
                  //在这里进行axios数据请求就行
                  dataset: {
                  source: [
                      dateList,
                      overall_data[0],
                      overall_data[1],
                      overall_data[2],
                      overall_data[3],
                      overall_data[4],
                      overall_data[5],
                      overall_data[6],
                    //   ['木马蠕虫', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1,34],
                    //   ['异常流量', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7,45],
                    //   ['异常用户行为', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5,56],
                    //   ['DoS攻击', 25.2, 37.1, 41.2, 18, 33.9, 49.1,11]
                  ]
                  },
                  xAxis: { type: 'category' },
                  yAxis: { gridIndex: 0 },
                  grid: { top: '55%' },
                  series: [
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'pie',
                      id: 'pie',
                      seriesLayoutBy: 'row',
                      radius: '30%',
                      center: ['50%', '25%'],
                      emphasis: {
                      focus: 'self'
                      },
                      label: {
                      formatter: '{b}: {@2012} ({d}%)'
                      },
                      encode: {
                      itemName: '异常攻击类型',
                      value: '2012',
                      tooltip: '2012'
                      }
                  }
                  ]
              };
              chart.on('updateAxisPointer', function (event) {
                  const xAxisInfo = event.axesInfo[0];
                  if (xAxisInfo) {
                  const dimension = xAxisInfo.value + 1;
                  chart.setOption({
                      series: {
                      id: 'pie',
                      label: {
                          formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                      },
                      encode: {
                          value: dimension,
                          tooltip: dimension
                      }
                      }
                  });
                  }
              });
              chart.setOption(option);
              });
              option && chart.setOption(option);
  
          }
          function getNewestInfo(){
              let chart=threatChart.init(document.getElementById("threatChart"))
              var option;
              setTimeout(function () {
                  // 我新加的
              let now = new Date();
              let dateList = [];
              let len = 7;
              while (len--) {
                  dateList.unshift(now.toLocaleDateString());
                  now = new Date(+now - 3600*1000*24);
              }
              dateList.unshift('异常攻击类型')
              let att1 = [];
              len = 8;
              while (len--) {
                  att1.push(Math.round(Math.random() * 10));
              }
              att1.unshift('木马蠕虫')
              let att2 = [];
              len = 8;
              while (len--) {
                  att2.push(Math.round(Math.random() * 10));
              }
              att2.unshift('异常流量')
              let att3 = [];
              len = 8;
              while (len--) {
                  att3.push(Math.round(Math.random() * 10));
              }
              att3.unshift('异常用户行为')
              let att4 = [];
              len = 8;
              while (len--) {
                  att4.push(Math.round(Math.random() * 10));
              }
              att4.unshift('DoS攻击')
              
              //新加部分结束
              option = {
                  legend: {},
                  tooltip: {
                  trigger: 'axis',
                  showContent: false
                  },
                  //在这里进行axios数据请求就行
                  dataset: {
                  source: [
                      dateList,
                      att1,att2,att3,att4
                  ]
                  },
                  xAxis: { type: 'category' },
                  yAxis: { gridIndex: 0 },
                  grid: { top: '55%' },
                  series: [
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'line',
                      smooth: true,
                      seriesLayoutBy: 'row',
                      emphasis: { focus: 'series' }
                  },
                  {
                      type: 'pie',
                      id: 'pie',
                      radius: '30%',
                      center: ['50%', '25%'],
                      emphasis: {
                      focus: 'self'
                      },
                      label: {
                      formatter: '{b}: {@2012} ({d}%)'
                      },
                      encode: {
                      itemName: '异常攻击类型',
                      value: '2012',
                      tooltip: '2012'
                      }
                  }
                  ]
              };
              chart.on('updateAxisPointer', function (event) {
                  const xAxisInfo = event.axesInfo[0];
                  if (xAxisInfo) {
                  const dimension = xAxisInfo.value + 1;
                  chart.setOption({
                      series: {
                      id: 'pie',
                      label: {
                          formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                      },
                      encode: {
                          value: dimension,
                          tooltip: dimension
                      }
                      }
                  });
                  }
              });
              chart.setOption(option);
              });
              option && chart.setOption(option);
  
              
          }
          return{
              initThreatChart,
              getNewestInfo
  
          }
  
      }
  }
  </script>
      
  <style scoped>
  .el-header {
    padding: 0;
  }
  
  .el-container {
    overflow: hidden;
  }
  </style>