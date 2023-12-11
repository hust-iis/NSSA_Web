<template>
    <div>
        <el-container>
            <el-header height="60px">流量监测图</el-header>

            <el-main style="overflow: hidden;">
                <div id="myEcharts" style="width:1000px; height:500px"></div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getFlow } from "@/api/traffic_monitor";

const defaultOption = {
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
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'IO',
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name: 'IO',
            type: 'line',
            data: []
        },
    ]
};
const step = 1000;

export default {
    name: "TrafficMonitor",
    data() {
        return {
            interval: 0,
            myEcharts: null,
            lastT: Date.now() - step * 10,
            categories: [],
            data: [],
        }
    },
    methods: {
        flushData() {
            //this.data.shift();
            let startT = this.lastT
            let endT = Date.now()
            this.lastT = endT
            getFlow(startT / 1000, endT / 1000, step / 1000).then(response => {
                if (response.data['code'] !== 0) {
                    throw response
                }
                for (const item of response.data['data'].total_packets) {
                    this.data.push(item.packets)
                    this.categories.push(new Date(item.timestamp*1000).toLocaleTimeString().replace(/^\D*/, ''))
                    if(this.data.length >= 30) {
                        this.data.shift()
                        this.categories.shift()
                    }
                }
                this.myEcharts.setOption({
                    xAxis: [
                        {
                            data: this.categories
                        },
                    ],
                    series: [
                        {
                            data: this.data
                        }
                    ]
                });
            }).catch(response => {
                this.$message.error('error: ' + response.data.msg)
            })
        },
        initChart() {
            let chart = echarts.init(document.getElementById("myEcharts"))
            chart.setOption(defaultOption);
            this.myEcharts = chart;
            this.flushData();
            this.interval = setInterval(this.flushData, 2000);
        },
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
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