<template>
  <div>
    <Group>
      <Cell title="房间信息" />
      <Cell>
        <div class="cell-body">
          <p v-if="data.room_no">
            <span class="cell-key2 cell-value-title">房间号：</span>
            <span class="cell-value">{{data.room_no}}</span>
          </p>
          <p v-if="data.contact_name">
            <span class="cell-key2 cell-value-title">联系人：</span>
            <span class="cell-value">{{data.contact_name}}</span>
          </p>
          <p v-if="data.contact_phone">
            <span class="cell-key2 cell-value-title">联系电话：</span>
            <span class="cell-value">{{data.contact_phone}}</span>
          </p>
          <p v-if="data.remark">
            <span class="cell-key2 cell-value-title">备注：</span>
            <span class="cell-value">{{data.remark}}</span>
          </p>
        </div>
      </Cell>
    </Group>
    <Group>
      <Cell title="发票抬头" />
      <Cell>
        <div class="cell-body">
          <p v-if="data.invoice_type">
            <span class="cell-key2 cell-value-title">类型：</span>
            <span class="cell-value">{{data.invoice_type | filterInvoiceType}}</span>
          </p>
          <p v-if="data.title">
            <span class="cell-key2 cell-value-title">名称：</span>
            <span class="cell-value">{{data.title}}</span>
          </p>
          <p v-if="data.tax_registry_no">
            <span class="cell-key2 cell-value-title">税号：</span>
            <span class="cell-value">{{data.tax_registry_no}}</span>
          </p>
          <p v-if="data.address">
            <span class="cell-key2 cell-value-title">单位地址：</span>
            <span class="cell-value">{{data.address}}</span>
          </p>
          <p v-if="data.phone_number">
            <span class="cell-key2 cell-value-title">电话号码：</span>
            <span class="cell-value">{{data.phone_number}}</span>
          </p>
          <p v-if="data.bank_name">
            <span class="cell-key2 cell-value-title">开户银行：</span>
            <span class="cell-value">{{data.bank_name}}</span>
          </p>
          <p v-if="data.bank_account">
            <span class="cell-key2 cell-value-title">银行账户：</span>
            <span class="cell-value">{{data.bank_account}}</span>
          </p>
        </div>
      </Cell>
    </Group>
    <p v-if="data.status === '1'" class="tip"><span class="tip-title">已处理：</span>{{datetimeparse(data.update_time, 'yy/MM/dd hh:mm')}}</p>
    <div class="button-group">
      <XButton :disabled="btnDisabled" :value="btnTitle" default @click.native="submit"></XButton>
    </div>
    <Dialog v-model="showDialog" confirmVal="确定" @onConfirm="dialogConfirm" confirm>
      <div>
        <div class="warning-box">
          <div class="warning"></div>
        </div>
        <p class="dialog-msg">{{dialogMsg}}</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

let timeOut = null;

let subscribeCount = 0;
let timeOutSubscribe = (cb, time, that) => {
  console.log('------ ordersSubscribed... ----------')

  if (that.yunbaConnected && !that.ordersSubscribed) {
    cb();
  } else if (subscribeCount >= 5) {
    that.dialogMsg = '网络连接异常，请重试';
    that.showDialog = true;
  } else {
    subscribeCount++;
    setTimeout(() => {
      timeOutSubscribe(cb, time, that);
    }, time);
  }
}

