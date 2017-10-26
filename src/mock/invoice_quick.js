const Mock = require('mockjs');

let waitList = [{
  id: 666,
  invoice_type: '1',
  invoice_content: '',
  room_no: '205,206',
  contact_name: '张三',
  contact_phone: '13388889999',
  remark: '备注',
  title: '测试',
  tax_registry_no: '1247474747474747474',
  address: '上海市杨浦区控江路1690号',
  phone_number: '13111111111',
  bank_name: '工商银行',
  bank_account: 'fortrun',
  hotel_id: '666',
  status: 0,
  create_time: '1501927541049',
  update_time: '1501927541049'
},{
  id: 666,
  invoice_type: '1',
  invoice_content: '',
  room_no: '205,206',
  contact_name: '张三',
  contact_phone: '13388889999',
  remark: '备注',
  title: '测试',
  tax_registry_no: '1247474747474747474',
  address: '上海市杨浦区控江路1690号',
  phone_number: '13111111111',
  bank_name: '工商银行',
  bank_account: 'fortrun',
  hotel_id: '666',
  status: 0,
  create_time: '1501927541049',
  update_time: '1501927541049'
}];

let doneList = [{
  id: 666,
  invoice_type: '1',
  invoice_content: '',
  room_no: '205,206',
  contact_name: '张三',
  contact_phone: '13388889999',
  remark: '备注',
  title: '测试',
  tax_registry_no: '1247474747474747474',
  address: '上海市杨浦区控江路1690号',
  phone_number: '13111111111',
  bank_name: '工商银行',
  bank_account: 'fortrun',
  hotel_id: '666',
  status: 1,
  create_time: '1501927541049',
  update_time: '1501927541049',
  devide_id: 'devices/zhouzj01'
}, {
  id: 666,
  invoice_type: '1',
  invoice_content: '',
  room_no: '205,206',
  contact_name: '张三',
  contact_phone: '13388889999',
  remark: '备注',
  title: '测试',
  tax_registry_no: '1247474747474747474',
  address: '上海市杨浦区控江路1690号',
  phone_number: '13111111111',
  bank_name: '工商银行',
  bank_account: 'fortrun',
  hotel_id: '666',
  status: 1,
  create_time: '1501927541049',
  update_time: '1501927541049',
  devide_id: 'devices/zhouzj01'
}, {
  id: 666,
  invoice_type: '1',
  invoice_content: '',
  room_no: '207,208',
  contact_name: '张三',
  contact_phone: '13388889999',
  remark: '备注',
  title: '测试',
  tax_registry_no: '1247474747474747474',
  address: '上海市杨浦区控江路1690号',
  phone_number: '13111111111',
  bank_name: '工商银行',
  bank_account: 'fortrun',
  hotel_id: '666',
  status: 1,
  create_time: '1301927541049',
  update_time: '1301927541049',
}];


Mock.mock(
  /\/getInvoiceList/,
  function (request) {
    let status = request.url.split('?')[1].split('=')[1];
    if (status == 0) {
      return {
        errcode: "0",
        errmsg: "ok",
        data: waitList
      }
    } else {
      return {
        "errcode": "0",
        "errmsg": "ok",
        "data": doneList
      }
    }
  }
)

Mock.mock(
  /\/getInvoice/,
  function (request) {
    let id = request.url.split('?')[1].split('/')[1];
    console.log(request.url.split('?')[1].split['='])
    let orderdetail = doneList.filter(item => item.id == id)[0];
    return {
      "errcode": "0",
      "errmsg": "ok",
      "data": orderdetail
    };
  }
)
