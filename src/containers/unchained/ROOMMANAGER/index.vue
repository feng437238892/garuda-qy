<template>
  <article>
    <header>
      <Tab>
        <TabItem v-for="(item,index) in tabmenu"
                 :value="item"
                 :key="index"
                 :selected="tabSelected === item"
                 @onSelected="tabSelected = item"/>
      </Tab>
      <div class="toolbar" v-show="isBatch == false">
        <div :class="{reverse:showFloorList}" @click="showFloorList = !showFloorList, showRoomTypeList = false">{{floorFilter}}
        </div>
        <div :class="{reverse:showRoomTypeList}" @click="showRoomTypeList = !showRoomTypeList, showFloorList = false">
          {{roomTypeFilter}}
        </div>
        <div @click="isBatch = true, showRoomTypeList = false, showFloorList = false">批量选择</div>
      </div>
      <div class="cancelbar" v-show="isBatch == true">
        <div @click="isBatch = false, batchlist = [], showRoomTypeList = false, showFloorList = false">取消</div>
      </div>
    </header>

    <scroller v-show="tabSelected == '备选房'"
              :depend="[roomlist]"
              :pulldown-config="Interface.scroller"
              height="-86"
              use-pulldown
              lock-x>
      <section class="rooms-container">
        <checker class="rooms clearfix"
                 :class="{isBatch}"
                 v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in roomlist"
                        :class="{disabled:item.room_status == 2}"
                        :key="item.room_id"
                        :value="item.room_id"
                        v-show="isRoomShow(item)">
            <div class="room-wrap" @click="roomClick(item)">
              <div class="room-item" :class="'roomstatus' + item.room_status">
                <p>{{getRoomTypeName(item.room_type_id)}}</p>
                <p>{{item.room_number}}</p>
                <p>{{item.guest_name || item.owner_name}}</p>
              </div>
            </div>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller v-show="tabSelected == '所有房'"
              :depend="[roomlist]"
              :pulldown-config="Interface.scroller"
              height="-86"
              use-pulldown
              lock-x>
      <section>
        <checker class="rooms clearfix"
                 :class="{isBatch}"
                 v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in roomlist"
                        :key="item.room_id"
                        :value="item.room_id"
                        v-show="isRoomShow(item)">
            <div class="room-wrap" @click="roomClick(item)">
              <div class="room-item" :class="item.config.enabled_pick ? 'enable':''">
                <p>{{getRoomTypeName(item.room_type_id)}}</p>
                <p>{{item.room_number}}</p>
                <p>{{item.guest_name || item.owner_name}}</p>
              </div>
            </div>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <footer>
      <section v-if="isBatch" class="buttons">
        <div v-show="tabSelected == '备选房'" class="botton-wrap">
          <x-button value="设为空净" primary @onClick="setMultipleRoomStatus(0)"/>
        </div>
        <div v-show="tabSelected == '备选房'" class="botton-wrap">
          <x-button value="设为空脏" @onClick="setMultipleRoomStatus(1)"/>
        </div>
        <div v-show="tabSelected == '所有房'" class="botton-wrap">
          <x-button value="设为备选" primary @onClick="setMultiRoomEnabledPick(true)"/>
        </div>
        <div v-show="tabSelected == '所有房'" class="botton-wrap">
          <x-button value="移除备选" @onClick="setMultiRoomEnabledPick(false)"/>
        </div>
      </section>
      <ul v-else>
        <li v-for="(item,index) in statusFilter"
            v-if="tabSelected == '备选房'"
            :key="'statusFilter'+index"
            class="pickable"
            :class="{active:item.active}"
            @click="statusFilterCurrent = item.status">
          <p>{{item.name}}</p><span>{{item.count}}</span>
        </li>
        <li v-for="(item,index) in allStatusFilter"
            v-if="tabSelected == '所有房'"
            :class="{active:item.active}"
            @click="allStatusFilterCurrent = item.status">
          <p>{{item.name}}</p><span>{{item.count}}</span>
        </li>
      </ul>
    </footer>

    <popup v-model="showFloorList">
      <div class="pick-box">
        <p @click="(floorFilterCurrent = null,showFloorList = false)">全部楼层</p>
        <p v-for="item in floorList" @click="(floorFilterCurrent = item.floor_id,showFloorList = false)">
          {{item.floor_name}}</p>
      </div>
    </popup>

    <popup v-model="showRoomTypeList" maskShow :top="86">
      <div class="pick-box">
        <p @click="(roomTypeFilterCurrent = null,showRoomTypeList = false)">全部房型</p>
        <p v-for="item in roomTypeList" @click="(roomTypeFilterCurrent = item.room_type_id,showRoomTypeList = false)">
          {{item.room_type_name}}
        </p>
      </div>
    </popup>

    <Dialog v-model="showDialog" class="room-status-dialog">
      <div class="payloadinfo">
        <p class="room-type">{{getRoomTypeName(payloading.room_type_id)}}</p>
        <h1 class="room-number">{{payloading.room_number}}</h1>
      </div>

      <section class="button-box">
        <div v-if="tabSelected == '所有房'">
          <x-button value="设为备选" primary @onClick="setSingleRoomEnabledPick(true)"/>
          <x-button value="移除备选" @onClick="setSingleRoomEnabledPick(false)"/>
        </div>
        <div v-else>
          <div v-if="payloading.room_status == 2">
            <x-button value="退房" alert @onClick="setRoomInout('OUT')"/>
          </div>
          <div v-else>
            <x-button value="设为空净" primary @onClick="setSingleRoomStatus(0)"/>
            <x-button value="设为空脏" @onClick="setSingleRoomStatus(1)"/>
            <x-button value="转入住" class="checkin" @onClick="setRoomInout('IN')"/>
            <x-button v-if="payloading.owner_name" value="取消订单" class="cancelorder" warn @onClick="cancelSuborder()"/>
          </div>
        </div>
      </section>
    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "roommanager",
    data(){
      return {
        tabmenu: ["备选房", "所有房"],
        tabSelected: "备选房",
        roomTypeList: [],
        floorList: [],
        roomlist: [],
        showFloorList: false,
        floorFilterCurrent: null,
        showRoomTypeList: false,
        roomTypeFilterCurrent: null,
        statusFilterCurrent: null,
        allStatusFilterCurrent: null,
        isBatch: false,
        batchlist: [],
        showDialog: false,
        payloading: {}
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ]),
      floorFilter(){
        return this.floorFilterCurrent == null
          ? '全部楼层'
          : this.floorList.filter(i => i.floor_id == this.floorFilterCurrent)[0].floor_name
      },
      roomTypeFilter(){
        return this.roomTypeFilterCurrent == null
          ? '全部房型'
          : this.roomTypeList.filter(i => i.room_type_id == this.roomTypeFilterCurrent)[0].room_type_name
      },
      statusFilter(){
        return [{
          name: '全部备选',
          count: this.roomlist.filter(i => i.config.enabled_pick).length,
          status: null,
          active: this.statusFilterCurrent == null
        }, {
          name: '预订',
          status: 3,
          count: this.roomlist.filter(i => i.config.enabled_pick && i.owner_name && i.room_status !== 2).length,
          active: this.statusFilterCurrent == 3
        }, {
          name: '空净',
          status: 0,
          count: this.roomlist.filter(i => i.config.enabled_pick && i.room_status == 0).length || 0,
          active: this.statusFilterCurrent == 0
        }, {
          name: '空脏',
          status: 1,
          count: this.roomlist.filter(i => i.config.enabled_pick && i.room_status == 1).length || 0,
          active: this.statusFilterCurrent == 1
        }, {
          name: '在住',
          status: 2,
          count: this.roomlist.filter(i => i.config.enabled_pick && i.room_status == 2).length || 0,
          active: this.statusFilterCurrent == 2
        }]
      },
      allStatusFilter(){
        return [{
          name: '全部',
          count: this.roomlist.length,
          status: null,
          active: this.allStatusFilterCurrent == null
        }, {
          name: '备选',
          count: this.roomlist.filter(i => i.config.enabled_pick).length,
          status: 1,
          active: this.allStatusFilterCurrent == 1
        }, {
          name: '未选',
          count: this.roomlist.length - this.roomlist.filter(i => i.config.enabled_pick).length,
          status: 0,
          active: this.allStatusFilterCurrent == 0
        }]
      }
    },
    methods: {
      ...mapActions([
        'getroomtypelist',
        'getfloorlist',
        'getroomlist',
        'setroomstatus',
        'setroomenabledpick',
        'setroominout',
        'cancelsuborder'
      ]),
      cancelSuborder(){
        this.cancelsuborder({
          room_id: this.payloading.room_id,
          onsuccess: () => {
            this.roomlist.forEach(i => i.room_id == this.payloading.room_id ? (i.owner_name = '', i.guest_name = '') : null)
            this.reset()
          }
        })
      },
      setRoomInout(action){
        this.setroominout({
          room_id: this.payloading.room_id,
          action: action,
          onsuccess: () => {
            this.roomlist.forEach(i => {
              i.room_id == this.payloading.room_id ?
                action == 'IN'
                  ? i.room_status = 2
                  : (i.room_status = 1, i.owner_name = '', i.guest_name = '')
                : null
            })
            this.reset()
          }
        })
      },
      setSingleRoomStatus(status){
        // 批量设置房间状态
        this.setroomstatus({
          room_ids: [this.payloading.room_id],
          room_status: status,
          onsuccess: () => {
            this.roomlist.forEach(i => i.room_id == this.payloading.room_id ? (i.room_status = status) : null)
            this.reset()
          }
        })
      },
      setMultipleRoomStatus(status){
        // 批量设置房间状态
        this.setroomstatus({
          room_ids: this.batchlist,
          room_status: status,
          onsuccess: () => {
            this.roomlist.forEach(i => this.batchlist.findIndex(item => item == i.room_id) > -1 ? (i.room_status = status) : null)
            this.reset()
          }
        })
      },
      setSingleRoomEnabledPick(enabled){
        this.setroomenabledpick({
          room_ids: [this.payloading.room_id],
          enabled: enabled,
          onsuccess: () => {
            this.roomlist.forEach(i => i.room_id == this.payloading.room_id ? (i.config.enabled_pick = enabled) : null)
            this.reset()
          }
        })
      },
      setMultiRoomEnabledPick(enabled){
        // 批量设置房间状态
        this.setroomenabledpick({
          room_ids: this.batchlist,
          enabled: enabled,
          onsuccess: () => {
            this.roomlist.forEach(i => this.batchlist.findIndex(item => item == i.room_id) > -1 ? (i.config.enabled_pick = enabled) : null)
            this.reset()
          }
        })
      },
      isRoomShow(item){
        let floor = this.floorFilterCurrent === null || this.floorFilterCurrent == item.floor_id
        let roomtype = this.roomTypeFilterCurrent === null || this.roomTypeFilterCurrent == item.room_type_id
        let status = this.statusFilterCurrent == 3 ? !!item.owner_name && item.room_status !== 2 : this.statusFilterCurrent === null || this.statusFilterCurrent == item.room_status
        let allstatus = this.allStatusFilterCurrent == null ? true
          : this.allStatusFilterCurrent == 1
            ? item.config.enabled_pick
            : !item.config.enabled_pick
        let type = this.tabSelected == '备选房' ? item.config.enabled_pick : allstatus
        return status && floor && roomtype && type
      },
      getRoomTypeName(val){
        let list = this.roomTypeList.filter(i => i.room_type_id == val)
        return list.length > 0 ? list[0].room_type_name : val
      },
      roomClick (item) {
        //非批量模式下点击房间
        if (!this.isBatch) {
          this.batchlist = []
          this.payloading = item
          this.showDialog = true
        }
      },
      reset(){
        this.floorFilterCurrent = null
        this.roomTypeFilterCurrent = null
//        this.statusFilterCurrent = null
//        allStatusFilterCurrent = null
        this.isBatch = false
        this.batchlist = []
        this.showFloorList = false
        this.showRoomTypeList = false
        this.showDialog = false
        this.payloading = {}
      },
    },
    watch: {
      tabSelected(){
        this.reset()
      }
    },
    mounted(){
      this.getroomtypelist({
        onsuccess: body => this.roomTypeList = body.data
      })
      this.getfloorlist({
        onsuccess: body => this.floorList = body.data
      })
      this.getroomlist({
        onsuccess: body => this.roomlist = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
