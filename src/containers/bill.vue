<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabMenu'+index"
                 :selected="route.params.tab == index"
                 @on-item-click="replaceto('/bill/'+index)">{{item}}
        </TabItem>
      </Tab>
    </header>
    <div class="list-wrapper">
      <div>
        <div v-show="(!renderList||renderList.length === 0)&& renderPageIndex>0" class="no-data">暂无数据</div>

        <Group v-if="!currentTab"
               v-for="(item,index) in renderList"
               :key="index"
               :title="titleFilter(index)">
          <Cell :title="getReceiptBody(item)" link @onClick="goto('/bill/receipt/detail/'+item.order_id)"/>
        </Group>

        <Group v-if="currentTab"
               v-for="(item,index) in renderList"
               :key="index"
               :title="titleFilter(index)">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="goto('/bill/refund/detail/'+item.order_id)"/>
        </Group>

      </div>
    </div>

    <footer>
      <div class="listFilter">
        <span class="filter" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
      </div>
    </footer>

    <popup v-model="isCalendarShow">
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default{
    name: 'bill',
    data(){
      return {
//        tabMenu: ['收款', '退款'],
        receiptList: [], //收款列表
        refundList: [],  //退款列表
        receiptPageIndex: 0,
        refundPageIndex: 0,
        isCalendarShow: false,
        periodFilter: []
      }
    },
    computed: {
      ...mapState([
        'hotel',
        'route'
      ]),
      currentTab() {
        return parseInt(this.route.params.tab)
      },
      tabMenu() {
        let menu = [];
        menu[0] = `收款(${this.receiptList.length})`;
        menu[1] = `退款(${this.refundList.length})`;
        return menu;
      },
      renderList() {
        return this.currentTab ? this.sortByTime(this.refundList, 'created_time') : this.sortByTime(this.receiptList, 'created_time')
      },
      renderPageIndex() {
        return this.currentTab ? this.refundPageIndex : this.receiptPageIndex
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getrefundlist',
        'getreceiptlist'
      ]),
      titleFilter(index){
        return index
          ? this.datetimeparse(this.renderList[index].created_time) === this.datetimeparse(this.renderList[index - 1].created_time)
            ? null : this.datetimeparse(this.renderList[index].created_time)
          : this.datetimeparse(this.renderList[index].created_time)
      },
      getReceiptBody(item){
        return `<p class="cell-custom-container"><span class="cell-key4">房间</span><span class="cell-right">${item.room_numbers.join()}</span></p>` +
          `<p class="cell-custom-container"><span class="cell-key4">客人姓名</span><span class="cell-right">${item.name}</span></p>` +
          `<p class="cell-custom-container"><span class="cell-key4">支付金额</span><span class="cell-right">${this.cashHandling(item.pay_fee)}</span></p>` +
          `<p class="cell-custom-container"><span class="cell-key4">支付方式</span><span class="cell-right">${item.pay_way}</span></p>` +
          `<p class="cell-custom-container"><span class="cell-key4">支付时间</span><span class="cell-right">${this.datetimeparse(item.pay_time, 'YYMMDD hhmm')}</span></p>` +
          `<p class="cell-custom-container"><span class="cell-key4">订单号</span><span class="cell-right">${item.out_trade_no}</span></p>`
      },
      getCellTitle(item){
        let refurndStatus = item.status;
        let refurndStatusDom = ``;
        if (refurndStatus) {
          refurndStatusDom = refurndStatus === 'FAILED'
            ? `<span class="cell-right warn">退款失败</span>`
            : refurndStatus === 'REFUNDED'
              ? `<span class="cell-right primary">已退款</span>` : ''
        }
        return `<p><span class="cell-value">${item.room_numbers}</span>${refurndStatusDom}</p>`
      },
      getCellBody(item){
        return `<p><span class="cell-value">微信支付：${this.cashHandling(item.pay_fee)}</span></p>` +
          `<p><span class="cell-value">退款金额：${this.cashHandling(item.refund_fee)}</span><span class="cell-right gray">${this.datetimeparse(item.created_time, 'hhmm')}</span></p>`;
      },
      getList(callback){
        this.currentTab
          ?
          this.getrefundlist({
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ?this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1]:'',
            onsuccess: callback
          })
          :
          this.getreceiptlist({
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ?this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1]:'',
            onsuccess: callback
          })
      },
      refreshList(){
        this.getList(body => this.currentTab ? this.refundList = [...body.data] : this.receiptList = [...body.data]);
      },
      resetFilter() {
        this.periodFilter = []
      },
      resetList() {
        this.receiptList = [];
        this.refundList = [];
      },
      initList(){
        if (this.renderList.length === 0) {
          this.getreceiptlist({
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: body => (this.receiptList = [...body.data], this.receiptPageIndex++)
          });
          this.getrefundlist({
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: body => (this.refundList = [...body.data], this.refundPageIndex++)
          });

        }
      }
    },
    watch: {
      periodFilter(val) {
        if (val[0] && val[1]) this.refreshList();
        this.resetList = [];
        this.isCalendarShow = false;
      },
      currentTab(val) {
        this.resetFilter();
        !isNaN(val) && typeof val == 'number'
          ? this.renderList.length == 0 ? this.initList() : this.refreshList()
          : null
      }
    },
    mounted(){
      this.initList();
    }
  }
</script>
