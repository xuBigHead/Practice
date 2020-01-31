import request from '@/utils/request'
const api_name = '/tools/net-history-record'

export default {
  getHistoryRecordByPage(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: ""
    })
  }
}