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
  delete(bookmark) {
    return request({
      url: `${api_name}/delete`,
      method: 'post',
      data: bookmark
    })
  },
  update(bookMark) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: bookMark
    })
  },
  getTitleOfUrl(url) {
    return request({
      url: url,
      method: 'get',
    })
  },
  getBookmarkById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  }
}
