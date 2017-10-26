<template>
  <article>
    <div class="confirmeddetail" v-if="isNotEmpty(orderdetail)">
      <p class="synchronize">上次同步PMS时间: {{datetimeparse(orderdetail.update_time, 'MMDDhhmm')}}</p>
      <Group>
        <Cell title="预订信息"/>
        <Cell :title="getCellBody()"/>
      </Group>
      <Group>
        <Cell title="PMS支付信息"/>
        <Cell :title="getCellBodyPMS()"/>
        <Cell :title="getCellFooter()"/>
      </Group>

      <Group>
        <Cell v-if="payMode" :title="payInfo"/>
        <Cell class="key" title="免押金" :value="isfreeDeposit ? '是' : '否'"/>
      </Group>

      <div class="button-group">
        <x-button value="预付"
                  primary
                  @onClick="staffpayConfirm(2)"/>
        <x-button value="后付/挂账/公付等"
                  warn
                  @onClick="staffpayConfirm(3)"/>
        <x-button value="现付"
                  @onClick="staffpayConfirm(1)"
                  plain/>
      </div>
    </div>
    <Dialog v-model="showDialog"
            @onConfirm="setSingleConfirm"
            confirm
            cancel>
      <div class="choose">
        <label>{{dialogStatus === 2 ? '是否确认该订单已经预付？' : dialogStatus === 1 ? '是否确认该订单为现付？' : '是否确认该订单为后付/挂账/公付等？'}}</label>
        <checker type="checkbox" v-model="batchlist" default-item-class="checker-item" selected-item-class="selected">
          <checker-item value="isfreeDeposit">免押金</checker-item>
          <checker-item v-if="dialogStatus === 2" value="otherPrice">输入其他金额</checker-item>
        </checker>
        <input type="number"
               :disabled="inputDisabled"
               v-if="dialogStatus === 2"
               v-model.number='inputValue'
               class="money"
               :placeholder="orderdetail.payinfo ? cashHandling(orderdetail.payinfo.total_roomfee,'总房费'):null">
      </div>
    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepaydetail",
    data(){
      return {
        orderdetail: {},
        showDialog: false,
        dialogStatus: null,
        inputValue: null,
        batchlist: []
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      confirmMode(){
        return this.orderdetail.payinfo
          ? this.orderdetail.payinfo.confirm_mode === 2 ? '(手动确认)' : ''
          : ''
      },
      payInfo() {
        if (this.payMode === 2) {
          return `<div class="cell-body">` +
            `<p><span class="cell-key3">已确认</span><span style="font-size: 14px; color: #4a4a4a;" class="cell-right ">预付<abbr style="color: #80C435">` + this.cashHandling(this.orderdetail.payinfo.staff_pay) + `</abbr> ${this.confirmMode}</span></p>` +
            `</div>`
        } else if (this.payMode === 1) {
          return `<div class="cell-body">` +
            `<p><span class="cell-key3">已确认</span><span class="cell-right "><abbr style="color: #5077AA; font-size: 14px">现付</abbr> ${this.confirmMode}</span></p>` +
            `</div>`
        } else if (this.payMode === 3) {
          return `<div class="cell-body">` +
            `<p><span class="cell-key3">已确认</span><span class="cell-right "><abbr style="font-size: 14px;color: #DF4A4A;">后付/挂账/公账等</abbr> ${this.confirmMode}</span></p>` +
            `</div>`
        }
      },
      payMode(){
        return this.orderdetail.payinfo ? this.orderdetail.payinfo.pay_mode : null
      },
      isfreeDeposit(){
        return this.orderdetail.status ? this.orderdetail.status.is_free_deposit : null
      },
      inputDisabled(){
        return !this.batchlist.some(i => i === 'otherPrice')
      },
      confirmFormData(){
        let staff_prepay = 0;
        if (this.dialogStatus === 2) {
          this.batchlist.some(i => i === 'otherPrice')
            ? staff_prepay = this.inputValue ? Math.round(this.inputValue * 100) : this.orderdetail.payinfo.total_roomfee
            : staff_prepay = this.orderdetail.payinfo.total_roomfee
        }
        return {
          staff_prepay: staff_prepay,
          is_free_deposit: this.batchlist.some(i => i === 'isfreeDeposit'),
          pay_mode: this.dialogStatus
        }
      }
    },
    methods: {
      ...mapActions([
        'getorderdetail',
        'singleconfirm'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      },
      getCellBody(){
        let roomtypewords = ''
        this.orderdetail.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        return `<div class="cell-body">` +
          `<p><span class="cell-key2">订单号：</span><span class="cell-value">${this.orderdetail.order_pmsid}</span></p>` +
          `<p><span class="cell-key2">预订人：</span><span class="cell-value">${this.orderdetail.owner}</span></p>` +
          `<p><span class="cell-key2">手机号：</span><span class="cell-value">${this.orderdetail.owner_tel}</span></p>` +
          `<p><span class="cell-key2">入离时间：</span><span class="cell-value">${this.datetimeparse(this.orderdetail.in_time)}- ${this.datetimeparse(this.orderdetail.out_time)}</span></p>` +
          `<p><span class="cell-key2">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `</div>`
      },
      getCellBodyPMS(){
        return `<div class="cell-body">` +
          `<p><span class="cell-key">应付房费：</span><span class="cell-value">${this.cashHandling(this.orderdetail.payinfo.total_roomfee)}</span></p>` +
          `<p><span class="cell-key">PMS预付：</span><span class="cell-value">${this.cashHandling(this.orderdetail.payinfo.pms_pay)}</span></p>` +
          `</div>`
      },
      getCellFooter(){
        return `<p><span class="cell-key3">备注：</span><span class="cell-value">${this.orderdetail.remark}</span></p>`
      },
      staffpayConfirm(paystatus){
        this.showDialog = true;
        this.dialogStatus = paystatus;
      },
      setSingleConfirm () {
        this.singleconfirm({
          order_id: this.orderdetail.order_id,
          staff_prepay: this.confirmFormData.staff_prepay,
          is_free_deposit: this.confirmFormData.is_free_deposit,
          pay_mode: this.confirmFormData.pay_mode,
          onsuccess: () => this.getDetail()
        })
      },
      getDetail(){
        this.getorderdetail({
          order_id: this.$route.params.id,
          roomfee: 0,
          suborder: 0,
          invoice: 0,
          log: 0,
          onsuccess: body => this.orderdetail = body.data
        })
      },
      reset(){
        this.orderdetail = {};
        this.batchlist = [];
      }
    },
    watch: {
      showDialog(val, oldV) {
        oldV ? (this.dialogStatus = null) : null
      },
      isfreeDeposit(val){
        val ?
          this.batchlist.every(i => i !== 'isfreeDeposit') ? this.batchlist.push('isfreeDeposit') : null
          : null
      },
      payMode(val){
        if (val === 2 && this.orderdetail.payinfo.staff_pay !== this.orderdetail.payinfo.total_roomfee) {
          this.batchlist.push('otherPrice');
          this.inputValue = this.orderdetail.payinfo.staff_pay / 100
        }
      },
      batchlist(val){
        val.every(i => i !== 'otherPrice') ? this.inputValue = null : null
      }
    },
    activated(){
      this.reset()
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
