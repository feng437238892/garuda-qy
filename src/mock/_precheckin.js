const Mock = require('mockjs');
import data from './data'

// ===============================================================
// PMS订单-预付确认
// ===============================================================
Mock
  .mock(
    // 获取确认订单列表 /order/precheckin/confirm
    /\/order\/precheckin\/confirm\?status=\d/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.orderlist
    }
  )
  .mock(
    // 批量确认未支付预订单 /order/multiconfirm
    data.prefix + '/order/multiconfirm',
    {
      errcode: "0",
      msg: "ok",
    }
  )
  .mock(
    // 单个确认预订单 /order/singleconfirm
    data.prefix + '/order/singleconfirm',
    {
      errcode: "0",
      msg: "ok",
    }
  );

// ===============================================================
// 预订单登记
// ===============================================================


Mock
  .mock(
    // 获取当日预登记订单列表 /order/precheckin/today
    data.prefix + '/order/precheckin/today',
    {
      errcode: "0",
      msg: "ok",
      data: data.orderlist
    }
  )
  .mock(
    // 获取历史预登记订单列表 /order/precheckin/history
    data.prefix + '/order/precheckin/history',
    {
      errcode: "0",
      msg: "ok",
      data: data.orderlist
    }
  )
  .mock(
    // 营业员确认PMS同步结果 /order/conform_pms_sync
    data.prefix + '/order/conform_pms_sync',
    {
      errcode: "0",
      msg: "ok",
    }
  )
