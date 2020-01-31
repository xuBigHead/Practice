import request from "@/utils/request"
import bookmark from "./bookmark";
const api_name = "/tools/net-book-mark-type"

export default {
  getNetBookMarkTypeList() {
    return request({
      url: `${api_name}/list`,
      method: "get"
    })
  },
  saveBookMarkType(bookmarkType) {
    return request({
      url: `${api_name}/saveBookMarkType`,
      method: "post",
      data: bookmarkType
    })
  },
  updateBookMarkTypeById(bookmarkType) {
    return request({
      url: `${api_name}/updateBookMarkTypeById`,
      method: "put",
      data: bookmarkType
    })
  },
  deleteBookMarkTypeById(id) {
    return request({
      url: `${api_name}/deleteBookMarkTypeById/${id}`,
      method: "delete"
    })
  },
  deleteAllBookMarkType(){
    return request({
      url: `${api_name}/deleteAllBookMarkType`,
      method: "get"
    })
  }
}