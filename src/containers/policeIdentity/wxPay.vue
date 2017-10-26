<template>
  <article>
    <div class="wx-pay-container">
      <ul class="pay-list">
        <li class="list-item">
          <label class="item-left">房费</label>
          <span class="input-wrapper">
            <span class="price-icon">￥</span>
            <input class="item-right room-fee" v-model="roomFee"/>
          </span>
        </li>
        <li class="list-item">
          <label class="item-left">押金</label>
          <span class="input-wrapper">
            <span class="price-icon">￥</span>
            <input class="item-right deposit" v-model="deposit"/>
          </span>
        </li>
        <li class="list-item">
          <span class="item-left">总计：</span>
          <span class="item-right total-fee"><span class="total-icon">￥</span>{{totalFee}}</span>
        </li>
      </ul>
      <x-button value="确定" primary @onClick="getwxPay"></x-button>
    </div>

    <div class="custom-dialog" v-if="showDialog">
      <div class="dialog-mask"></div>
      <div class="dialog-container">
        <p class="dialog-content" v-if="!(wxPayStatus == 'SUCCESS' || wxPayStatus == 'FAILED' || errCode == '403')">
          等待支付......</p>
        <p v-if="cmd == '5001' && wxPayStatus == 'SUCCESS'" class="dialog-content" style="color: #80C435;">支付成功</p>
        <p v-if="cmd == '5001' && wxPayStatus == 'FAILED'" class="dialog-content">支付失败</p>
        <p v-if="cmd == '4000' && errCode == '403'" class="dialog-content">设备被占用, 请重试</p>
        <p class="dialog-btn" @click="dialogBtnClick">{{dialogBtnText}}</p>
      </div>
    </div>
    <!--<Toast v-model="isToastShow" title="操作成功" timer='100'/>-->
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    data(){
      return {
        roomFee: 0,
        deposit: 0,
        publishCbMessage: [],
        showDialog: false,
        orderId: '',
        cmd: '',
        wxPayStatus: '',
        errCode: '',
//        isToastShow: false
        messageId: 1,
        ordersSubscribed: false
      }
    },
    computed: {
      ...mapState([
        'yunbaInstance',
        'yunbaConnected',
        'AppParams',
        'deviceId'
      ]),
      totalFee() {
        let r1, r2, m;
        let arg1 = this.roomFee;
        let arg2 = this.deposit;
        try {
          r1 = arg1.toString().split(".")[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split(".")[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));//10的几次幂
        return (parseInt(arg1 * m, 10) + parseInt(arg2 * m, 10)) / m
      },
      dialogBtnText() {
        if (this.wxPayStatus === 'SUCCESS' || this.wxPayStatus === 'FAILED') {
          return '确定'
        } else if (this.errCode == 403) {
          return '重试';
        } else {
          return '取消'
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'yunbaConnect',
        'yunbaSubscribe',
        'yunbaUnsubscribe',
        'yunbaPublish',
        'setPublishCallback',
        'wxPayConfirm'
      ]),
      dialogBtnClick() {
        if (this.dialogBtnText === '重试') {
          this.cmd = '';
          let sender = 'orders/' + this.orderId;
          let cmd = '3074';// 3074 支付订单二维码
          let data = {
            "order_id": this.orderId
          };
          this.messageId = this.messageId + 1;
          if (this.messageId > 65536) this.messageId = 1;
          console.log(sender, cmd, data, this.messageId);
          if (this.yunbaConnected) this.publish(sender, cmd, data);
        } else if (this.wxPayStatus === 'SUCCESS') {
          this.resetData();
          this.showDialog = false;
          this.goto('/new-identity/handle/1'); //成功后跳转列表页
        } else if (this.dialogBtnText === '取消') {
          let sender = 'orders/' + this.orderId;
          let cmd = '3002';//重置魔镜
          let data = {
            "order_id": this.orderId
          };
          this.messageId = this.messageId + 1;
          if (this.messageId > 65536) this.messageId = 1;
          console.log(sender, cmd, data, this.messageId);

          if (this.yunbaConnected) this.publish(sender, cmd, data);
          this.showDialog = false;
        } else if (this.wxPayStatus === 'FAILED') {
          this.resetData();
          this.showDialog = false;
        }
      },
      getwxPay() {
        console.log(this.roomFee, this.deposit);
        if ((+this.roomFee) >= 0 && (+this.deposit) >= 0) {
          this.wxPayConfirm({
            identity_id: this.$route.params.identityId,
            room_fee: Math.round(this.roomFee * 100),//房费
            deposit: Math.round(this.deposit * 100),
            onsuccess: (body) => {
              console.log(body);
              if (body.data) {
                this.orderId = body.data;
                console.log(this.orderId);
                if (this.yunbaConnected) this.subscribe(this.orderId);
                let sender = 'orders/' + this.orderId;
                let cmd = '3074';// 3074 支付订单二维码
                let data = {
                  "order_id": this.orderId
                };
                this.messageId = this.messageId + 1;
                if (this.messageId > 65536) this.messageId = 1;
                console.log(sender, cmd, data, this.messageId);

                if (this.yunbaConnected) this.publish(sender, cmd, data);
                setTimeout(() => {
                  this.showDialog = true;
                }, 200);
              }
            }//押金
          })
        }
      },
      subscribe(topic) {
        this.yunbaSubscribe({
          info: {
            'topic': 'orders/' + this.orderId //orders/{order_id}
          },
          subscribeCallback: () => {
            this.ordersSubscribed = true;
            console.log('subscribe', 'orders/' + this.orderId)
          }
        })
      },
      publish(sender, cmd, data) {
        let msg = {
          "tid": this.getUUID(),
          "sender": sender,//orders/{order_id}
          "cmd": cmd, //指令编号
          "code": "0",
          "data": data
        };
        this.yunbaPublish({
          info: {
            'topic': 'devices/' + this.deviceId,
            'msg': JSON.stringify(msg),
            'opts': {
              'qos': 1,
              'time_to_live': 5,
              'messageId': this.messageId
            }
          },
          publishCallback: () => console.log('publish', msg)
        })
      },
      resetData() {
        this.cmd = '';
        this.errCode = '';
        this.wxPayStatus = '';
      }
    },
    mounted() {
      this.yunbaConnect();
    },
    watch: {
      roomFee(val, oldVal) {
        if (isNaN(val)) this.roomFee = oldVal
      },
      deposit(val, oldVal) {
        if (isNaN(val)) this.roomFee = oldVal
      },
      yunbaConnected(val) {
        val && this.setPublishCallback({
          onSuccess: (data) => {
//            this.resetData();
            let messageCbInfo = JSON.parse(data.msg);
            console.log(messageCbInfo);
            if (messageCbInfo.cmd === '3021') return;
            if (messageCbInfo.cmd) this.cmd = messageCbInfo.cmd;
            if (messageCbInfo.data && messageCbInfo.data.code) this.errCode = messageCbInfo.data.code;
            if (messageCbInfo.data && messageCbInfo.data.status) this.wxPayStatus = messageCbInfo.data.status;
          }
        })
      }
    },
    activated() {
      if (this.wxPayStatus === 'SUCCESS') {
        this.resetData();
        this.roomFee = 0;
        this.deposit = 0;
        this.showDialog = false;
      }
      if (this.wxPayStatus === 'FAILED') {
        this.resetData();
        this.showDialog = false;
      }
    },
    deactivated() {
      this.showDialog = false;
      this.roomFee = 0;
      this.deposit = 0;
      if (this.ordersSubscribed) {
        this.yunbaUnsubscribe({
          info: {
            'topic': 'orders/' + this.orderId //orders/{order_id}
          },
          unSubscribeCallback: () => {
            console.log('unsubscribe', 'orders/' + this.orderId);
            this.ordersSubscribed = false;
          }
        })
      }

    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
