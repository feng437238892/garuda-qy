<template>
  <article>

    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabMenu'+index"
                 :selected="tempPage == item.split('(')[0]"
                 @on-item-click="toggleTab(item)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <!--<p class="synchronize">-->
      <!--<x-button mini value="同步" @onClick="syncTime"></x-button>-->
      <!--上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}-->
      <!--</p>-->

      <div v-show="(!renderList||renderList.length === 0) && renderPageIndex>0" class="no-data">暂无数据</div>

      <Group v-if="tempPage == '预登记'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="preCheckInCellTitle(item)"/>
        <Cell :title="preCheckInCellBody(item)" link @onClick="goto('/receive/precheckin-detail/' + item.order_id+'/'+getParameter)"/>
      </Group>

      <Group v-if="tempPage == '在住'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="liveInCellTitle(item)"/>
        <Cell :title="liveInGuestItem(item)" link @onClick="goto('/receive/livein-detail/'+item.order_id+'/'+getParameter)"/>
      </Group>

      <Group v-if="tempPage == '退房申请'" v-for="(item,index) in renderList" :key="index"
             :title="titleFilter(index)">
        <Cell :title="checkoutCellTitle(item)"/>
        <Cell :title="getCheckoutGuestItem(item)" link
              @onClick="goto('/receive/checkout-application-detail/'+item.order_id+'/'+getParameter)"/>
      </Group>

      <Group v-if="tempPage == '已离店'" v-for="(item,index) in renderList" :key="index"
             :title="titleFilter(index)">
        <Cell :title="checkoutCellTitle(item,index)"/>
        <!--<Cell :title="getGuestItem(item)" link @onClick="goto('/receive/checkout-detail/'+item.order_id)"/>-->
        <Cell :title="getLeaveItem(item)" link @onClick="goto('/receive/checkout-detail/'+item.order_id+'/'+getParameter)"/>
      </Group>
    </div>

    <footer v-if="tempPage == '已离店'">
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
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'receive',
    data() {
      return {
//        tabMenu: ['预登记', '在住', '退房申请', '已离店'],
        preCheckInList: [],
        liveInList: [],
        checkOutApplicationList: [],
        checkOutList: [],
        preCheckInPageIndex: 0,
        liveInPageIndex: 0,
        checkOutApplicationPageIndex: 0,
        checkoutPageIndex: 0,
        isCalendarShow: false,
        periodFilter: [null, null]
      }
    },
    computed: {
      ...mapState([
        'route',
        'hotel'
      ]),
      tabMenu() {
        let menu = [];
        menu[0] = `预登记(${this.preCheckInList.length})`;
        menu[1] = `在住(${this.liveInList.length})`;
        menu[2] = `退房申请(${this.checkOutApplicationList.length})`;
        menu[3] = `已离店(${this.checkOutList.length})`;
        return menu;
      },
      getParameter(){
        let tempRoute = this.route.path.split('/')[2];
        return tempRoute
      },
      tempPage(){
        let tempRoute = this.route.path.split('/')[2];
        switch (tempRoute) {
          case 'precheckin':
            tempRoute = '预登记';
            break;
          case 'livein':
            tempRoute = '在住';
            break;
          case 'checkout-application':
            tempRoute = '退房申请';
            break;
          case 'checkout':
            tempRoute = '已离店';
            break;
        }
        console.log(tempRoute);
        return tempRoute
      },
//      离店信息上传失败----》入住信息上传旅业失败
      renderList() {
        if (this.tempPage == '预登记') {
          return this.sortByTime(this.preCheckInList, 'in_time');
        } else if (this.tempPage == '在住') {
          return this.sortByTime(this.liveInList, 'in_time');
          return sortLiveInList;
        } else if (this.tempPage == '退房申请') {
          return this.sortByTime(this.checkOutApplicationList, 'created_time');
          return sortCheckOutApplicationList;
        } else if (this.tempPage == '已离店') {
          return this.sortByTime(this.checkOutList, 'created_time');
        }
      },
      renderPageIndex(){
        if (this.tempPage == '预登记') {
          return this.preCheckInPageIndex;
        } else if (this.tempPage == '在住') {
          return this.liveInPageIndex;
        } else if (this.tempPage == '退房申请') {
          return this.checkOutApplicationPageIndex;
        } else if (this.tempPage == '已离店') {
          return this.checkoutPageIndex;
        }
      },
      unionTag() {
        let totalList = [...this.renderList];
        let tagList = [];
        totalList.forEach(item => {
            if (item.union_tag) {
              let tagIndex = tagList.findIndex(i => i.tag === item.union_tag);
              tagIndex === -1
                ? tagList.push({tag: item.union_tag, room_number: [item.room_number]})
                : tagList[tagIndex].room_number = [...tagList[tagIndex].room_number, item.room_number]
            }
          }
        );
        return tagList;
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'hotelrefresh',
        'gettodaylist',
        'getTodaySuborder',
        'getcheckoutlist'
      ]),
      toggleTab(item){
        let tempItem = item.split('(')[0];
        switch (tempItem) {
          case '预登记':
            this.replaceto('/receive/precheckin');
            break;
          case '在住':
            this.replaceto('/receive/livein');
            break;
          case '退房申请':
            this.replaceto('/receive/checkout-application');
            break;
          case '已离店':
            this.replaceto('/receive/checkout');
            break;
        }
      },
      preCheckInCellTitle(item){
        let alertdom = item.status.is_recording_success ? `` : `<span class="cell-right warn">入账失败</span>`;
        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${alertdom}</p>`
      },
      preCheckInCellBody(item){
        let roomtypewords = '';
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count));
        let time = this.datetimeparse(item.timeline.precheckin_done, this.isToday ? 'hhmm' : 'MMddhhmm');
        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` + `</div>`
      },
      liveInCellTitle(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.in_time, this.isToday ? 'hhmm' : 'MMddhhmm')}</span></p>`
      },
      liveInGuestItem(item){
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
          })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        !item.lvye_report_status || item.lvye_report_status === 'FAILED' ? dom += `<p style="color:#DF4A4A;">入住信息上传旅业失败</p>` : null
        !item.lvye_report_status || item.lvye_report_status === 'NONE' ? dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>` : null
        return dom
      },
      checkoutCellTitle(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.created_time, this.isCompleted ? 'MMddhhmm' : 'hhmm')}</span></p>`
      },
      getCheckoutGuestItem(item){
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
          })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        if (item.status) {
          if (!(item.status.checkout_success && item.status.refund_success && item.status.lvye_checkout_success)) {
            dom += `<div style="display: flex;color: #DF4A4A;line-height: 2;justify-content: flex-start">`;
            if (!item.status.checkout_success) dom += `<span style="margin-right:10px">退房失败</span>`;
            if (!item.status.refund_success) dom += `<span style="margin-right:10px">退款失败</span>`;
            if (!item.status.lvye_checkout_success) dom += `<span style="margin-right:10px">旅业系统上传失败</span>`;
            dom += `</div>`;
          }
        }
        return dom
      },
      getLeaveItem(item){
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
          })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        if (item.status) {
          dom += `<div style="display: flex;color: #DF4A4A;line-height: 2;justify-content: flex-start">`;
          if (item.status.lvye_checkout_status === 'NONE') dom += `<span style="margin-right:10px">未上传旅业系统</span>`;
          if (item.status.lvye_checkout_status === 'FAILED') dom += `<span style="margin-right:10px">旅业系统上传失败</span>`;
          dom += `</div>`;

        }
        return dom
      },
      getUnionTag(tag, tempRoom){
        return this.unionTag.filter(i => i.tag === tag)[0].room_number.filter(i => i !== tempRoom).join(',')
      },
      resetFilter() {
        console.log('resetFilter');
        this.periodFilter = [null, null]
      },
      titleFilter(index){
        return index
          ? this.datetimeparse(this.renderList[index].created_time) === this.datetimeparse(this.renderList[index - 1].created_time)
            ? null : this.datetimeparse(this.renderList[index].created_time)
          : this.datetimeparse(this.renderList[index].created_time)
      },
//      syncTime() {
//        this.hotelrefresh({
//          onsuccess: (body) => this.refreshList()
//        })
//      },
      getList(callback){
        if (this.tempPage == '预登记') {
          this.gettodaylist({
            is_cancelled: 0,
            is_sequence: 0,
            onsuccess: callback
          })
        } else if (this.tempPage == '在住') {
          this.getTodaySuborder({
            onsuccess: callback
          })
        } else if (this.tempPage == '退房申请') {
          this.getcheckoutlist({
            status: 'PENDING',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1],
            onsuccess: callback
          });
        } else if (this.tempPage == '已离店') {
          this.getcheckoutlist({
            status: 'DONE',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: callback
          });
        }
      },
      initList() {
        if (this.renderPageIndex === 0 || this.renderList.length == 0) {
          this.gettodaylist({
            is_cancelled: 0,
            is_sequence: 0,
            onsuccess: body => (this.preCheckInList = [...body.data], this.preCheckInPageIndex++)
          });
          this.getTodaySuborder({
            onsuccess: body => (this.liveInList = [...body.data], this.liveInPageIndex++)
          });
          this.getcheckoutlist({
            status: 'PENDING',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: body => (this.checkOutApplicationList = [...body.data], this.checkOutApplicationPageIndex++)
          });
          this.getcheckoutlist({
            status: 'DONE',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: body => (this.checkOutList = [...body.data], this.checkoutPageIndex++)
          });
        }
      },
      refreshList(){
        if (this.tempPage == '预登记') {
//          this.resetList();
          this.getList(body => this.preCheckInList = [...body.data]);
        } else if (this.tempPage == '在住') {
//          this.resetList();
          this.getList(body => this.liveInList = [...body.data]);
        } else if (this.tempPage == '退房申请') {
//          this.resetList();
          this.getList(body => this.checkOutApplicationList = [...body.data]);
        } else if (this.tempPage == '已离店') {
//          this.resetList();
          this.getList(body => this.checkOutList = [...body.data]);
        }
      },
      resetList() {
        if (this.tempPage == '预登记') {
          this.preCheckInList = [];
        } else if (this.tempPage == '在住') {
          this.liveInList = [];
        } else if (this.tempPage == '退房申请') {
          this.checkOutApplicationList = [];
        } else if (this.tempPage == '已离店') {
          this.checkOutList = [];
        }
      }
    },
    mounted(){
      this.initList();
    },
    watch: {
      tempPage(val) {
        this.periodFilter = [null, null];
        this.renderList.length == 0 ? this.initList() : this.refreshList();
      },
      periodFilter(val) {
        val[0] && val[1] && this.refreshList();
        this.isCalendarShow = false;
      }
    }
  }
</script>
