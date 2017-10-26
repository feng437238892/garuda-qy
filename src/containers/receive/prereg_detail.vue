<!--预登记详情-->
<template>
  <article class="detail">
    <div v-if="detail">
      <p class="synchronize">上次同步PMS时间: {{datetimeparse(detail.update_time, 'MMDDhhmm')}}</p>
      <div class="synchronize" v-if="isPreCheckin && detail.status && !detail.status.is_recording_success">
        <span class="record-tip">入账失败</span>
        <XButton value="已手工入账" warn @onClick="confirmPmsResult"></XButton>
      </div>

      <Group :title="isPreCheckin ?'预订信息':'主单信息'">
        <Cell class="key" title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell class="key" title="预订人" :value="detail.owner"></Cell>
        <Cell class="key" title="手机号" :value="detail.owner_tel"></Cell>
        <Cell class="key" title="入离时间"
              :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
        <Cell class="key" title="房型" :value="getRoomType(detail)"></Cell>
      </Group>
      <Group title="PMS支付信息" v-if="detail.payinfo">
        <Cell class="key" title="应付房费" :value="cashHandling(detail.payinfo.total_roomfee)"></Cell>
        <Cell class="key" title="PMS预付" :value="cashHandling(detail.payinfo.staff_pay)"></Cell>
        <Cell class="key" title="备注" :value="detail.remark ? detail.remark : '无'"></Cell>
        <Cell class="key" title="免押金" :value="detail.status.is_free_deposit ?'是':'否'"></Cell>
      </Group>
      <Group title="支付信息" v-if="detail.bill && detail.bill.payment">
        <Cell class="key" title="微信交易号" :value="detail.bill.payment && detail.bill.payment.wx_order_id"></Cell>
        <Cell class="key" title="微信支付" :value="cashHandling(detail.bill.payment && detail.bill.payment.pay_fee)"></Cell>
        <Cell class="key" title="交易时间"
              :value="datetimeparse(detail.bill.payment && detail.bill.payment.pay_time,'YYYYMMDDhhmm')"></Cell>
      </Group>
      <Group title="房间信息"
             v-for="(item,index) in detail.suborders"
             :key="'guests'+index">
        <Cell
          :title="`<div style='color: #4a4a4a'>${(item.room_number || '未选房')+ ' ' + item.room_type_name + ' ' +getBreakFast(item.breakfast)}</div>`"></Cell>
        <Cell :title="getGuestItem(item)" v-if="item.guests && item.guests.length > 0"/>
        <Cell :title="getNOGuestItem" v-if="!item.guests"/>
      </Group>

      <Group title="发票信息" v-if="!isLivein && detail.invoice">
        <Cell class="key" title="领取方式" :value="detail.invoice.media == 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
        <Cell class="key" title="开票类型" :value="invoiceType(detail.invoice.type)"></Cell>
        <Cell class="key" title="开票内容" :value="detail.invoice.category"></Cell>
        <Cell class="key" title="发票抬头" :value="detail.invoice.title"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="统一社会信用代码"
              :value="detail.invoice.tax_registry_no"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="地址" :value="detail.invoice.address"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="联系电话" :value="detail.invoice.phone_number"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="开户银行" :value="detail.invoice.bank_name"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="银行账号" :value="detail.invoice.bank_account"></Cell>

        <div class="button-group" v-if="isShowInvoiceBtn">
          <XButton value="登记开票" default @onClick="showDialog = true"
                   v-if="detail.invoice.invoice_status === 1"></XButton>
          <p v-if="detail.invoice.invoice_status === 2" class="tips">已确认开票。</p>
        </div>
      </Group>

      <Dialog v-model="showDialog" @onConfirm="setInvoiceConfirm" confirm cancel>
        <p>是否已开发票？</p>
      </Dialog>

      <Dialog v-model="showCheckoutDialog" @onConfirm="pmsCheckout" confirm cancel>
        <p>该操作会联动PMS退房，旅业退房，及退款。是否继续操作？</p>
      </Dialog>

      <Dialog v-model="showRefundDialog" @onConfirm="refundApply" confirm cancel>
        <p>是否退款</p>
      </Dialog>

    </div>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'detail',
    data() {
      return {
        detail: {},
        showDialog: false,
        showCheckoutDialog: false,
        showRefundDialog: false,
        refundValue: null,
        pmsCheckoutId: '',
      }
    },
    computed: {
      getNOGuestItem(){
        return "<div>入住人身份证信息未登记</div>";
      },
      routeId() {
        return this.$route.params.id
      },
      routeParameter(){
        return this.$route.params.parameter
      },
      getPath(){
        return this.$route.path.split('/')[2];
      },
      isPreCheckin() {//预登记
        return /precheckin/.test(this.$route.path)
      },
      isReceipt() {
        return /receipt/.test(this.$route.path)
      },
      isShowInvoiceBtn() {
        return this.isInvoice || this.isCheckout || this.isRefund
      },
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'conformPmsSync',
        'pmscheckout',
        'confirmInvoice',
        'refundapply',
        'setUploadStatus',
        'setLeaveStatus'
      ]),
      roomInfoTitleIndex(detail){
        return detail.suborders.findIndex(i => i.guests && i.guests.length > 0)
      },

      isShowCheckoutDialog(id) {
        this.showCheckoutDialog = true;
        this.pmsCheckoutId = id;
      },
      //手工入账
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.routeId,
//          action: 'SETACCOUNT',
          onsuccess: body => {
            this.detail.status.is_recording_success = true;
            this.getDetail()
          }
        })
      },
      //确认开票
      setInvoiceConfirm() {
        this.confirmInvoice({
          invoice_apply_id: this.detail.invoice.id,
          invoice_status: 2,
          onsuccess: () => this.getDetail()
        })
      },
      getDetail() {
        this.getorderdetail({
          order_id: this.routeId,
          newAddParameter:this.routeParameter,
          roomfee: 0,
          suborder: 1,
          invoice: 1,
          log: 1,
          bill: 1,
          onsuccess: body => {
            this.detail = body.data
          }
        })
      },
    },
    watch: {
      routeId(val) {
        val ? this.getDetail() : null
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>
