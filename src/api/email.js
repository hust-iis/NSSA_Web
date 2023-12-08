import {axios} from "@/api/basic";

//这里要改url
export const EmailURL = "/api/incident_response/email_setting"

export function uploadVulThreat(data){
    return axios.post(EmailURL, data)
}


export function getNewAlert(search=''){
    //获取最新的威胁信息
    return axios.get(EmailURL, {params: {num:5, content:search}})
}