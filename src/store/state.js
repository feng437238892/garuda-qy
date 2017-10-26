module.exports = {
  AppParams: {
    session: ''
  },
  Interface: {
    scroller: {
      content: '下拉刷新列表',
      height: 60,
      autoRefresh: false,
      downContent: '下拉刷新列表',
      upContent: '释放刷新',
      loadingContent: '加载中...',
      clsPrefix: 'xs-plugin-pulldown-'
    },
    toast: {
      show: false,
      text: '操作成功'
    },
    loading: {
      show: false
    },
    progress: {
      show: false,
      isOk:false
    }
  },
  hotel: {
    // hotel_id:'c336ea2b2b5911e780ad5cb9018d9b5c'
  },
  roomNumberList: [],
  yunbaInstance: new Yunba({
    appkey: '581202f86cf991dc38fd2078',
    server: 'https://sock.yunba.io',
    port: '443'
  }),
  yunbaConnected: false,
  deviceId:''
};
