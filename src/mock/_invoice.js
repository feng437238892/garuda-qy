const Mock = require('mockjs');
import data from './data'

// ===============================================================
// 发票  获取待开发票列表
// ===============================================================

Mock.mock(
  data.prefix + '/invoice_apply?invoice_status=1&scope=ALL',
  {
    errcode: "0",
    errmsg: "ok",
    data: data.invoiceList
  }
);
// ===============================================================
// 发票  确认已开发票
// ===============================================================

Mock.mock(
  data.prefix + '/invoice_apply/{invoice_apply_id}/invoice_status',
  {
    errcode: "0",
    errmsg: "ok",
    data: 404
  }
)
