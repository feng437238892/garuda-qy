<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabmenu'+index"
                 :selected="route.params.tab == index"
                 :class="{'vux-1px-r': index===0}"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <p class="synchronize">
        上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}
        <x-button mini value="同步" @onClick="syncTime"/>
      </p>
      <div v-show="(!renderList||renderList.length === 0)&& renderPageIndex> 0" class="no-data">暂无数据</div>
      <Group v-for="(item,index) in renderList"
             :key="index"
             :title="titleFilter(index)">
        <Cell :title="getCellTitle(item)"/>
        <Cell :title="getGuestItem(item)" link @onClick="goto('/checkout/detail/'+item.order_id)"/>
      </Group>
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
    name: 'application',
    data(){
      return {
        tabMenu: ['待处理', '已完成'],
        pendingList: [],
        completedList: [],
        pendingPageIndex: 0,
        completedPageIndex: 0,
        isCalendarShow: false,
        periodFilter: [],
      }
    },
    computed: {
      ...mapState([
        'route',
        'hotel'
      ]),
      isCompleted(){
        return +this.route.params.tab;
      },
      renderList(){
        return this.isCompleted ? this.completedList : this.pendingList;
      },
      renderPageIndex(){
        return this.isCompleted ? this.completedPageIndex : this.pendingPageIndex;
      },
      unionTag() {
        let totalList = this.isCompleted ? this.completedList : this.pendingList;
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
        'getcheckoutlist'
      ]),
      resetFilter() {
        this.periodFilter = [null, null]
      },
      titleFilter(index){
        return index
          ? this.datetimeparse(this[this.isCompleted?'completedList':'pendingList'][index].created_time) === this.datetimeparse(this[this.isCompleted?'completedList':'pendingList'][index - 1].created_time)
            ? null : this.datetimeparse(this[this.isCompleted?'completedList':'pendingList'][index].created_time)
          : this.datetimeparse(this[this.isCompleted?'completedList':'pendingList'][index].created_time)
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath);
      },
      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      },
      getUnionTag(tag, tempRoom){
        return this.unionTag.filter(i => i.tag === tag)[0].room_number.filter(i => i !== tempRoom).join(',')
      },
      getCellTitle(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.created_time, this.isCompleted ? 'MMddhhmm' : 'hhmm')}</span></p>`
      },
      resetList() {
        this.completedList = [];
        this.pendingList = [];
      },
      getList(callback) {
        this.getcheckoutlist({
          status: this.isCompleted ? 'DONE' : 'PENDING',
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1],
          onsuccess: callback
        });
      },
      initList(){
        if ((this.isCompleted && !this.completedList.length) || (!this.isCompleted && !this.pendingList.length)) {
          this.getList(body => (this[this.isCompleted ? 'completedList' : 'pendingList'] = [...body.data], this.isCompleted ? this.completedPageIndex++ : this.pendingPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.isCompleted ? 'completedList' : 'pendingList'] = [...body.data]);
      },
    },
    activated() {
      this.initList();
    },
    watch: {
      isCompleted(val){
        typeof val === 'number' && !isNaN(val) ? this.initList() : null;
      },
      periodFilter() {
        this.resetList();
        this.refreshList();
        this.isCalendarShow = false;
      }
    }
  }
</script>
