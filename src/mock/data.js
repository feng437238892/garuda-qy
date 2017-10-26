module.exports = {
  prefix: "/gemini",
  // ===============================================================
  // 订单列表
  // ===============================================================
  orderlist: [
    {
      order_id: "230420402402401",//订单号
      order_pmsid: "230420402402401",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      is_cash_pay: true,//是否是现付 true代表是，false代表不是 17-07-13
      is_one_room: true,//是否是一个房间 true代表是，false代表不是 17-07-13
      is_support_checkout: false,//是否支持checkout
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 1,
        confirm_mode: 2
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'FAILED',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: [
        {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
          room_number: "203",
          room_tags: ["靠南", "带窗"],
          room_type_id: "DCF",
          room_type_name: "大床房",
          room_price: [{
            date: 1490976000000,
            price: '2222',
          }, {
            date: 1490976000000 + 86400000,
            price: '3333',
          }],
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          in_time: 1490976000000, //办理入住时间
          // in_time: null, //办理入住时间
          // out_time: null, //离店时间
          out_time: 1490976000000, //离店时间
          identity_id: "2304204024024012", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'FAILED', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
          pmscheckout_status: "FAILED"//PENDING处理中, SUCCESS退房成功,FAILED退房失败'
        },
        {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 3,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
          room_number: "203",
          room_tags: ["靠南", "带窗"],
          room_type_id: "DCF",
          room_type_name: "大床房",
          room_price: [{
            date: 1490976000000,
            price: '2222',
          }, {
            date: 1490976000000 + 86400000,
            price: '3333',
          }],
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          // in_time: null, //办理入住时间
          in_time: 1490976000000, //办理入住时间
          out_time: 1490976000000, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'FAILED', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
          pmscheckout_status: "PENDING"//PENDING处理中, SUCCESS退房成功,FAILED退房失败'
        }, {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 0,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
          room_number: "203",
          room_tags: ["靠南", "带窗"],
          room_type_id: "DCF",
          room_type_name: "大床房",
          room_price: [{
            date: 1490976000000,
            price: '2222',
          }, {
            date: 1490976000000 + 86400000,
            price: '3333',
          }],
          guests: [
            {
              name: "四",
              idcard: "343245623456728199"
            }, {
              name: "四",
              idcard: "343245623456728199"
            }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'FAILED', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
          pmscheckout_status: "SUCCESS"//PENDING处理中, SUCCESS退房成功,FAILED退房失败'
        }]
    },
    {
      order_id: "230420402402402",//订单号
      order_pmsid: "230420402402402",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 2,
        confirm_mode: 2
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402403",//订单号
      order_pmsid: "230420402402403",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 3,
        confirm_mode: 2
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: [
        {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
          room_number: "203",
          room_tags: ["靠南", "带窗"],
          room_type_id: "DCF",
          room_type_name: "大床房",
          room_price: [{
            date: 1490976000000,
            price: '2222',
          }, {
            date: 1490976000000 + 86400000,
            price: '3333',
          }],
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'NONE', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
        }]

    },
    {
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402405",//订单号
      order_pmsid: "230420402402405",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402406",//订单号
      order_pmsid: "230420402402406",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []

    }
  ],
  // ===============================================================
  // 子单列表
  // ===============================================================
  suborders: [
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402401',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 3,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
      room_number: "203",
      room_tags: ["靠南", "带窗"],
      room_type_id: "DCF",
      room_type_name: "大床房",
      room_price: [{
        date: 1490976000000,
        price: '2222',
      }, {
        date: 1490976000000 + 86400000,
        price: '3333',
      }],
      guests: [
        {
          name: "李四1",
          idcard: "343245623456728199"
        }, {
          name: "李四2",
          idcard: "343245623456728199"
        }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: "NONE", //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    },
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402402',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
      room_number: "203",
      room_tags: ["靠南", "带窗"],
      room_type_id: "DCF",
      room_type_name: "大床房",
      room_price: [{
        date: 1490976000000,
        price: '2222',
      }, {
        date: 1490976000000 + 86400000,
        price: '3333',
      }],
      guests: [
        {
          name: "张四1",
          idcard: "343245623456728199"
        }, {
          name: "李四22",
          idcard: "343245623456728199"
        }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: 'NONE', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    },
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402402',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
      room_number: "203",
      room_tags: ["靠南", "带窗"],
      room_type_id: "DCF",
      room_type_name: "大床房",
      room_price: [{
        date: 1490976000000,
        price: '2222',
      }, {
        date: 1490976000000 + 86400000,
        price: '3333',
      }],
      guests: [
        {
          name: "张四1",
          idcard: "343245623456728199"
        }, {
          name: "李四22",
          idcard: "343245623456728199"
        }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: 'NONE', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    },
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402402',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
      room_number: "203",
      room_tags: ["靠南", "带窗"],
      room_type_id: "DCF",
      room_type_name: "大床房",
      room_price: [{
        date: 1490976000000,
        price: '2222',
      }, {
        date: 1490976000000 + 86400000,
        price: '3333',
      }],
      guests: [
        {
          name: "张四1",
          idcard: "343245623456728199"
        }, {
          name: "李四22",
          idcard: "343245623456728199"
        }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: 'PENDING', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    }
  ],
  // ===============================================================
  // 公安验证
  // ===============================================================
  identityList: [
    {
      identity_id: 'id0001',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: null, //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0002',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0003',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0004',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      upload_time: null, //成功上传旅业系统的时间
      next_identity_id: '' //下一个待处理的验证id
    },
    {
      identity_id: 'id0005',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0006',
      suborder_id: '',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
  ],
  newIdentityList: [
    {
      lvyeReportRecordId: 'id002',//旅业上报记录ID
      identityId: 'id002',  //身份验证记录ID
      identityGuestId: "001",  //用户身份验证ID
      inTime: '1491384458000',
      outTime: '1491384458000',
      roomNumber: "201",
      name: "李思静", //姓名
      sex: "女", //性别
      ethnicity: "汉", //民族
      dateOfBirth: "1491384458000", //生日
      address: "定好纷纷为", //住址
      idCard: "360124199501280100", //身份证号码
      photo: "", //身份证照片url
      livePhoto: "", //现在抓拍的照片url
      similarity: "85", //相似度65"
      identityStatus: "", //身份状态
      createdTime: '1471082458000', //验证时间
      reportInStatus: "SUCCESS", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。入住上报公安状态
      reportInTime: 1491384458000, //成功上传旅业系统的时间时间戳
      reportOutStatus: "NONE", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。离店上报公安状态
      reportOutTime: '1491384458000'//成功上传旅业系统的时间时间戳

    },
    {
      lvyeReportRecordId: 'id001',//旅业上报记录ID
      identityId: 'id001',  //身份验证记录ID
      identityGuestId: "001",  //用户身份验证ID
      inTime: '1491384458000',
      outTime: '1491384458000',
      roomNumber: "201",
      name: "李思静", //姓名
      sex: "女", //性别
      ethnicity: "汉", //民族
      dateOfBirth: "1491384458000", //生日
      address: "定好纷纷为", //住址
      idCard: "360124199501280100", //身份证号码
      photo: "", //身份证照片url
      livePhoto: "", //现在抓拍的照片url
      similarity: "85", //相似度65"
      identityStatus: "", //身份状态
      createdTime: '1490284458000', //验证时间
      reportInStatus: "SUCCESS", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。入住上报公安状态
      reportInTime: 1491384458000, //成功上传旅业系统的时间时间戳
      reportOutStatus: "NONE", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。离店上报公安状态
      reportOutTime: '1491384458000'//成功上传旅业系统的时间时间戳
    },
    {
      lvyeReportRecordId: 'id002',//旅业上报记录ID
      identityId: 'id002',  //身份验证记录ID
      identityGuestId: "001",  //用户身份验证ID
      inTime: '1491384458000',
      outTime: '1491384458000',
      roomNumber: "201",
      name: "李思静", //姓名
      sex: "女", //性别
      ethnicity: "汉", //民族
      dateOfBirth: "1491384458000", //生日
      address: "定好纷纷为", //住址
      idCard: "360124199501280100", //身份证号码
      photo: "", //身份证照片url
      livePhoto: "", //现在抓拍的照片url
      similarity: "85", //相似度65"
      identityStatus: "", //身份状态
      createdTime: '1491082458000', //验证时间
      reportInStatus: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。入住上报公安状态
      reportInTime: 1491384458000, //成功上传旅业系统的时间时间戳
      reportOutStatus: "NONE", //NONE未上传，SUCCESS成功，FAILED失败,PENDING 未确认。离店上报公安状态
      reportOutTime: '1491384458000'//成功上传旅业系统的时间时间戳
    },

  ],
  newIdentityDetail: {
    address: "重庆市永川区红炉镇红庆村代家桥村民小组12号",
    createdTime: 1500340868000,
    dateOfBirth: "1992-08-24",
    ethnicity: "汉",
    idCard: "50038319920824735X",
    identityGuestId: "0ca0870f87af405f972bc46974435979",
    identityId: "6c64aaf5d57c460da6f11a2e1538a085",
    identityStatus: "AGREED",
    inTime: 1500342730000,
    livePhoto: "http://livephoto.storage.fortrun.cn/20170718/15003408649005342480.jpeg",
    lvyeReportRecordId: "6784ff269d7f4b96a218f74fa0408945",
    name: "谢洪",
    nights: 2,
    outTime: 1500429131000,
    photo: "http://idcard-1252821823.cossh.myqcloud.com/20170718/289b9c37d05b1005b098d42ccc1001be.png",
    reportInStatus: "NONE",
    reportInTime: 1500342744000,
    reportOutStatus: "NONE",
    reportOutTime: null,
    roomNumber: "1024",
    sex: "男",
    similarity: 96
  },
  // ===============================================================
  // 退房
  // ===============================================================
  checkoutList: [
    {
      order_id: "230420402402401",    //主订单ID
      suborder_id: "230420402402401",  //子订单ID
      room_type_name: "大床房",  //房型名称
      room_number: "201", //房号
      union_tag: "204sssddeer",  //联房
      guests: [{
        name: "李思静",  //姓名
        idcard: "360123183892128910"  //身份证号码
      }, {
        name: "Ted",  //姓名
        idcard: "360123183892123456"  //身份证号码
      }],
      created_time: "1495419805000",  //申请时间
      status: {
        checkout_success: false, //退房成功状态
        refund_success: true, //退款成功状态
        lvye_checkout_success: false, //旅业退房成功状态
      }
    },
    {
      order_id: "230420402402402",    //主订单ID
      suborder_id: "230420402402402",  //子订单ID
      room_type_name: "大床房",  //房型名称
      room_number: "202", //房号
      union_tag: "204sssddeer",  //联房
      guests: [{
        name: "李思静",  //姓名
        idcard: "360123183892128910"  //身份证号码
      }, {
        name: "Ted",  //姓名
        idcard: "360123183892123456"  //身份证号码
      }],
      created_time: "1495419805000",  //申请时间
      status: {
        checkout_success: true, //退房成功状态
        refund_success: true, //退款成功状态
        lvye_checkout_success: true, //旅业退房成功状态
      }
    }
  ],
  // ===============================================================
  // 获取待开发票列表
  // ===============================================================
  invoiceList: [
    {
      invoice_apply_id: '1234',
      order_id: '230420402402401',
      is_any_checkin: true, //true已入住 false未入住
      rooms_number: ['203'],
      owner: '张翠山',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海二建",
      invoice_status: 1, //1有效未开票 2已开票
      order_status: 4
    },
    {
      invoice_apply_id: '1234',
      order_id: '230420402402402',
      is_any_checkin: false, //true已入住 false未入住
      rooms_number: ['205'],
      owner: '张无忌',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海三建",
      invoice_status: 2, //1有效未开票 2已开票
      order_status: 6
    }
  ],
  // ===============================================================
  // 退款
  // ===============================================================
  refundList: [
    {
      order_id: "230420402402401",    //主订单ID
      room_numbers: ["201"], //房号
      pay_fee: 500000,
      refund_fee: 20000,
      created_time: "1495252046000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402402",    //主订单ID
      room_numbers: ["202"], //房号
      pay_fee: 500000,
      refund_fee: 20000,
      created_time: "1495358557000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402403",    //主订单ID
      room_numbers: ["203"], //房号
      pay_fee: 500000,
      refund_fee: 20000,
      created_time: "1495350550000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402404",    //主订单ID
      room_numbers: ["204", "205"], //房号
      pay_fee: 500000,
      refund_fee: 20000,
      created_time: "1495419805000",  //申请时间
      status: 'REFUNDED'
    },
  ],

  hotelTodoList: [
    {
      "total": 1,
      "type": "PREPAY" //待办事项类型 ，PREPAY预付款确认,IDENTITY身份检验、LVYE旅业上报、INVOICE极速开票、CHECKOUT退房
    },
    {
      "total": 0,
      "type": "IDENTITY" //待办事项类型 ，PREPAY预付款确认,IDENTITY身份检验、LVYE旅业上报、INVOICE极速开票、CHECKOUT退房
    },
    {
      "total": 0,
      "type": "LVYE" //待办事项类型 ，PREPAY预付款确认,IDENTITY身份检验、LVYE旅业上报、INVOICE极速开票、CHECKOUT退房
    },
    {
      "total": 0,
      "type": "INVOICE" //待办事项类型 ，PREPAY预付款确认,IDENTITY身份检验、LVYE旅业上报、INVOICE极速开票、CHECKOUT退房
    },
    {
      "total": 0,
      "type": "CHECKOUT" //待办事项类型 ，PREPAY预付款确认,IDENTITY身份检验、LVYE旅业上报、INVOICE极速开票、CHECKOUT退房
    },
  ],

  receiptList: [
    {
      name: "张三",    //客人姓名
      room_numbers: ["203", '204'], //房号,多个房号用逗号隔开
      pay_fee: 50000,  //支付金额元
      pay_way: "微信支付",     //支付方式
      pay_time: '1495419805000',       //支付时间
      out_trade_no: "230420402402401"    //订单号
    },
    {
      name: "张三",    //客人姓名
      room_numbers: ["203"], //房号,多个房号用逗号隔开
      pay_fee: 50000,  //支付金额元
      pay_way: "微信支付",     //支付方式
      pay_time: '1495419805000',       //支付时间
      out_trade_no: "230420402402402"    //订单号
    },
    {
      name: "张三",    //客人姓名
      room_numbers: ["203"], //房号,多个房号用逗号隔开
      pay_fee: 50000,  //支付金额元
      pay_way: "微信支付",     //支付方式
      pay_time: '1495419805000',       //支付时间
      out_trade_no: "230420402402403"    //订单号
    }
  ]
};
