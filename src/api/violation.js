import {axios} from "@/api/basic";

export const ChangeModeURL = "/change-mode"
export const SearchUsrURL = "/find-usr"
export const SearchLogURL = "/find-log"
export const DeleteUsrURL = "/delete-usr"

//改变检测模式
export function changeMode(status){
    return axios.post(ChangeModeURL, status, {
        timeout: 45 * 60 * 1000,
    })
}

//查找白名单
export function searchUsr(page=1,pageSize=5,search=''){
    return axios.get(
        SearchUsrURL,
        {params: {page: page, pageSize: pageSize, content: search}}
    )
}

//查找log
export function searchLogs(page=1,pageSize=5,search=''){
    return axios.get(
        SearchLogURL,
        {params: {page: page, pageSize: pageSize, content: search}}
    )
}

//删除白名单
export function deleteUsr(id){
    return axios.delete(
        DeleteUsrURL,{params: {id: id}}
    )
}


