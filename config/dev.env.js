'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 线上配置
  // BASE_API: '"https://39.108.87.253"',
  // 开发配置
  BASE_API: '"http://localhost:10080"',
  OSS_PATH: '"https://online-teaching.oss-cn-shenzhen.aliyuncs.com"',
})
