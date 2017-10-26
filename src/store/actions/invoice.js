/**
 * Created by lisj on 2017/4/9.
 * 发票
 */
module.exports = {
  //lsj老版本发票
  // getInvoiceList(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/invoice_apply',
  //     params: {
  //       invoice_status: param.invoice_status,
  //       scope: param.scope
  //     },
  //     onSuccess: (body) => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // getInvoiceDetail(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/invoice_apply/invoice_apply_id',
  //     onSuccess: (body) => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     },
  //     onFail: () => console.log('发票请求失败')
  //   })
  // },
  confirmInvoice(ctx, param) {
    ctx.dispatch('resource', {
      url: '/invoice_apply/' + param.invoice_apply_id + '/invoice_status',
      method: 'PATCH',
      body: {
        invoice_status: param.invoice_status
      },
      onSuccess: (body) => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  //闪开发票
  getInvoiceList(ctx, param){
    ctx.dispatch('resource', {
      url: '/getInvoiceList',
      // method:'GET',
      // headers: {
      //   'X-Current-Page': param.page || '1',
      //   'X-Page-Size': param.size || '0'
      // },
      params: {
        status: param.status || 0,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  getInvoiceDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: `/getInvoice`,
      // method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: err => {
        param.onfail ? param.onfail(err) : null
      }
    })
  },
  invoiceComplete(ctx, param){
    ctx.dispatch('resource', {
      url: '/udpateStatus',
      // method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
