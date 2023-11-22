<template>
    <el-container>
        <el-header>
            <el-row>流量变化图</el-row>

        </el-header>
        <el-main>
            <div id="myEcharts" style="width:1000px; height:500px"></div>
            <el-row>
                <span>总体威胁事件</span>
                <el-button @click="getNewestInfo">获取最新数据</el-button>
            </el-row>
            <div id="threatChart" style="width:1000px; height:500px"></div>
        </el-main>
    </el-container>
  
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios'
import {onMounted, onUnmounted} from "vue";
export default {
    name:'TrafficMonitor',
    setup(){
        let myEcharts = echarts;
        let threatChart=echarts
        // let chart=threatChart.init(document.getElementById("threatChart"))
        onMounted(() => {
            initChart();

            initThreatChart();
        });

        onUnmounted(() => {
            myEcharts.dispose;
            threatChart.dispose;
        });
        function initChart(){
            let chart=myEcharts.init(document.getElementById("myEcharts"))
            var app = {};
            var option;

            let now = new Date();
            let categories = [];
            let len = 10;
            while (len--) {
                categories.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(+now - 2000);
            }
            let categories2 = [];
            len = 10;
            while (len--) {
                categories2.push(10 - len - 1);
            }
            let data = [];
            len = 10;
            while (len--) {
                data.push(Math.round(Math.random() * 1000));
            }
            let data2 = [];
            len = 0;
            while (len < 10) {
                data2.push(+(Math.random() * 10 + 5).toFixed(1));
                len++;
            }
            option = {
            title: {
                text: 'Dynamic Data'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
                }
            },
            legend: {},
            toolbox: {
                show: true,
                feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: true,
                data: categories
                },
                {
                type: 'category',
                boundaryGap: true,
                data: categories2
                }
            ],
            yAxis: [
                {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
                },
                {
                type: 'value',
                scale: true,
                name: 'Order',
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                name: 'Dynamic Bar',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data
                },
                {
                name: 'Dynamic Line',
                type: 'line',
                data: data2
                }
            ]
            };
            app.count = 11;
            setInterval(function () {
                let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
                //这里是新加入的数据，在这里进行axios请求就好了
                data.shift();
                data.push(Math.round(Math.random() * 1000));
                data2.shift();
                data2.push(+(Math.random() * 10 + 5).toFixed(1));
                categories.shift();
                categories.push(axisData);
                categories2.shift();
                categories2.push(app.count++);
                chart.setOption({
                    xAxis: [
                    {
                        data: categories
                    },
                    {
                        data: categories2
                    }
                    ],
                    series: [
                    {
                        data: data
                    },
                    {
                        data: data2
                    }
                    ]
                });
            }, 2100);

            option && chart.setOption(option);


        }
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
                    ['木马蠕虫', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1,34],
                    ['异常流量', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7,45],
                    ['异常用户行为', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5,56],
                    ['DoS攻击', 25.2, 37.1, 41.2, 18, 33.9, 49.1,11]
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
            initChart,
            initThreatChart,
            getNewestInfo

        }

    }

}
</script>

<style>

</style>