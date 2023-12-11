import axios from "axios"

export const IncidentResponsEventsURL = '/api/incident_response/warnings'
export const IncidentResponsEventURL = '/api/incident_response/warning'
export const EmailURL = "/api/incident_response/email_setting"

// 查询应急响应事件
export function getIncidentResponsEvents(page=1, pageSize=10, finished=0) {
    return axios.get(
        IncidentResponsEventsURL,
        {params: {page: page, pageSize:pageSize, finished:finished}}
    )
}

// 设为已读
export function finishIncidentResponsEvent(id) {
    return axios.put(
        IncidentResponsEventURL + '?id=' + id.toString()
    )
}

//设置邮件发送地址
export function uploadSettings(data) {
    return axios.post(EmailURL, data)
}
