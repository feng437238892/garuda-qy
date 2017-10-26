const Mock = require('mockjs');
import data from './data';

//退房申请列表
Mock.mock(
  // data.prefix + '/checkout',
  /\/checkout\?status.+/,
  {
    errcode: "0",
    errmsg: "ok",
    data: data.checkoutList
  }
);

//PMS退房
Mock.mock(
  /\/checkout\/\d+\/pms/,// data.prefix + '/checkout/{id}/pms'
  {
    errcode: "0",
    msg: "ok",
  }
);
