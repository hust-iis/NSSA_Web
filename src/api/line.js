import {axios} from "@/api/basic";

export const LineInfoURL = "/api/asset-management/productionline/"
export const LineFileURL = "/api/asset-management/productionlinefile/"

// 查询所有产线
export function getLine(page = 1, pageSize = 10, search = '') {
    return axios.get(LineInfoURL, {params: {page: page, pageSize: pageSize, content: search}})
}
// 导入产线
export function importLineFile(file) {
    const formData = new FormData();
	formData.append('file', file.raw);
    return axios.post(LineFileURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: data => data
    })
}
// 导出所有产线
export function downloadLineFile() {
    return axios.get(LineFileURL, {
        responseType: 'blob'
    })
}
// 编辑某行产线
export function changeSingleLine(id,data) {
    return axios.put(LineInfoURL,data,{params:{alternum: id}})
}
// 删除某行产线
export function deleteSingleLine(deletenum) {
    return axios.delete(LineInfoURL,{params: {deletenum: deletenum}})
}
// 添加一个产线
export function addLine(data) {
    return axios.post(LineInfoURL, data)
}
