const Mock = require('mockjs');
import data from './data'

Mock
  .mock(
    /\/order\/detail\/.*/,
    function (opts) {
      let id = opts.url.split('?')[0].split('/').pop();
      let orderdetail = data.orderlist.filter(item => item.order_id == id)[0];
      return orderdetail
        ? {
          errcode: '0',
          data: orderdetail
        }
        : {
          errcode: 404
        }
    }
  )
