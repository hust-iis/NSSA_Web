import {axios} from "@/api/basic";

export const EquipmentListURL = "/cmdb/Jtopo/addEquipment"
export const NetTopologGenURL = "/cmdb/Jtopo/auto"

// 服务器 ↓
export const NetTopologyURL = "/cmdb/Jtopo"
export const NetTopologyIconURL = "/staticfiles/JtopoImg/"

// 本地测试 ↓
// export const NetTopologyURL = "/static/network.json"
// export const NetTopologyIconURL = "../static/jtopo/img/"

// 根据网段生成拓扑
export function getNetTopologyByNetSeg(net) {
    return axios.post(NetTopologGenURL, net)
}

// 获取拓扑图、设备列表、图片URL列表
export function getNetTopology(id = "") {
    return axios.get(NetTopologyURL, {params: { id }})
}

// 更改拓扑图
export function changeNetTopology(topology, id = "") {
    return axios.post(NetTopologyURL, {'topology_json': topology, "topology_id": id})
}

// 添加设备
export function addEquipment(equipment) {
    return axios.post(EquipmentListURL, {'equipment_json': equipment})
}

export function deleteEquipment(name) {
    return axios.delete(EquipmentListURL, {params: { name }})
}