/**
 * Created by lisj on 2017/8/2.
 */
module.exports = {
  yunbaConnect(ctx, param) {
    ctx.state.yunbaInstance.init((success) => {
      if (success) {
        console.log('yunba init');
        ctx.state.yunbaInstance.connect_by_customid(ctx.state.AppParams.session, (success) => {
          if (success) {
            console.log('yunba connect');
            ctx.commit('ISYUNBACONNECTED', true);
          }
        })
      }
    })
  },
  yunbaDisconnect(ctx, param){
    ctx.state.yunbaInstance.disconnect(function (success, msg) {
      if (success) {
        console.log('yunba disconnect',success);
        param.disconnectCallback ? param.disconnectCallback() : null
      } else {
        console.log(msg);
      }
    })
  },
  yunbaSubscribe(ctx, param) {
    ctx.state.yunbaInstance.subscribe(param.info, function (success, msg) {
      if (success) param.subscribeCallback ? param.subscribeCallback() : null
    })
  },
  yunbaUnsubscribe(ctx, param) {
    ctx.state.yunbaInstance.unsubscribe(param.info, function (success, msg) {
      if (success) param.unSubscribeCallback ? param.unSubscribeCallback() : null
    })
  },
  yunbaPublish(ctx, param) {
    ctx.state.yunbaInstance.publish2(param.info, function (success, msg) {
      if (success) param.publishCallback ? param.publishCallback() : null
    })
  },
  setPublishCallback(ctx, param) {
    ctx.state.yunbaInstance.set_message_cb(function (data) {
      param.onSuccess ? param.onSuccess(data) : null
    })
  }
};
