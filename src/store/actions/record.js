module.exports = {
  //获取录入修改的订单列表 /order/record
  getrecord(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/record',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 获取订单来源列表 /order/source
  getsourcelist(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/source',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //录入新订单 /order/record
  newRecord(ctx, param) {
    ctx.dispatch('resource', {
      url: '/order/record',
      method: 'POST',
      body: {...param},
      onSuccess: body => {
        // ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //修改订单
  modifyRecord(ctx, param){
    console.log(param)
    ctx.dispatch('resource', {
      url: '/order/record/' + param.order_id,
      method: 'PUT',
      body: {...param},
      onSuccess: body => {
        // ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //删除订单
  deleteRecord(ctx, order_id){
    ctx.dispatch('resource', {
      url: '/order/record/' + order_id,
      method: 'DEL',
      onSuccess: body => {
        // ctx.dispatch('showtoast');
        ctx.dispatch('goto',-1);
      }
    })
  }
}
