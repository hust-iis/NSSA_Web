import { axios } from "@/api/basic";

export const RegisterURL = "/user/register";
export const LoginURL = "/user/login";
export const UserInfoURL = "/user/info";
export const UserListURL = "/user/list";
export const UserChpwdURL = "/user/chpwd";
export const UserUpdateURL = "/user/update";
export const UserDeleteURL = "/user/delete";
export const UserAuditURL = "/user/audits";


export function register(data) {
  return axios.post(RegisterURL, data);
}

export function login(data) {
  return axios.post(LoginURL, data);
}

export function getUserInfo(id) {
  return axios.get(UserInfoURL, { params: { id } });
}

export function getUsers(query, page, pagesize) {
  return axios.get(UserListURL, {
    params: { query: query, page: page, pagesize: pagesize },
  });
}

export function changePassword(data) {
  data["user_name"] = localStorage.getItem("user_name");
  return axios.post(UserChpwdURL, data);
}

export function updateUser(data) {
  return axios.post(UserUpdateURL, data);
}

export function deleteUser(id) {
  return axios.delete(UserDeleteURL, { params: { id: id } });
}

export function getUsersAudit(query, page, pagesize) {
  return axios.get(UserAuditURL, {
    params: { query: query, page: page, pagesize: pagesize },
  });
}
