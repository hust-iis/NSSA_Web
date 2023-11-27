import {axios} from "@/api/basic";

export const LineInfoURL = "/cmdb/Line"
export const LineFileURL = "/cmdb/LineFile"
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
export function changeSingleLine(data) {
    data = {
        data: data,
        type: 'edit'
    }
    return axios.post(LineInfoURL, data)
}
// 删除某行产线
export function deleteSingleLine(name) {
    return axios.delete(LineInfoURL, {params: {name: name}})
}
// 添加一个产线
export function addLine(data) {
    data = {
        data: data,
        type: 'add'
    }
    return axios.post(LineInfoURL, data)
}