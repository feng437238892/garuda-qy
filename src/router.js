import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const prepay = [{
  path: '/prepay',
  component: {
    name: "prepay",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/prepay/list.vue')
  }, {
    path: 'detail/:id',
    component: require('./containers/prepay/detail.vue')
  }]
}];

const receive = [{
  path: '/receive',
  component: {
    name: 'receive',
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'precheckin',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'livein',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'checkout-application',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'checkout',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'precheckin-detail/:id/:parameter',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/prereg_detail.vue')
  }, {
    path: 'livein-detail/:id/:parameter',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/livein_detail.vue')
  }, {
    path: 'checkout-application-detail/:id/:parameter',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/check_appli_detail.vue')
  }, {
    path: 'checkout-detail/:id/:parameter',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/checkout_detail.vue')
  }]
}];

const policeIdentity = [{
  path: '/policeIdentity',
  component: {
    name: 'policeIdentity',
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'handle/:tab',
    component: require('./containers/policeIdentity/list')
  },
    // {
    //   path: 'wxPay/:identityId',
    //   component: require('./containers/policeIdentity/wxPay')
    // },
    {
      path: ':id',
      component: require('./containers/policeIdentity/detail')
    }]
}];

const identity = [{
  path: '/identity',
  component: {
    name: 'identity',
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/identity/list')
  }, {
    path: 'todo/:id',
    component: require('./containers/identity/todo')
  },{
    path: 'detail/:id',
    component: require('./containers/identity/detail')
  }]
}];

const bill = [{
  path: '/bill',
  component: {
    name: "bill",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/bill.vue')
  }, {
      path: 'receipt/detail/:id',
      component: require('./containers/detail.vue')
    }, {
      path: 'refund/detail/:id',
      component: require('./containers/detail.vue')
    }]
}];

//闪开发票
const invoice = [{
  path: '/invoice',
  component: {
    name: "invoice",
    template: `<router-view/>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/invoice/index.vue')
  }, {
    path: 'detail/:id',
    component: require('./containers/invoice/detail.vue')
  }, {
    path: 'detail/:id/result',
    component: require('./containers/invoice/result.vue')
  }]
}];

const unchained = [{
  path: '/roommanager',
  component: require('./containers/unchained/ROOMMANAGER')
}, {
  path: '/record',
  component: {
    name: "record",
    template: `<router-view/>`,
  },
  children: [{
    path: '/',
    component: require('./containers/unchained/RECORD/list.vue')
  }, {
    path: 'new',
    component: require('./containers/unchained/RECORD/detail.vue')
  }, {
    path: ':id',
    component: require('./containers/unchained/RECORD/detail.vue')
  }]
}];

const others = [
  {
    path: '/',
    component: require('./containers/default.vue')
  },{
    path: '/home',
    component: require('./containers/home/home.vue')
  }, {
    path: '/examples',
    component: require('./containers/examples.vue')
  }, {
    path: '/404',
    component: require('./containers/404.vue')
  }, {
    path: '/*',
    redirect: '/'
  }
];

export default new VueRouter({
  mode: 'history',
  routes: [...unchained, ...prepay, ...receive, ...policeIdentity, ...identity, ...invoice, ...bill, ...others]
})

// const precheckin = [{
//   path: '/precheckin',
//   component: {
//     name: "precheckin",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'prepay/:tab',
//     component: require('./containers/prepay/list.vue')
//   }, {
//     path: 'prepay/detail/:id',
//     component: require('./containers/prepay/detail.vue')
//   }, {
//     path: 'order/today/:tab',
//     component: require('./containers/precheckin.vue')
//   }, {
//     path: 'order/history/:tab',
//     component: require('./containers/precheckin.vue')
//   }, {
//     path: 'order/detail/:id',
//     component: require('./containers/detail.vue')
//   }]
// }];

// const checkIn = [{
//   path: '/identity',
//   component: {
//     name: "identity",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'today/:tab',
//     component: require('./containers/identity/list')
//   }, {
//     path: 'history/:tab',
//     component: require('./containers/identity/list')
//   }, {
//     path: 'todo/:id',
//     component: require('./containers/identity/todo')
//   }, {
//     path: ':id',
//     component: require('./containers/identity/detail')
//   }]
// }, {
//   path: '/new-identity',
//   component: {
//     name: "policeIdentity",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'handle/:tab',
//     component: require('./containers/policeIdentity/list')
//   },
//     // {
//     //   path: 'wxPay/:identityId',
//     //   component: require('./containers/policeIdentity/wxPay')
//     // },
//     {
//       path: ':id',
//       component: require('./containers/policeIdentity/detail')
//     }]
// }, {
//   path: '/livein',
//   component: {
//     name: "livein",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'today',
//     component: require('./containers/livein.vue')
//   }, {
//     path: 'all',
//     component: require('./containers/livein.vue')
//   }, {
//     path: ':id',
//     component: require('./containers/detail.vue')
//   }]
// }];
// const checkout = [{
//   path: '/checkout',
//   component: {
//     name: "checkout",
//     template: `<keep-alive><router-view/></keep-alive>`
//   },
//   children: [{
//     path: ':tab',
//     component: require('./containers/checkout.vue')
//   }, {
//     path: 'detail/:id',
//     component: require('./containers/detail.vue')
//   }]
// }];

//ljs的老版发票
// const invoice = [{
//   path: '/invoice',
//   component: {
//     name: "invoice",
//     template: `<router-view/>`,
//   },
//   children: [{
//     path: ':tab',
//     component: require('./containers/invoice.vue')
//   }, {
//     path: 'detail/:id',
//     component: require('./containers/detail.vue')
//   },]
// }];




