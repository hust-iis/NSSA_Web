import {axios} from "@/api/basic";
//还差一个文件导入导出api
<<<<<<< HEAD
export const OverallThreatURL = "/api/flowMonitor/threat"
export const FlowURL="/api/flowMonitor/flow"
=======
export const OverallThreatURL = "/api/flow_monitoring/threat"
export const FlowURL="/api/flow_monitoring/flow"
>>>>>>> a8c4c1dd79b8edbdf572d33d6f3b56e24f715053

//获取流量数据
export function getFlow(startT,endT,step){
    return axios.get(FlowURL,{params: {start_timestamp:startT,end_timestamp:endT,step:step}})
}

//获取总体威胁事件
export function getOverallThreat(){
    return axios.get(OverallThreatURL)
}