module.exports = {
  name: 'InvoiceDetail',
  data() {
    return {
      showDialog: false,
      publishing: false,
      messageId: 1,
      data: {},
      sender: '',
      publisher: '',
      dialogMsg: '',
      ordersSubscribed: false,
      btnTitle: '请稍候...'
    }
  },
  computed: {
    ...mapState([
      'yunbaInstance',
      'yunbaConnected',
      'AppParams'
    ]),
    btnDisabled() {
      return !(!this.publishing && this.publisher && this.ordersSubscribed)
    }
  },
  watch: {
    yunbaConnected(val) {
      val && this.publishCallback()
    },
    btnDisabled(v) {
      !v ? this.btnTitle = '填充发票信息' : this.btnTitle = '请稍候...'
    }
  },
  filters: {
    filterInvoiceType(v) {
      let val;
      switch (v) {
        case '1': 
          val = '增值税普通发票';
          break;
        case '2': 
          val = '增值税专用发票';
          break;
        case '3': 
          val = '个人发票';
          break;
        default:
          val = '增值税普通发票';
      }
      return val;
    }
  },
  methods: {
    ...mapActions([
      'goto',
      'showtoast',
      'getInvoiceDetail',
      'yunbaConnect',
      'yunbaSubscribe',
      'yunbaUnsubscribe',
      'yunbaPublish',
      'setPublishCallback',
      'showloading',
      'stoploading'
    ]),
    submit() {
      
      if (this.btnDisabled) return;
      
      let invoiceType;
      switch (this.data.invoice_type) {
        case '1': 
          invoiceType = 'GENERAL';
          break;
        case '1': 
          invoiceType = 'VAT';
          break;
        case '1': 
          invoiceType = 'PERSONAL';
          break;
        default:
          invoiceType = 'GENERAL';
      }

      let data = {
        "invoice_type": invoiceType,//发票类型
        "title": this.data.title,//抬头
        "category": "",//开票内容
        "tax_registry_no": this.data.tax_registry_no,//税号
        "address": this.data.address,//地址
        "phone_number": this.data.phone_number,  //联系电话
        "bank_name": this.data.bank_name,  //开户行名称
        "bank_account": this.data.bank_account//开户行账号
      }

      let msg = {
          "tid": this.getUUID(),
          "sender": this.sender,
          "cmd":"5101",
          "code":"0",
          "sid":"",
          "data": data
      };
      
      this.messageId = this.messageId + 1;
      if(this.messageId > 65536) this.messageId = 1;

      this.publish(msg);
    },
    dialogConfirm() {
      this.showDialog = false;

      (!this.publisher || !this.ordersSubscribed) && this.goto(0)

    },
    subscribe(topic) {
      this.yunbaSubscribe({
        info: {
          'topic': topic
        },
        subscribeCallback: () => {
          this.ordersSubscribed = true;
          console.log('subscribe', topic)
        }
      })
    },
    publish(msg) {
      this.publishing = true;

      timeOut = setTimeout(() => {
        if (this.publishing) {
          this.publishing = false;
          this.stoploading();
          this.dialogMsg = '未启动闪开发票代理服务';
          this.showDialog = true;
        }
      }, 10000)

      this.showloading();
      this.yunbaPublish({
        info: {
          'topic': this.publisher,
          // 'topic': 'devices/zhouzj01',
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
    getDetail() {
      this.getInvoiceDetail({
        id: this.$route.params.id,
        onsuccess: body => {
          if (body.data) {
            this.data = body.data;
            if (body.data.id) {
              this.sender = `invoices/${body.data.id}`;

              timeOutSubscribe(() => {
                this.subscribe(this.sender);
              }, 1000, this)
            }
            if (body.data.device_id) {
              this.publisher = `devices/${body.data.device_id}`;
            } else {
              this.showtoast('微前台插件未注册!')
            }
          } else {
            this.showtoast('详情为空!')
          }
        },
        onfail: err => {
          this.dialogMsg = '获取发票详情失败，请重新获取';
          this.showDialog = true;
        }
      })
    },
    publishCallback() {
      this.setPublishCallback({
        onSuccess: (body) => {

          console.log('---------  收到云吧消息')
          console.log(body)

          this.publishing = false;
          this.stoploading();
          clearTimeout(timeOut);

          let msg = JSON.parse(body.msg);
          let data = msg.data;

          if (msg.cmd !== '5002' || !data || !data.status)  return;

          switch (data.status) {
            case 'SUCCESS':
              this.goto(`/invoice/detail/${this.$route.params.id}/result`);
              return;
            case 'NOT_TOP':
              this.dialogMsg = '请先打开开票软件的开票页面';
              break;
            case 'FAILED':
              this.dialogMsg = '发票填充失败';
              break;
            case 'REPEATED':
              this.dialogMsg = '同一个税务发票界面重复请求操作';
              break;
            case 'BUSY':
              this.dialogMsg = '插件正在工作';
              break;
            case 'DATAERROR':
              this.dialogMsg = '发票填充失败';
              break;
            case 'SYSERROR':
              this.dialogMsg = '发票填充失败';
              break;
            default:
              this.dialogMsg = '发票填充失败';
          }
          this.showDialog = true;
        }
      })
    },
    init() {
      subscribeCount = 0;

      this.getDetail();

      if (!this.yunbaConnected) {
        this.yunbaConnect();
      } else {
        this.publishCallback()
      }
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (this.ordersSubscribed) {
      this.yunbaUnsubscribe({
        info: {
          'topic': this.sender
        },
        unSubscribeCallback: () => {
          this.ordersSubscribed = false;
          console.log('unsubscribe', this.sender);
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.cell-value-title {
  color: #8A8A8A;
}

.warning-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.warning {
  display: block;
  height: 60px;
  width: 60px;
  background: url('data:image/svg+xml;charset=utf8,<svg width="60px" height="60px" viewBox="0 0 121 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="15.发票" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="填开发票2" transform="translate(-315.000000, -399.000000)"><g id="大图标/警告" transform="translate(310.000000, 394.000000)"><path d="M126,66.2469136 C126,32.0860741 98.9139259,5 64.7530864,5 C32.0860741,5 5,32.0860741 5,66.2469136 C5,98.9139259 32.0860741,126 64.7530864,126 C98.9139259,126 126,98.9139259 126,66.2469136 Z" id="Fill-" fill="#F76260"></path><path d="M61.9973917,37 L67.0026083,37 C68.1041422,37 68.9673817,37.8944904 68.927145,38.9979003 L67.5363356,77.1379999 C67.5163345,77.6864904 67.0564136,78.1344299 66.509222,78.1344299 L62.490778,78.1344299 C61.9509752,78.1344299 61.483732,77.688313 61.4636644,77.1379999 L60.072855,38.9979003 C60.0327246,37.8974059 60.8942627,37 61.9973917,37 Z M64.5,93 C62.0147186,93 60,90.9592514 60,88.4418605 C60,85.9244695 62.0147186,83.8837209 64.5,83.8837209 C66.9852814,83.8837209 69,85.9244695 69,88.4418605 C69,90.9592514 66.9852814,93 64.5,93 Z" id="Path-" fill="#FFFFFF"></path></g></g></g></svg>')
}

.dialog-msg {
  padding: 28px 0;
}

.tip {
  padding: 10px 15px;
  font-size: 14px;
  color: #4A4A4A;
}

.tip-title {
  color: #80C435;
}

</style>
