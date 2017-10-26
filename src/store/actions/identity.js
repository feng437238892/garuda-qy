module.exports = {
  getIdentities(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities',
      params: {
        status: param.status,
        scope: param.scope,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
    })
  },
  getIdentity(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setIdentityStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id + '/status',
      method: 'PUT',
      body: {
        suborder_id: param.suborder_id,
        status: param.status
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 离店
  setUploadStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/lvye_report',
      method: 'POST',
      body: {
        identity_id: param.identity_id,
        room_number: param.room_number, //房间号码
        days: param.days, //入住几晚
        in_time: param.in_time, //入住几晚
        out_time: param.out_time, //入住几晚
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 退房退房退房
  setLeaveStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout/lvye/'+param.suborder_Id,
      method: 'PUT',
      body: {
        suborder_Id: param.suborder_id,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  newIdentityList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/searchLvyeReportInfo',
      method: 'POST',
      body: {
        startTime: param.startTime,
        endTime: param.endTime,
        desc: true,//true 降序
        reportInStatuses: param.reportInStatuses,//需要的入住上报旅业状态
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  newIdentityDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/lvyeReportInfo/' + param.identity_id,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  reportLvYe(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/lvyeReport',
      method: 'PUT',
      body: {
        lvyeReportRecordIds: param.lvyeReportRecordIds,//旅业上报记录Id
        roomNumber: param.roomNumber,//房间号
        nights: param.nights,//入住晚数
        inTime: param.inTime,//入住时间
        outTime: param.outTime,//离店时间
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', '提交成功');
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  getRoomNumberList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/room/numberList',
      onSuccess: body => ctx.commit('ROOMNUMBERLIST', body.data)
    })
  },
  wxPayConfirm(ctx, param) {
    ctx.dispatch('resource', {
      url: '/order/pay',
      method: 'POST',
      body: {
        identity_id: param.identity_id,//设备ID
        room_fee: param.room_fee,//房费
        deposit: param.deposit//押金
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
};
