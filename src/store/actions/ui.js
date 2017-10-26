module.exports = {
  showtoast(ctx, text){
    ctx.commit('TOAST',
      {
        show: true,
        text: text ? text : '操作成功'
      }
    )
  },
  showprogress(ctx, param){
    ctx.commit('PROGRESS',
      {
        show: param.show,
        isOk: param.isOk
      }
    )
  },
  showloading(ctx, text){
    ctx.commit('LOADING', 1)
  },
  stoploading(ctx, text){
    ctx.commit('LOADING')
  },
}
