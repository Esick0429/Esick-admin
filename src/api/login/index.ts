import { request } from "../../utils/service";
import type * as Login from "./types/login";
/** 登录并返回 Token */
export function loginApi(data: Login.ILoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "login",
    method: "post",
    data,
  });
}

export function getUserInfo(){
  return request({
    url: "getUserInfo",
    method: "get"
  });
}