<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="currentTab === index"
                 @click.native="replaceto('/prepay/'+index)">{{item}}
        </TabItem>
      </Tab>
      <div class="batchbar" v-if="batch">
        <span class="allpick" :class="{batch:batchlist.length === tobeconfirmed.length}" @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <div class="list-wrapper">
      <p class="synchronize">
        <x-button mini value="同步" @onClick="syncTime"></x-button>
        上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}
      </p>

      <div v-show="!currentTab" :class="{batch}">
        <p v-show="(!tobeconfirmed||tobeconfirmed.length === 0) && tobeConfirmedPageIndex > 0" class="no-data">暂无数据</p>
        <checker type="checkbox" v-model="batchlist"
                 default-item-class="checker-item" selected-item-class="selected">
          <checker-item v-for="(item,index) in tobeconfirmed" :key="index" :value="item.order_id">
            <Group>
              <Cell :title="getCellTitle(item)"/>
              <Cell :title="getCellBody(item)" link @onClick="orderClick(item.order_id)"/>
              <Cell v-if="item.remark" :title="getCellFooter(item)"/>
            </Group>
          </checker-item>
        </checker>
      </div>

      <div v-show="currentTab">
        <p v-show="(!confirmed||confirmed.length === 0) && confirmedPageIndex > 0" class="no-data">暂无数据</p>
        <Group v-for="(item,index) in confirmed" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="orderClick(item.order_id)"/>
          <Cell v-if="item.remark" :title="getCellFooter(item)"/>
        </Group>
      </div>
    </div>

    <footer v-show="route.params.tab == 0 && tobeconfirmed.length !== 0 && tobeConfirmedPageIndex > 0">
      <div class="button-group">
        <x-button v-if="batch" value="未支付" @onClick="setMultiConfirm" warn/>
        <x-button class="blue-btn" v-else @onClick="goPick" value="未支付批量处理"/>
      </div>
    </footer>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepay",
    data(){
      return {
//        tabmenu: ["待确认", "已确认"],
        batch: false,
        batchlist: [],
        tobeconfirmed: [],
        confirmed: [],
        tobeConfirmedPageIndex: 0,
        confirmedPageIndex: 0
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
      ]),
      currentTab(){
        return parseInt(this.route.params.tab)
      },
      renderList(){
        return this.currentTab ? this.confirmed : this.tobeconfirmed
      },
      tabMenu() {
        let menu = [];
        menu[0] = `待确认(${this.tobeconfirmed.length})`;
        menu[1] = `已确认(${this.confirmed.length})`;
        return menu;
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getconfirmelist',
        'multiconfirm',
        'hotelrefresh',
      ]),
      confirmMode(item){
        return item.payinfo
          ? item.payinfo.confirm_mode === 2 ? '(手动确认)' : ''
          : ''
      },
      getCellTitle(item){
        let paystatus = item.payinfo.pay_mode;
        let paystatusdom = ``
        if (paystatus) {
          paystatusdom = paystatus === 1
            ? `<span class="cell-right other">现付 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
            : paystatus === 2
              ? `<span class="cell-right primary">预付 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
              : `<span class="cell-right warn" style="display: flex;flex-direction: column;text-align: right">后付/挂账/公账等 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
        }

        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${paystatusdom || ''}</p>`
      },
      getCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let paiddom = item.payinfo.staff_pay !== null ? `<span class="cell-right"><span class="cell-key">已付：</span>${'¥' + (item.payinfo.staff_pay / 100 || 0)}</span>` : ``

        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `</div>`
      },
      getCellFooter(item){
        return `<p><span class="cell-key">备注：</span><span class="cell-value">${item.remark}</span></p>`
      },
      goPick(){
        // 批量选择
        this.batchlist = []
        this.batch = true
      },
      cancelPick(){
        // 退出批量选择
        this.batchlist = []
        this.batch ? this.batch = false : null
      },
      allPick(){
        // 全选和取消全选
        if (this.batchlist.length === this.tobeconfirmed.length) {
          this.batchlist = []
        } else {
          this.batchlist = [];
          this.tobeconfirmed.forEach(
            item => this.batchlist.push(item.order_id)
          )
        }
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/prepay/detail/' + orderId)
        }
      },
      setMultiConfirm() {
        if (this.batchlist.length != 0) {
          this.multiconfirm({
            order_ids: this.batchlist,
            onsuccess: () => {
              this.batchlist.forEach(item => {
                let tempIndex = this.tobeconfirmed.findIndex(i => i.order_id === item);
                tempIndex > -1
                  ? this.tobeconfirmed.splice(tempIndex, 1)
                  : null
              });

              this.cancelPick()
            }
          })
        }
      },
      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      },
      getList(status,callback){
        this.getconfirmelist({
          status: status,
          onsuccess: callback
        })
      },
      initList(){
        if(this.renderList.length === 0) {
          this.getList(0,body => (this.tobeconfirmed = [...body.data],this.tobeConfirmedPageIndex++))
          this.getList(1,body => (this.confirmed = [...body.data],this.confirmedPageIndex++))
        }
      },
      refreshList(){
        this.getList(this.currentTab,body => this.currentTab ? this.confirmed = [...body.data] : this.tobeconfirmed = [...body.data])
      }
    },
    watch: {
      currentTab: function (val, oldval) {
        this.cancelPick();
        typeof val === 'number' && !isNaN(val)
          ? this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList(): this.refreshList()
          :null;
      }
    },
    mounted(){
      this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList(): this.refreshList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
