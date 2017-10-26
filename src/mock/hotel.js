/**
 * Created by lisj on 2017/9/13.
 */
const Mock = require('mockjs');
import data from './data';

//退款申请列表
Mock.mock(
  data.prefix + '/todolist',
  {
    errcode: "0",
    errmsg: "ok",
    data: data.hotelTodoList
  }
);
