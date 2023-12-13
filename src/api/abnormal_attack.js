import axios from "axios"

export const AbnormalTrafficsURL = "/api/abnormal_attack/traffics"
export const AbnormalTrafficURL = "/api/abnormal_attack/traffic"
export const AbnormalUsersURL = "/api/abnormal_attack/users"
export const AbnormalUserURL = "/api/abnormal_attack/user"
export const AbnormalHostsURL = "/api/abnormal_attack/hosts"
export const AbnormalHostURL = "/api/abnormal_attack/host"

// 异常流量
// 批量查询
export function getTraffics(page = 1, pageSize = 10, search = '', type, sort) {
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

// 异常用户
// 批量查询
export function getUsers(page = 1, pageSize = 10, search = '') {
    return axios.get(
        AbnormalUsersURL,
        {params: {page: page, pageSize: pageSize, content: search}}
        )
}
// 批量删除
export function delUsers(ids) {
    return axios.delete(
        AbnormalUserURL,
        {params: {ids: ids}}
        )
}
// 查询
export function getUser(id) {
    return axios.get(
        AbnormalUserURL,
        {params: {id: id}}
        )
}
// 删除
export function delUser(id) {
    return axios.delete(
        AbnormalUserURL,
        {params: {id: id}}
        )
}

// 异常主机
// 批量查询
export function getHosts(page = 1, pageSize = 10, search = '') {
    return axios.get(
        AbnormalHostsURL,
        {params: {page: page, pageSize: pageSize, content: search}}
        )
}
// 批量删除
export function delHosts(ids) {
    return axios.delete(
        AbnormalHostURL,
        {params: {ids: ids}}
        )
}
// 查询
export function getHost(id) {
    return axios.get(
        AbnormalHostURL,
        {params: {id: id}}
        )
}
// 删除
export function delHost(id) {
    return axios.delete(
        AbnormalHostURL,
        {params: {id: id}}
        )
}



// 以下是旧的态势感知页面

export const SituationEventsURL = "/api/situation_events/list/"
export const SituationEventItemURL = "/api/situation_events/item/"
export const MaliciousFileCheckURL = "/detect_vtw/detect_vtw/"

// 获取态势感知事件
export function getSituationEvents(page, pageSize, keyword, beginTime, endTime) {
	return axios.get(SituationEventsURL, {params: {
		'page': page,
		'pageSize': pageSize,
		'keyword': keyword,
		'beginTime': beginTime,
		'endTime': endTime
	}})
}

// 删除态势感知事件
export function deleteSituationEventItems(ids) {
	return axios.delete(SituationEventItemURL, {params: {
		'id_list': ids
	}})
}


// // 上传需要检测的文件
// export function checkUploadFile(file){
// 	const formData = new FormData();
// 	formData.append('file', file.raw);
// 	return axios.post(MaliciousFileCheckURL, formData, {
// 		headers: {
// 			'Content-Type': 'multipart/form-data'
// 		},
// 		transformRequest: data => data
// 	});
// }
