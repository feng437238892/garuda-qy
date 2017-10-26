<template>
  <article>
    <scroller lock-x :depend=[detail]>
      <section class="wrap">
        <Group>
          <XInput title="订单号" v-model="detail.order_pmsid"/>
          <Cell title="订单来源" :value="getSourceName(detail.source_id)" @onClick="isSourceListShow = true" link/>
        </Group>

        <Group title="预订人信息">
          <XInput title="姓名" v-model="detail.owner"/>
          <XInput title="手机号" type="number" v-model="detail.owner_tel"/>
        </Group>

        <Group title="房间信息">
          <Cell title="房型" :value="getRoomTypeName(detail.room_type_id)" @onClick="isRoomTypeListShow = true" link/>
          <Cell title="入住时间" :value="datetimeparse(detail.in_time)"
                @onClick="isCalendarShow = true, calendarType = 'IN'"
                link/>
          <Cell title="离店时间" :value="datetimeparse(detail.out_time)"
                @onClick="isCalendarShow = true, calendarType = 'OUT'"
                link/>
          <XInput title="房价￥"
                  type="number"
                  v-model="item.price"
                  v-for="(item,index) in detail.room_price"
                  :key="'roomPrice'+index"
                  :placeholder="datetimeparse(item.date)"/>
        </Group>

        <Group v-if="detail.room_type_id">
          <Cell title="房间数量" :value="detail.room_count" @onClick="isRoomCountShow = true" link/>
          <Cell title="房号"
                :value="item"
                v-for="(item,index) in detail.room_numbers"
                :key="'roomNumbers'+index"
                @onClick="isRoomPickShow = true, roomNumberIndex = index"
                link/>
        </Group>

        <Group title="预付/备注">
          <XInput title="金额" v-model="detail.staff_pay"></XInput>
          <XTextarea placeholder="备注" v-model="detail.remark"></XTextarea>
        </Group>

        <div class="button-group">
          <XButton v-if="orderId" value="修改" @onClick="modifyRecord(submitData)"></XButton>
          <XButton v-if="orderId" value="删除" warn @onClick="deleteRecord(orderId)"></XButton>
          <XButton v-else value="添加" @onClick="newRecord(submitData)"></XButton>
        </div>
      </section>
    </scroller>

    <Actionsheet v-model="isSourceListShow" :menu="sourceMenu" @onClick="toggleSource" cancel/>
    <Actionsheet v-model="isRoomTypeListShow" :menu="roomTypeMenu" @onClick="toggleRoomType" cancel/>
    <Actionsheet v-model="isRoomCountShow" :menu="[1,2,3,4]" @onClick="toggleRoomCount" cancel/>
    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-if="calendarType === 'IN'" v-model="detail.in_time" @onCancel="isCalendarShow = false"/>
      <calendar v-if="calendarType === 'OUT'" v-model="detail.out_time" @onCancel="isCalendarShow = false"
                :min="detail.in_time + 86400000"/>
    </popup>

    <Dialog v-model="isRoomPickShow" title="选择房间" cancel>
      <p v-if="cleanRoomForPick.length">空净房</p>
      <section class="roompick-group">
        <div class="clean" v-for="item in excludePickedRoom(cleanRoomForPick)">
          <p @click="toggleRoomNumber(item.room_number)">{{item.room_number}}</p>
        </div>
      </section>
      <p v-if="dirtyRoomForPick.length">空脏房</p>
      <section class="roompick-group">
        <div class="dirty" v-for="item in excludePickedRoom(dirtyRoomForPick)">
          <p @click="toggleRoomNumber(item.room_number)">{{item.room_number}}</p>
        </div>
      </section>
    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        sourcelist: [],
        roomtypelist: [],
        roomlist: [],
        isSourceListShow: false,
        isRoomTypeListShow: false,
        isCalendarShow: false,
        isRoomCountShow: false,
        isRoomPickShow: false,
        calendarType: null,
        roomNumberIndex: null,


        detail: {
          order_pmsid: '',
          source_id: '',
          owner: '',
          owner_tel: '',
          room_type_id: '',
          in_time: Date.parse(new Date()),
          out_time: Date.parse(new Date()) + 86400000,
          room_price: [{
            date: Date.parse(new Date()),
            price: '',
          }],
          room_count: 1,
          room_numbers: [''],
          staff_pay: null
        },
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      orderId(){
        return this.route.params.id
      },
      sourceMenu(){
        let list = [];
        this.sourcelist.forEach(i => list.push(i.source_name));
        return list
      },
      roomTypeMenu(){
        let list = [];
        this.roomtypelist.forEach(i => list.push(i.room_type_name));
        return list
      },
      inOutTime(){
        return this.detail.out_time - this.detail.in_time
      },
      cleanRoomForPick(){
        return this.roomlist.filter(i => i.config.enabled_pick && i.room_type_id === this.detail.room_type_id && i.room_status === 0)
      },
      dirtyRoomForPick(){
        return this.roomlist.filter(i => i.config.enabled_pick && i.room_type_id === this.detail.room_type_id && i.room_status === 1)
      },
      submitData(){
        let suborders = [];
        this.detail.room_numbers.forEach(i => suborders.push({
          room_number: i,
          room_type_id: this.detail.room_type_id,
          room_price: this.detail.room_price.map(i => {
            return {
              date: i.date,
              price: i.price * 100
            }
          })
        }));
        return {
          type: "IMPORT",
          order_id: this.orderId,
          order_pmsid: this.detail.order_pmsid,
          source_id: this.detail.source_id, //订单来源id
          owner: this.detail.owner,
          owner_tel: this.detail.owner_tel,
          in_time: this.detail.in_time,
          out_time: this.detail.out_time,
          payinfo: {
            staff_pay: this.detail.staff_pay * 100, //营业员确认的付款金额,
          },
          remark: this.detail.remark,
          suborders: suborders
        }
      }
    },
    watch: {
      'detail.in_time': function (val) {
        this.detail.out_time && val > this.detail.out_time ? this.detail.out_time = val + 86400000 : null
      },
      inOutTime(val, oldVal){
        let newLength = Math.ceil(val / 86400000);
        let newArr = [];
        for (let i = 0; i < newLength; i++) {
          newArr.push({
            date: i * 86400000 + this.detail.in_time,
            price: null
          })
        }
        newArr.forEach(i => {
          let sameTime = this.detail.room_price.filter(j => j.date === i.date);
          sameTime.length && sameTime[0].price ? i.price = sameTime[0].price : null
        });
        this.detail.room_price = newArr;
      },
      'detail.room_count': function (val) {
        if (val != this.detail.room_numbers.length) {
          let newNumbersArr = [];
          for (let i = 0; i < val; i++) {
            newNumbersArr.push('未选')
          }
          this.detail.room_numbers = newNumbersArr
        }
      }
    },
    methods: {
      ...mapActions([
        'getroomlist',
        'getsourcelist',
        'getroomtypelist',
        'getorderdetail',
        'newRecord',
        'modifyRecord',
        'deleteRecord'
      ]),
      getSourceName(source_id){
        return source_id && this.sourcelist.length ? this.sourcelist.filter(i => i.source_id === source_id)[0].source_name : '未选择'
      },
      getRoomTypeName(room_type_id){
        return room_type_id && this.roomtypelist.length ? this.roomtypelist.filter(i => i.room_type_id === room_type_id)[0].room_type_name : '未选择'
      },
      toggleSource(source_name){
        source_name !== 'cancel' ? this.detail.source_id = this.sourcelist.filter(i => i.source_name === source_name)[0].source_id : null
      },
      toggleRoomType(room_type_name){
        room_type_name !== 'cancel' ? this.detail.room_type_id = this.roomtypelist.filter(i => i.room_type_name === room_type_name)[0].room_type_id : null
      },
      toggleRoomCount(room_count){
        room_count !== 'cancel' ? this.detail.room_count = room_count : null
      },
      toggleRoomNumber(roomnum){
        this.detail.room_numbers[this.roomNumberIndex] = roomnum;
        this.isRoomPickShow = false
      },
      excludePickedRoom(arr){
        return arr.filter(i => !this.detail.room_numbers.some(j => j === i.room_number))
      },
      init(){
        this.getsourcelist({onsuccess: body => this.sourcelist = body.data});//订单来源
        this.getroomtypelist({onsuccess: body => this.roomtypelist = body.data});//房型
        this.getroomlist({onsuccess: body => this.roomlist = body.data}); //房间列表
        this.orderId ?
          this.getorderdetail({
            order_id: this.$route.params.id,
            roomfee: 1,
            suborder: 1,
            invoice: 0,
            log: 1,
            onsuccess: body => {
              this.detail.order_pmsid = body.data.order_pmsid;
              this.detail.room_type_id = body.data.suborders[0].room_type_id;
              this.detail.source_id = body.data.source_id;
              this.detail.owner = body.data.owner;
              this.detail.owner_tel = body.data.owner_tel;
              this.detail.room_price = body.data.suborders[0].room_price;
              this.detail.in_time = parseInt(body.data.in_time);
              this.detail.out_time = parseInt(body.data.out_time);
              this.detail.room_count = body.data.suborders.length;
              let newroomNubers = [];
              body.data.suborders.forEach(i => newroomNubers.push(i.room_number));
              this.detail.room_numbers = newroomNubers;
              this.detail.remark = body.data.remark;
              this.detail.staff_pay = parseInt(body.data.payinfo.staff_pay) / 100;
            }
          })
          : null
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
