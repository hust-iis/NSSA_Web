import {axios} from "@/api/basic";

export const ChangeModeURL = "/api/violation/change-mode"
export const SearchUsrURL =  "/api/violation/find-usr"
export const SearchLogURL =  "/api/violation/find-log"
export const DeleteUsrURL =  "/api/violation/delete-usr"

//改变检测模式
export function changeMode(status){
    return axios.post(ChangeModeURL, {status:status})
}

//查找白名单
export function searchUsr(page=1,number=5,name=''){
    return axios.get(
        SearchUsrURL,
        {params: {page: page, number: number, name: name}}
    )
}

//查找log
export function searchLogs(page=1,number=5,name=''){
    return axios.get(
        SearchLogURL,
        {params: {page: page, number: number, name: name}}
    )
}

//删除白名单
export function deleteUsr(id){
    return axios.delete(
        DeleteUsrURL,{params: {id: id}}
    )
}


