import {axios} from "@/api/basic";

// export const UnitInfoURL = "/cmdb/Department"
export const UnitInfoURL = "/asset-management/workshop"
// export const UnitFileURL = "/cmdb/DepartmentFile"

// 查询所有车间
export function getUnit(page = 1, pageSize = 10, search = '') {
    return axios.get(UnitInfoURL, {params: {page: page, pageSize: pageSize, content: search}})
}
// 导入车间
export function importUnitFile(file) {
    const formData = new FormData();
	formData.append('file', file.raw);
    return axios.post(UnitFileURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: data => data
    })
}
// 导出所有车间
export function downloadUnitFile() {
    return axios.get(UnitFileURL, {
        responseType: 'blob'
    })
}
// 编辑某行车间
export function changeSingleUnit(data) {
    data = {
        data: data,
        type: 'edit'
    }
    return axios.post(UnitInfoURL, data)
}
// 删除某行车间
export function deleteSingleUnit(name) {
    return axios.delete(UnitInfoURL, {params: {name: name}})
}
// 添加一个车间
export function addUnit(data) {
    data = {
        data: data,
        type: 'add'
    }
    return axios.post(UnitInfoURL, data)
}