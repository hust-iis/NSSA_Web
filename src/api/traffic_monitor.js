import {axios} from "@/api/basic";
//还差一个文件导入导出api
export const OverallThreatURL = "/api/flow_monitoring/threat"
export const FlowURL="/api/flow_monitoring/flow"

//获取流量数据
export function getFlow(startT,endT,step){
    return axios.get(FlowURL,{params: {start_timestamp:startT,end_timestamp:endT,step:step}})
}

//获取总体威胁事件
export function getOverallThreat(){
    return axios.get(OverallThreatURL)
}
