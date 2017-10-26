const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 公安验证
// ===============================================================

Mock
  .mock(
    // 获取身份验证列表 /identities
    /\/identities\?status.+/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.identityList
    }
  )
  .mock(
    // 获取身份验证列表 //lvye/searchLvyeReportInfo
    data.prefix + '/lvye/searchLvyeReportInfo',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.newIdentityList
    }
  )
  .mock(
    /lvye\/lvyeReportInfo/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.newIdentityDetail
    }
  )
  .mock(
    /\/identities\/.+/,
    {
      errcode: "0",
      errmsg: "ok",
      data: {
        identity_id: 'id111',
        suborder_id: 'suborder111',
        owner: "张三",
        phone_number: "17867894324",
        in_time: "1491384458000",
        out_time: "1491384458000",
        room: {
          room_type_name: "大床房",
          room_number: "203",
        },
        guests: [{
          name: "张三", //姓名
          sex: "男", //性别
          ethnicity: "汉", //民族
          date_of_birth: "", //生日
          address: "上海市控江路1690", //住址
          idcard: "230988392980230", //身份证号码
          photo: "", //身份证照片url
          live_photo: "", //现在抓拍的照片url
          similarity: "77" //相似度65"
        }, {
          name: "张三", //姓名
          sex: "男", //性别
          ethnicity: "汉", //民族
          date_of_birth: "", //生日
          address: "上海市控江路1690", //住址
          idcard: "230988392980230", //身份证号码
          photo: "", //身份证照片url
          live_photo: "", //现在抓拍的照片url
          similarity: "77" //相似度65"
        },],
        created_time: "1491384458000", //验证时间
        status: "PENDING", //PENDING待审核、AGREED通过、REFUSED拒绝
        lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
        lvye_report_time: null, //成功上传旅业系统的时间时间戳
        next_identity_id: 'id001' //下一个待处理的验证id
      }
    }
  )
  .mock(
    //手动上传旅业系统 /identities/lvye_report
    data.prefix + '/identities/lvye_report',
    {
      errcode: '0',
      errmsg: 'ok'
    }
  )


// ===============================================================
// 在住管理
// ===============================================================

Mock
  .mock(
    // 当日入住单列表 /suborder/today
    data.prefix + '/suborder/today',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.suborders
    }
  )
  .mock(
    // 全部入住单列表 /suborder/list
    data.prefix + '/suborder/list',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.suborders
    }
  )

