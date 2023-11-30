import {axios} from "@/api/basic";

//这里要改url
export const EmailURL = "/cmdb/DepartmentFile"

export function uploadVulThreat(email){
    //上传修改过的邮箱
    data = {
        data: email,
        type: 'edit'
    }
    return axios.post(EmailURL, data)
}
export function uploadSettings(settings){
    //上传修改过的数据
    data = {
        data: settings,
        type: 'edit'
    }
    return axios.post(EmailURL, data)
}
// export function getBigDataRes(){
//     //请求应急响应中需要的列表信息
// }
export function getNewAlert(search=''){
    //获取最新的威胁信息
    return axios.get(EmailURL, {params: {num:5, content:search}})
}