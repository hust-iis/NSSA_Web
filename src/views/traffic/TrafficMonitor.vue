<template>
    <div>
        <el-container>
            <el-header height="60px">流量监测图</el-header>


            <el-main style="overflow: hidden;">
                <div id="myEcharts" style="width:1000px; height:500px"></div>
                
                <!-- <el-row>
            <span>总体威胁事件</span>
            <el-button @click="getNewestInfo">获取最新数据</el-button>
        </el-row>
        <div id="threatChart" style="width:1000px; height:500px"></div> -->

            </el-main>

        </el-container>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getFlow } from "@/api/traffic_monitor";
export default {
    name: "TrafficMonitor",
    data() {
        return {
            interval: 0,
            interval2: 0,
            myEcharts: null,
            myEcharts2:null,
        }
    },
    methods: {
        initChart() {
            let chart = echarts.init(document.getElementById("myEcharts"))
            var app = {};
            var option;
            let step = 2000;
            let endT = Date.now() / 1000;
            let startT = (Date.now() - step * 10) / 1000
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
            //这里写入请求数据
            let data = [];
            getFlow(startT, endT, step / 1000).then(response => {
                if (response.data['code'] !== 0) {
                    throw response
                }
                for (const item of response.data['data'].total_packets) {
                    console.log(item)
                    data.push(item.packets)
                }

            })
            // .catch(response => {
            //     this.$message.error('error: ' + response.data.msg)
            //     this.loading = false
            // })

            //原来的部分
            // len = 10;
            // while (len--) {
            //     data.push(Math.round(Math.random() * 1000));
            // }
            //
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
                        max: 200,
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
                    // {
                    // name: 'Dynamic Line',
                    // type: 'line',
                    // data: data2
                    // }
                ]
            };
            app.count = 11;
            this.interval = setInterval(function () {
                let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
                //这里是新加入的数据，在这里进行axios请求就好了
                data.shift();
                endT = Date.now()
                startT = (endT - step * 10) / 1000
                endT = endT / 1000
                getFlow(startT, endT, step / 1000).then(response => {
                    if (response.data['code'] !== 0) {
                        throw response
                    }
                    for (const item of response.data['data'].total_packets) {
                        console.log(item)
                        data.push(item.packets)
                    }
                    data.push(response.data['data'].total_packets[9].packets)
                })
                // .catch(response => {
                //     this.$message.error('error: ' + response.data.msg)
                //     this.loading = false
                // })
                // data.push(Math.round(Math.random() * 1000));
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
            }, 2000);

            option && chart.setOption(option);
            this.myEcharts = chart;
        },
        
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        console.log('unmount: ', this.interval)
        this.myEcharts.dispose();
        clearInterval(this.interval);
        
    },
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