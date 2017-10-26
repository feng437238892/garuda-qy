module.exports = {
  getroomtypelist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/room_type_list',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
    })
  },
  getfloorlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/floor_list',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: () => null
    })
  },
  getroomlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/list',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setroomstatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/status',
      method: 'POST',
      body: {
        room_ids: param.room_ids,
        room_status: param.room_status
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setroomenabledpick(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/enabled_pick',
      method: 'POST',
      body: {
        room_ids: param.room_ids,
        enabled: param.enabled
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setroominout(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/inout',
      method: 'POST',
      body: {
        room_id: param.room_id,
        action: param.action
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  cancelsuborder(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/cancel_suborder',
      method: 'POST',
      param: {
        room_id: param.room_id,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

}
