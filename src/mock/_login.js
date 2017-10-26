const Mock = require('mockjs')
import data from './data'

Mock.mock(
  data.prefix + '/login',
  {
    errcode: "0",
    errmsg: "ok",
    data: "asiodhoiawhdoihoi123128uasihci"
  }
)
