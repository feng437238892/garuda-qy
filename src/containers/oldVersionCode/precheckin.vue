<template>
  <article class="preorder-list">
    <header class="tab-wrapper">
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in renderTabMenu"
                 :key="'tabmenu'+index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="route.params.tab == index"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <p class="synchronize">
        上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}
        <x-button mini value="同步" @onClick="syncTime"></x-button>
      </p>
      <div v-show="(!renderList||renderList.length === 0)&& renderPageIndex>0" class="no-data">暂无数据</div>
      <Group v-for="(item,index) in renderList" :key="index">
        <Cell :title="getCellTitle(item)"/>
        <Cell :title="getCellBody(item)" link @onClick="goto('/precheckin/order/detail/' + item.order_id)"/>
      </Group>
    </div>

    <footer>
      <div class="listFilter">
        <span class="filter" v-if="!isToday" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
        <span class="sort" @click="isSortShow = true">{{isSequence ? '时间正序' : '时间倒序'}}</span>
      </div>
    </footer>

    <popup v-model="isSortShow">
      <div class="sortmenu">
        <p v-for="(item,index) in sortMenu" :key="index"
           class="sortText" :class="{selected:isSequence === index}"
           @click="isSequence = index, isSortShow = false">
          <span>{{item}}</span>
        </p>
      </div>
    </popup>

    <popup v-model="isCalendarShow">
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  module.exports = {
    name: 'list',
    data(){
      return {
        // today
        todayTabMenu: ["待入住", "已取消"],
        toStayList: [],
        todayCancelList: [],
        todayCancelPageIndex: 0,
        toStayPageIndex: 0,

        // history
        historyTabMenu: ["NO-SHOW", "已取消"],
        noShowList: [],
        historyCancelList: [],
        historyCancelPageIndex: 0,
        noShowPageIndex: 0,

        // common
        isSequence: 0,
        periodFilter: [null, null],
        sortMenu: ['预订时间从晚到早', '预订时间从早到晚'],
        isSortShow: false,
        isCalendarShow: false
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
      ]),
      isToday(){
        return !!this.$route.path.match(/today/)
      },
      tabIndex(){
        return +this.route.params.tab
      },
      renderTabMenu() {
        return this.isToday ? this.todayTabMenu : this.historyTabMenu
      },
      renderList(){
        return this.isToday
          ? this.tabIndex
            ? this.todayCancelList
            : this.toStayList
          : this.tabIndex
            ? this.historyCancelList
            : this.noShowList
      },
      renderPageIndex(){
        return this.isToday
          ? this.tabIndex
            ? this.todayCancelPageIndex
            : this.toStayPageIndex
          : this.tabIndex
            ? this.historyCancelPageIndex
            : this.noShowPageIndex
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'gettodaylist',
        'gethistorylist',
        'hotelrefresh'
      ]),
      getCellTitle(item){
        let alertdom = item.status.is_recording_success ? `` : `<span class="cell-right warn">入账失败</span>`
        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${alertdom}</p>`
      },
      getCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let time = this.datetimeparse(item.timeline.precheckin_done, this.isToday ? 'hhmm' : 'MMddhhmm')
        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span><span class="cell-key cell-right">${time}</span></p>` +
          `</div>`
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath);
      },
      getTodayList(callback){
        this.gettodaylist({
          is_cancelled: this.tabIndex,
          is_sequence: this.isSequence,
          onsuccess: callback
        })
      },
      getAllList(callback){
        this.gethistorylist({
          is_cancelled: this.tabIndex,
          is_sequence: this.isSequence,
          start: this.periodFilter[0],
          end: this.periodFilter[1],
          onsuccess: callback
        })
      },
      getList(){
        this.isToday
          ?
          this.getTodayList(body => (this[this.tabIndex ? 'todayCancelList' : 'toStayList'] = [...body.data], this.tabIndex ? this.todayCancelPageIndex++ : this.toStayPageIndex++))
          :
          this.getAllList(body => (this[this.tabIndex ? 'historyCancelList' : 'noShowList'] = [...body.data], this.tabIndex ? this.historyCancelPageIndex++ : this.noShowPageIndex++))
      },
      initList(){
        if (!this.renderList.length) {
          this.getList()
        }
      },
      refreshList(){
        this.getList()
      },
      resetList() {
        this.todayCancelList = []
        this.toStayList = []
        this.historyCancelList = []
        this.noShowList = []
      },
      resetFilter() {
        console.log('resetFilter')
        this.periodFilter = [null, null]
      },
      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      }
    },
    watch: {
      tabIndex(val) {
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      },
      isSequence() {
        this.resetList();
        this.getList();
      },
      periodFilter() {
        this.resetList();
        this.getList();
        this.isCalendarShow = false;
      }
    },
    activated(){
      this.initList()
    }
  }
</script>
