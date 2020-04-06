import request from "@/utils/request"
import bookmark from "./Bookmark";
const api_name = "/bookmark-classify"

export default {
  getBookmarkClassifyList() {
    return request({
      url: `${api_name}/list`,
      method: "get"
    })
  },
  saveBookmarkClassify(bookmarkType) {
    return request({
      url: `${api_name}/saveBookMarkType`,
      method: "post",
      data: bookmarkType
    })
  },
  updateBookmarkClassifyById(bookmarkType) {
    return request({
      url: `${api_name}/updateBookMarkTypeById`,
      method: "put",
      data: bookmarkType
    })
  },
  deleteBookmarkClassifyById(id) {
    return request({
      url: `${api_name}/deleteBookMarkTypeById/${id}`,
      method: "delete"
    })
  },
  deleteAllBookmarkClassify(){
    return request({
      url: `${api_name}/deleteAllBookMarkType`,
      method: "get"
    })
  }
}
