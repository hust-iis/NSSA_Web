import {axios} from "@/api/basic";

export const situationURL = "/api/situation_prediction/value/"


export function getBigData() {
    return axios.get(situationURL)
}
