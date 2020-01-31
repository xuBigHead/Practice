import request from '@/utils/request'
const api_name = '/tools/net-book-mark'

export default {
  getNetBookMarkByPage(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  saveBookMark(bookMark) {
    return request({
      url: `${api_name}/saveBookMark`,
      method: 'post',
      data: bookMark
    })
  },
  getBookMarkById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  updateBookMarkById(bookMark) {
    return request({
      url: `${api_name}/updateBookMarkById`,
      method: 'put',
      data: bookMark
    })
  },
  deleteBookMarkById(id) {
    return request({
      url: `${api_name}/deleteBookMarkById/${id}`,
      method: 'delete'
    })
  }
}
