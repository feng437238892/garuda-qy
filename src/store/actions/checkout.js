module.exports = {
  //退房申请列表
  getcheckoutlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout',
      params: {
        status: param.status,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //PMS退房
  pmscheckout(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout/' + param.id + '/pms',
      method: 'PUT',
      onSuccess: body => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
};
