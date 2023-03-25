import { request } from "@/utils/service"
import type * as Blog from "./types/blog"

/** 增 */
export function creatBlogDataApi(data: Blog.CreateBlogRequestData) {
  return request({
    url: "addArchive",
    method: "post",
    data
  })
}

/** 删 */
export function deletBlogDataApi(data:{archiveId:string}) {  
  return request({
    url: `deleteArchive?archiveId=${data.archiveId}`,
    method: "delete"
  })
}

/** 改 */
export function updatBlogDataApi(data: Blog.UpdateBlogRequestData) {
  return request({
    url: "updateArchive",
    method: "POST",
    data
  })
}

/** 查 */
export function getBlogDataApi(params: Blog.BlogRequestData) {
  return request<Blog.GetBlogResponseData>({
    url: "getAllArchive",
    method: "get",
    params
  })
}
