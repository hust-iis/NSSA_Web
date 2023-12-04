import {axios} from "@/api/basic";

//ori
// export const HostFileURL = "/cmdb/HostFile"
// export const HostServiceFileURL = "/cmdb/HostServiceFile"
// export const ScanHostURL = "/cmdb/hostapi"
// export const HostServiceURL = "/cmdb/HostServices"

//还差一个文件导入导出api
export const HostFileURL = "/cmdb/HostFile"
export const HostServiceFileURL = "/cmdb/HostServiceFile"
//扫描
export const ScanHostURL = "/asset-management/assetscan"

//获取给定资产的服务信息
export const HostServiceURL = "/asset-management/assetservice"

//用于资产增删改查
export const AssetInfoURL="/asset-management/asset"

//获取风险值api
export const AnalysisURL="/risk/analysis"

export function startScanHost(data) {
    data = {
        data: data,
        type: 'scan'
    }
    return axios.post(ScanHostURL, data, {
        timeout: 45 * 60 * 1000,
    })
}

export function getScanHost(page=1,pageSize=10,search=''){
    return axios.get(AssetInfoURL,{params: {page: page, pageSize: pageSize, content: search}})
}

// 添加一个资产
export function addSingleAsset(data) {
    data = {
        data: data,
        type: 'add'
    }
    return axios.post(AssetInfoURL, data)
}

//新增服务
export function addSingleService(ip,data) {
    data.ip=ip
    data = {
        data: data,
        type: 'add'
    }
    return axios.post(HostServiceURL, data)
}

// export function getScanHost(page = 1, pageSize = 10, search = '') {
//     return axios.get(ScanHostURL, {params: {page: page, pageSize: pageSize, content: search}})
// }

export function changeSingleHost(num,data) {
    data.alternum=num
    data = {
        data: data,
        type: 'edit'
    }
    return axios.put(AssetInfoURL, data)
}

export function deleteSingleHost(num) {
    return axios.delete(AssetInfoURL, {params: {deletenum: num}})
}

export function getHostServices(page=1,pageSize=99,id) {
    return axios.get(HostServiceURL, {params: {page: page, pageSize: pageSize,assetid: id}})
}

export function changeSingleHostService(id, data) {
    data.alternum = id
    return axios.post(HostServiceURL, data)
}

export function deleteSingleService(num) {
    return axios.delete(HostServiceURL, {params: {deletenum:num}})
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

export function importHostServiceFile(file) {
    const formData = new FormData();
	formData.append('file', file.raw);
    return axios.post(HostServiceFileURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: data => data
    })
}

export function downloadHostServiceFile(ip) {
    return axios.get(HostServiceFileURL, {
        params: {
            ip
        },
        responseType: 'blob'
    })
}

export function getVulThreat(ip,assetValue=1000){
    //获取脆弱值、风险值等相关数据
    return axios.post(AnalysisURL, {params:{assetIP:ip, assetValue:assetValue}})

}
