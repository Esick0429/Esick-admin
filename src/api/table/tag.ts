import { request } from "@/utils/service";
import type * as Blog from "./types/blog";

/** 增 */
export function creatTagApi(data: {tagName:string}) {
  return request({
    url: "addTags",
    method: "post",
    data,
  });
}

/** 删 */
export function deletTagApi(id: string) {
  return request({
    url: `deleteTags?${id}`,
    method: "delete",
  });
}

/** 查 */
export function getTagListApi() {
  return request({
    url: "getTagList",
    method: "get"
  });
}
