module.exports = {
  login(ctx, param){
    if (sessionStorage.session_id && sessionStorage.hotel_id) {
      ctx.commit('SESSION', sessionStorage.session_id)
      ctx.commit('HOTEL', {'hotel_id': sessionStorage.hotel_id});
      console.log('STORAGE: ', sessionStorage.session_id, sessionStorage.hotel_id)
    } else {
      ctx.dispatch('resource', {
        url: "/login",
        method: "POST",
        body: {
          code: ctx.state.AppParams.code,
          corpid: ctx.state.AppParams.state
        },
        onSuccess: (body) => {
          console.log('LOGIN: ', body.data.session_id, body.data.hotel_id)
          sessionStorage.session_id = body.data.session_id
          ctx.commit('SESSION', body.data.session_id);
          if (typeof body.data.hotel_id === 'string') {
            sessionStorage.hotel_id = body.data.hotel_id
            ctx.commit('HOTEL', {'hotel_id': body.data.hotel_id});
          }
        }
      })
    }
  }
}
