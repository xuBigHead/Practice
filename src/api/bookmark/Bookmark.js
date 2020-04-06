import request from '@/utils/request'
const api_name = '/bookmark'

export default {
  list(query) {
    return request({
      url: `${api_name}/list`,
      method: 'get',
      params: query
    })
  },
  save(bookmark) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: bookmark
    })
  },
  getBookmarkById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  updateBookmarkById(bookMark) {
    return request({
      url: `${api_name}/updateBookMarkById`,
      method: 'put',
      data: bookMark
    })
  },
  deleteBookmarkById(id) {
    return request({
      url: `${api_name}/deleteBookMarkById/${id}`,
      method: 'delete'
    })
  }
}
