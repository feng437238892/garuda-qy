<template>
  <div class="home-container">

    <Group title="待办事项" v-if="isHaveTodoList">

      <Cell v-if="prepayTodoNum > 0" icon="../../../static/icon/ic_prepay_confirm.png" title="订单金额待确认" link :badge="prepayTodoNum"
            @onClick="goto('prepay/0')"></Cell>
      <Cell v-if="identityNum > 0" icon="../../../static/icon/ic_police.png" title="您有一条公安验证待处理" link :badge="identityNum"
            @onClick="goto('/identity/0')"></Cell>
      <Cell v-if="policeIdentityNum > 0" icon="../../../static/icon/ic_lvye.png" title="旅业信息待上传" link :badge="policeIdentityNum"
            @onClick="goto('policeIdentity/handle/0')"></Cell>
      <Cell v-if="invoiceNum > 0" icon="../../../static/icon/ic_invoice.png" title="开票申请待处理" link :badge="invoiceNum"
            @onClick="goto('invoice/0')"></Cell>
      <Cell v-if="checkoutApplicationNum > 0" icon="../../../static/icon/ic_checkout.png" title="离店申请待处理" link :badge="checkoutApplicationNum"
            @onClick="goto('receive/checkout-application')"></Cell>
    </Group>

    <div v-else class="none-list-container">
      <img src="../../../static/icon/no_todo_list.png" alt="">
      <span>暂无待办事项</span>
    </div>

    <div class="app">
      <Group title="应用">
        <ul class="app-container">
          <li class="app-item" @click="goto('prepay/0')">
            <img src="../../../static/icon/ic_prepay_confirm.png" alt="订单中心">
            <span class="app-title">订单中心</span>
            <!--<div class="warn">-->
            <!--<span class="warn-dot"></span>-->
            <!--<span>异常</span>-->
            <!--</div>-->
          </li>
          <li class="app-item" @click="goto('receive/precheckin')">
            <img src="../../../static/icon/ic_checkout.png" alt="接待服务">
            <span class="app-title">住离信息</span>
          </li>
          <li class="app-item" @click="goto('/identity/0')">
            <img src="../../../static/icon/ic_police.png" alt="公安验证">
            <span class="app-title">入住核验</span>
          </li>
          <li class="app-item" @click="goto('/policeIdentity/handle/0')">
            <img src="../../../static/icon/ic_lvye.png" alt="身份核验">
            <span class="app-title">设备核验</span>
          </li>
          <li class="app-item" @click="goto('/invoice/0')">
            <img src="../../../static/icon/ic_invoice.png" alt="闪开发票">
            <span class="app-title">发票中心</span>
          </li>
          <li class="app-item" @click="goto('/bill/0')">
            <img src="../../../static/icon/ic_bill.png" alt="账务管理">
            <span class="app-title">账务管理</span>
          </li>
        </ul>
      </Group>
    </div>



  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        List: [],
        prepayTodoNum: 0,
        identityNum: 0,
        policeIdentityNum: 0,
        invoiceNum: 0,
        checkoutApplicationNum: 0,
      }
    },
    computed: {
      ...mapState([
        'hotel',
        'yunbaInstance',
        'yunbaConnected',
      ]),
      isHaveTodoList() {
        return this.prepayTodoNum > 0 || this.identityNum > 0 || this.policeIdentityNum > 0 || this.invoiceNum > 0 || this.checkoutApplicationNum > 0
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'hoteltodolist',
        'yunbaConnect',
        'yunbaSubscribe',
        'yunbaUnsubscribe',
        'yunbaPublish',
        'setPublishCallback',
      ]),
      setPlay(){
        document.querySelector('#audio').play();
      },
      getTodoList() {
        this.hoteltodolist({
          onsuccess: body => {
            let list = body.data;
            list.forEach(i => {
                if(i.type == 'PREPAY') this.prepayTodoNum = i.total;
                if(i.type == 'IDENTITY') this.identityNum = i.total;
                if(i.type == 'LVYE') this.policeIdentityNum = i.total;
                if(i.type == 'INVOICE') this.invoiceNum = i.total;
                if(i.type == 'CHECKOUT') this.checkoutApplicationNum = i.total;
            })
          }
        })
      },
      subscribe() {
        this.yunbaSubscribe({
          info: {
            'topic': `hotels/${this.hotel.hotel_id}/todo`
          },
          subscribeCallback: () => {
            console.log('subscribe', `hotels/${this.hotel.hotel_id}/todo`);
            this.publishCallback();
          }
        })
      },
      publishCallback() {
        this.setPublishCallback({
          onSuccess: (body) => {
            console.log('---------  收到云吧消息',JSON.parse(body.msg));
            let data = JSON.parse(body.msg);
            this.setPlay();
            if(data.type == 'PREPAY') this.prepayTodoNum = data.total;
            if(data.type == 'IDENTITY') this.identityNum = data.total;
            if(data.type == 'LVYE') this.policeIdentityNum = data.total;
            if(data.type == 'INVOICE') this.invoiceNum = data.total;
            if(data.type == 'CHECKOUT') this.checkoutApplicationNum = data.total;
          }
        })
      },
//      云吧链接
      init() {
        this.getTodoList();
        if (!this.yunbaConnected) {
          this.yunbaConnect();
        }
      }
    },
    mounted(){
      this.init();
    },
    watch: {
      yunbaConnected(val) {
        val && this.subscribe()
      }
    },
    beforeDestroy() {
      if (this.yunbaConnected) {
        this.yunbaDisconnect({
          disconnectCallback: () => {
            console.log('unsubscribe');
            this.$store.commit('ISYUNBACONNECTED', false);
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./home.less";
</style>
