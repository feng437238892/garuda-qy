// ===============================================================
// 在住管理
// ===============================================================
module.exports = {
  //当日入住单列表
  getTodaySuborder(ctx, param){
    ctx.dispatch('resource', {
      url: '/suborder/today',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
    })
  },
  getAllSuborder(ctx, param){
    // 全部入住单列表
    ctx.dispatch('resource', {
      url: '/suborder/list',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
    })
  }
}
