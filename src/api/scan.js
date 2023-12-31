import {axios} from "@/api/basic";

//ori
// export const HostFileURL = "/cmdb/HostFile"
// export const HostServiceFileURL = "/cmdb/HostServiceFile"
// export const ScanHostURL = "/cmdb/hostapi"
// export const HostServiceURL = "/cmdb/HostServices"

//文件导入导出
export const HostFileURL = "/api/asset-management/assetfile/"
//扫描
export const ScanHostURL = "/api/asset-management/assetscan/"

//获取给定资产的服务信息
export const HostServiceURL = "/api/asset-management/assetservice/"

//用于资产增删改查
export const AssetInfoURL="/api/asset-management/asset/"

//获取风险值api
export const AnalysisURL="/api/risk_analysis/risk"
//重新计算风险值
export const ReCalRiskURL="/api/risk_analysis/cal"

export function startScanHost(data) {

    return axios.post(ScanHostURL, data, {
        timeout: 45 * 60 * 1000,
    })
}

export function getScanHost(page=1,pageSize=10,search=''){
    return axios.get(AssetInfoURL,{params: {page: page, pageSize: pageSize, content: search}})
}

// 添加一个资产
export function addSingleAsset(data) {

    return axios.post(AssetInfoURL, data)
}

//新增服务
export function addSingleService(ip,data) {
    data.ip=ip
    return axios.post(HostServiceURL, data)
}

// export function getScanHost(page = 1, pageSize = 10, search = '') {
//     return axios.get(ScanHostURL, {params: {page: page, pageSize: pageSize, content: search}})
// }

export function changeSingleHost(num,data) {
    return axios.put(AssetInfoURL,data,{params:{alternum:num}})
}

export function deleteSingleHost(num) {
    return axios.delete(AssetInfoURL,{params:{deletenum:num}})
}

export function getHostServices(page,pageSize,id,content = '') {
    return axios.get(
        HostServiceURL, 
        {params: {page: page, pageSize: pageSize,assetid: id,content}}
    )
}

export function changeSingleHostService(id, data) {
    return axios.post(HostServiceURL,data,{params:{alternum: num}})
}

export function deleteSingleService(num) {
    return axios.delete(HostServiceURL,{params: {deletenum: num}})
}

export function importHostFile(file) {
    const formData = new FormData();
	formData.append('file', file.raw);
    return axios.post(HostFileURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: data => data
    })
}

export function downloadHostFile() {
    return axios.get(HostFileURL, {
        responseType: 'blob'
    })
}

// export function importHostServiceFile(file) {
//     const formData = new FormData();
// 	formData.append('file', file.raw);
//     return axios.post(HostServiceFileURL, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         },
//         transformRequest: data => data
//     })
// }

// export function downloadHostServiceFile(ip) {
//     return axios.get(HostServiceFileURL, {
//         params: {
//             ip
//         },
//         responseType: 'blob'
//     })
// }

export function getVulThreat(id){
    //获取脆弱值、风险值等相关数据
    return axios.get(AnalysisURL, {params:{asset_id:id}})

}

export function calRisk(id,value){
    let data={
        asset_id:id,
        asset_value:value
    }
    return axios.post(ReCalRiskURL,data)

}
