import request from '@/utils/request'
const api_name = '/bookmark-classify'

export default {
  list() {
    return request({
      url: `${api_name}/list`,
      method: 'get'
    })
  },
  save(bookmarkClassify) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: bookmarkClassify
    })
  },
  update(bookmarkClassify) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: bookmarkClassify
    })
  },
  delete(bookmarkClassify) {
    return request({
      url: `${api_name}/delete`,
      method: 'delete',
      data: bookmarkClassify
    })
  }
}
