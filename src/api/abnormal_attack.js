import axios from "axios"

export const AbnormalTrafficsURL = "/api/abnormal_attack/traffics"
export const AbnormalTrafficURL = "/api/abnormal_attack/traffic"
export const AbnormalUsersURL = "/api/abnormal_attack/users"
export const AbnormalUserURL = "/api/abnormal_attack/user"
export const AbnormalHostsURL = "/api/abnormal_attack/hosts"
export const AbnormalHostURL = "/api/abnormal_attack/host"

// 异常流量
// 批量查询
export function getTraffics(page = 1, pageSize = 10, search = '') {
    return axios.get(
        AbnormalTrafficsURL,
        {params: {page: page, pageSize: pageSize, content: search}}
        )
}
// 批量删除
export function delTraffics(ids) {
    return axios.delete(
        AbnormalTrafficURL,
        {params: {ids: ids}}
        )
}
// 查询
export function getTraffic(id) {
    return axios.get(
        AbnormalTrafficURL,
        {params: {id: id}}
        )
}
// 删除
export function delTraffic(id) {
    return axios.delete(
        AbnormalTrafficURL,
        {params: {id: id}}
        )
}
// // 新增
// export function addTraffic(traffic) {
//     return axios.post(
//         AbnormalTrafficsURL,
//         traffic
//         )
// }
// // 修改
// export function editTraffic(traffic) {
//     return axios.put(
//         AbnormalTrafficURL,
//         traffic
//         )
// }