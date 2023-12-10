import {axios} from "@/api/basic";
//还差一个文件导入导出api
export const OverallThreatURL = "/api/flowMonitor/threat"
export const FlowURL="/api/flowMonitor/flow"

//获取流量数据
export function getFlow(count=10){
    return axios.get(FlowURL,{params: {count: count}})
}

//获取总体威胁事件
export function getOverallThreat(){
    return axios.get(OverallThreatURL)
}
