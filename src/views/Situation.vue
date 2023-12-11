<template>
    <div>
        <el-container>
            <el-header height="60px">大数据态势分析图</el-header>

            <el-main style="overflow: hidden;">
                <div id="myEcharts2" style="width:1000px; height:500px"></div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getBigData } from "@/api/situation";

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
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        data: []
    }],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'APT态势',
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [{
        name: 'APT态势',
        type: 'line',
        data: []
    }]
};

export default {
    name: "Situation",
    data() {
        return {
            categories: [],
            data: [],
            interval: 0,
            myEcharts2: null,
        }
    },
    methods: {
        flushData() {
            // 这里是新加入的数据，在这里进行axios请求就好了
            getBigData().then(response => {
                if (response.data['code'] !== 0) {
                    throw response
                }
                if (this.data.length == 0) {
                    this.data = response.data['data'].situation_value
                }
                this.data.push(response.data['data'].predict_result)
                this.categories = [];
                for (var i = 1; i <= this.data.length; i++) {
                    this.categories.push(i);
                }
                this.myEcharts2.setOption({
                    xAxis: [
                        {
                            data: this.categories
                        }
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
            let chart2 = echarts.init(document.getElementById("myEcharts2"))
            chart2.setOption(defaultOption);
            this.myEcharts2 = chart2;
            this.flushData();
            this.interval = setInterval(this.flushData, 1000 * 60);
        }
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        this.myEcharts2.dispose();
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