const Mock = require('mockjs');
import data from './data';

//退款申请列表
Mock.mock(
   /\/refund_apply_list/,
  {
    errcode: "0",
    errmsg: "ok",
    data: data.refundList
  }
);

Mock.mock(
  /\/pay_apply_list/,
  {
    errcode: "0",
    errmsg: "ok",
    data: data.receiptList
  }
);

//PMS退房
Mock.mock(
  /\/orders\/applyRefund/,
  {
    errcode: "0",
    msg: "ok",
  }
);
