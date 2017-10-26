<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="'tabmenu'+index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="route.params.tab == index"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <scroller :pulldown-config="Interface.scroller"
              :depend="renderList"
              @on-pulldown-loading="refreshList"
              lock-x
              use-pulldown
              height="-44">
      <div class="scroller-wrap">
        <p v-if="(!renderList || renderList.length === 0) && renderPageIndex >0 " class="no-data">暂无数据</p>
        <Group v-for="(item,index) in renderList" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="goto('/invoice/detail/' + item.order_id)"/>
        </Group>
      </div>
    </scroller>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'list',
    data(){
      return {
        tabmenu: ["当日发票", "全部发票"],
        todayList: [],
        allList: [],
        todayPageIndex: 0,
        allPageIndex: 0
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ]),
      tabIndex() {
        return +this.route.params.tab
      },
      renderList() {
        return this.tabIndex ? this.allList : this.todayList
      },
      renderPageIndex(){
        return this.tabIndex ? this.allPageIndex : this.todayPageIndex
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getInvoiceList'
      ]),
      getCellTitle(item){
        let roomNumber = '';
        if (item.rooms_number && item.rooms_number.length > 0) {
          item.rooms_number.forEach(i => roomNumber += roomNumber ? ' ' + i : i);
        } else {
          roomNumber += '未选房'
        }
        return `<p><span class="cell-value">${roomNumber}</span><span class="cell-right primary">${item.order_status === 4 ? '已入住' : item.order_status === 6 ? '已离店':''}</span></p>`
      },
      getCellBody(item){
        return `<div class="cell-body">` +
          `<p><span class="cell-value">${item.owner + ' ' + item.phone_number}</span><b class="cell-right">${item.invoice_status == 2 ? '已开票' : ''}</b></p>` +
          `<p><span class="cell-value">${item.media == 'PAPER' ? '纸质发票' : '电子发票'}·${this.invoiceType(item.type)}·${item.category}</span></p>` +
          `<p><span class="cell-value">${item.title}</span></p>` +
          `<p><span class="cell-value">${this.datetimeparse(item.in_time) + '-' + this.datetimeparse(item.out_time)}</span></p>` +
          `</div>`
      },
      getList(callback) {
        this.getInvoiceList({
          scope: this.tabIndex === 0 ? 'TODAY' : 'ALL',
          invoice_status: 1,
          onsuccess: callback
        })
      },
      initList(){
        if ((!this.tabIndex && this.todayList.length === 0) || (this.tabIndex && this.allList.length === 0)) {
          this.getList(body => (this[this.tabIndex ? 'allList' : 'todayList'] = [...body.data], this.tabIndex ? this.allPageIndex++ : this.todayPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.tabIndex ? 'allList' : 'todayList'] = [...body.data])
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
    },
    watch: {
      tabIndex(val) {
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      }
    },
    mounted(){this.initList();
    }
  }

</script>
