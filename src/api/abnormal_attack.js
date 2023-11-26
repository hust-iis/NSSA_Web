import axios from "axios"

export const AbnormalTrafficURL = "/abnormalAttack/traffic"

// 异常流量
export function getAbnormalTraffics(page = 1, pageSize = 10, search = '') {
    return axios.get(
        AbnormalTrafficURL,
        {params: {page: page, pageSize: pageSize, content: search}}
        )
}

export function deleteAbnormalTraffic(id) {
    return axios.delete(
        AbnormalTrafficURL,
        {params:{id: id}}
    )
}

