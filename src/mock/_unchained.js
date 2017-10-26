const Mock = require('mockjs');
import data from './data'

// ===============================================================
// 录入修改
// ===============================================================
Mock
  .mock(
    //获取录入修改的订单列表 /order/record
    //录入新订单 /order/record
    data.prefix + '/order/record',
    function (opts) {
      // console.log(opts)
      return opts.type === 'GET'
        ? {
          errcode: "0",
          errmsg: "ok",
          data: data.orderlist
        }
        : {
          errcode: "0",
          errmsg: "ok",
          data: {
            order_id: '001'
          }
        }
    }
  )
  .mock(
    //获取订单来源列表 /order/source
    data.prefix + '/order/source',
    {
      errcode: "0",
      errmsg: "ok",
      data: [{
        source_id: 'XC',
        source_name: '携程'
      }, {
        source_id: 'FZ',
        source_name: '飞猪'
      }]
    }
  )
.
mock(
  //修改订单 /order/record/{order_id}
  /\/order\/record\/.+/,
  {
    errcode: "0",
    errmsg: "ok"
  }
)
  .mock(
    //删除订单 /order/record/{order_id}
    /\/order\/record\/.+/,
    {
      errcode: "0",
      errmsg: "ok"
    }
  )

// ===============================================================
// 房态管理
// ===============================================================

Mock
  .mock(
    data.prefix + '/room/room_type_list',
    {
      errcode: "0",
      errmsg: "ok",
      data: [
        {
          room_type_id: 'DCF',
          room_type_name: '大床房'
        }, {
          room_type_id: 'SCF',
          room_type_name: '双床房'
        }
      ]
    }
  )
  .mock(
    data.prefix + '/room/floor_list',
    {
      errcode: "0",
      errmsg: "ok",
      data: [
        {
          floor_id: 111,
          floor_name: '1层'
        }, {
          floor_id: 222,
          floor_name: '2层'
        }, {
          floor_id: 333,
          floor_name: '3层'
        }, {
          floor_id: 444,
          floor_name: '4层'
        }
      ]
    }
  )
  .mock(
    data.prefix + '/room/list',
    {
      errcode: "0",
      errmsg: "ok",
      data: [
        {
          room_id: 'f101',//房间id
          room_number: 101,//房间号
          room_status: 0, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: 'ted',
          guest_name: ''
        }, {
          room_id: 'f102',//房间id
          room_number: '102',//房间号
          room_status: 0, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: '',
          guest_name: ''
        }, {
          room_id: 'f103',//房间id
          room_number: '103',//房间号
          room_status: 0, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: '',
          guest_name: ''
        }, {
          room_id: 'f104',//房间id
          room_number: '104',//房间号
          room_status: 0, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: '',
          guest_name: ''
        }, {
          room_id: 'f105',//房间id
          room_number: '105',//房间号
          room_status: 2, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: '思路',
          guest_name: ''
        }, {
          room_id: 'f106',//房间id
          room_number: '106',//房间号
          room_status: 2, //0:空净 1:空脏 2:在住
          room_type_id: 'DCF', //房型代码
          floor_id: 111, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: '思路',
          guest_name: '思路'
        }, {
          room_id: 'f201',//房间id
          room_number: '201',//房间号
          room_status: 1, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 222, //楼层id
          config: {
            enabled_pick: true, //是否允许自助选房
          },
          owner_name: 'ted',
          guest_name: 'alan'
        }, {
          room_id: 'f202',//房间id
          room_number: '202',//房间号
          room_status: 1, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 222, //楼层id
          config: {
            enabled_pick: false, //是否允许自助选房
          },
          owner_name: '',
          guest_name: ''
        }, {
          room_id: 'f203',//房间id
          room_number: '203',//房间号
          room_status: 1, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 222, //楼层id
          config: {
            enabled_pick: false, //是否允许自助选房
          },
          owner_name: '',
          guest_name: ''
        }, {
          room_id: 'f301',//房间id
          room_number: '301',//房间号
          room_status: 2, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 333, //楼层id
          config: {
            enabled_pick: false, //是否允许自助选房
          },
          owner_name: 'ted',
          guest_name: 'alan'
        }, {
          room_id: 'f302',//房间id
          room_number: '302',//房间号
          room_status: 2, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 333, //楼层id
          config: {
            enabled_pick: false, //是否允许自助选房
          },
          owner_name: 'ted',
          guest_name: 'alan'
        }, {
          room_id: 'f303',//房间id
          room_number: '303',//房间号
          room_status: 2, //0:空净 1:空脏 2:在住
          room_type_id: 'SCF', //房型代码
          floor_id: 333, //楼层id
          config: {
            enabled_pick: false, //是否允许自助选房
          },
          owner_name: 'ted',
          guest_name: 'alan'
        }
      ]
    }
  )
  .mock(
    data.prefix + '/room/status',
    {
      errcode: "0",
      errmsg: "ok"
    }
  )
  .mock(
    data.prefix + '/room/enabled_pick',
    {
      errcode: "0",
      errmsg: "ok"
    }
  )
  .mock(
    data.prefix + '/room/inout',
    {
      errcode: "0",
      errmsg: "ok"
    }
  )
  .mock(
    data.prefix + '/room/cancel_suborder',
    {
      errcode: "0",
      errmsg: "ok"
    }
  )
