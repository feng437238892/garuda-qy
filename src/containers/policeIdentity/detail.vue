<template>
  <article v-if="detail">

    <div class="guestcard">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{detail.name}}</span></li>
          <li><span><abbr>性别</abbr>{{detail.sex}}</span><span><abbr>民族</abbr>{{detail.ethnicity}}</span></li>
          <li><span><abbr>生日</abbr>{{detail.dateOfBirth}}</span></li>
          <li><span><abbr>住址</abbr>{{detail.address}}</span></li>
          <li><span><abbr>身份证号</abbr>{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>
        </ul>
        <img :src="detail.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span>相似度： <abbr>{{detail.similarity}}%</abbr></span></p>
        <img :src="detail.livePhoto" alt="现场照片">
      </div>
    </div>

    <div class="report-info">
      <div class="info-item">
        <label class="item-left">房间号码:</label>
        <input class="item-right room-number" v-model="roomNumber"
               v-if="detail.reportInStatus !== 'SUCCESS'"/>
        <span class="item-right" v-else>{{roomNumber}}</span>
      </div>
      <div class="search">
        <label>搜索结果</label>
        <ul class="search-result" v-if="resultList.length > 0">
          <li v-for=" result in resultList" @click="resultPick(result)">{{result}}</li>
        </ul>
      </div>
      <p class="error-room-number" v-if="isErrorNumber && roomNumberList.length>0">酒店无该房间，请重新输入</p>
      <div class="info-item">
        <label class="item-left">入住几晚:</label>
        <div class="item-right days-item" v-if="detail.reportInStatus !== 'SUCCESS'">
          <span class="days-reduce" @click="daysReduce">-</span>
          <input class="days" v-model="days"/>
          <span class="days-add" @click="daysAdd()">+</span>
        </div>
        <span class="item-right" v-else>{{days}}</span>
      </div>
      <div class="info-item">
        <label class="item-left">入住时间:</label>
        <span class="item-right">{{datetimeparse(inTimeFilter)}}</span>
      </div>

      <div class="info-item">
        <label class="item-left">离店时间:</label>
        <span class="item-right">{{datetimeparse(outTimeFilter)}}</span>
      </div>
      <p class="fail-tip" v-if="detail.reportInStatus && detail.reportInStatus === 'FAIL'">上传旅业系统失败，请重试</p>
      <p v-if="detail.reportInStatus === 'SUCCESS'" style="margin-bottom: 10px"><span style="color: #80C435;padding-right: 10px;">旅业系统上传成功</span> {{datetimeparse(detail.reportInTime,'YYYYMMDD hhmm')}}</p>
      <!--<p v-if="detail.payInfo && detail.payInfo.payStatus === 'SUCCESS'">-->
        <!--<span style="color: #80C435;padding-right:10px;">支付成功</span>-->
        <!--<span style="padding-right: 10px;">预付费: {{cashHandling(detail.payInfo.payFee)}}</span>-->
        <!--<span>{{datetimeparse(detail.payInfo.paymentTime,'YYYYMMDD hhmm')}}</span>-->
      <!--</p>-->
      <x-button v-if="detail.reportInStatus !== 'SUCCESS'"
                :value="detail.reportInStatus && detail.reportInStatus === 'FAIL' ? '重新上传旅业系统' : '上传旅业系统'"
                @onClick="isDialogShow"
                :disabled="isDisabled">
      </x-button>
      <!--<x-button v-if="isWxPayBtnShow && detail.payInfo && detail.payInfo.payStatus !== 'SUCCESS'" value="微信支付入住" primary-->
                <!--@onClick="goto('/new-identity/wxPay/'+detail.identityId)"></x-button>-->
    </div>

    <Dialog v-model="showDialog" @onConfirm="setMultiConfirm" confirm cancel>
      <ul class="dialog-info">
        <li class="info-col"><span class="dialog-key">姓名：</span><span class="dialog-value">{{detail.name}}</span></li>
        <li class="info-col"><span class="dialog-key">证件号码：</span><span
          class="dialog-value">{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>
        <li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>
        <li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>
        <li class="info-col"><span class="dialog-key">入住日期：</span><span
          class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>
        <li class="info-col"><span class="dialog-key">离店日期：</span><span
          class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>
      </ul>
    </Dialog>

  </article>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        detail: {},
        roomNumber: '',
        days: 1,
        inTimeFilter: Date.parse(new Date()),
        outTimeFilter: '',
        showDialog: false,
        isDaysListShow: false,
        resultList: [],
        isErrorNumber: false,
        canSearch: true,
        isWxPayBtnShow: false,//微信支付入住按钮显示
      }
    },
    computed: {
        // reportInStatus === 'SUCCESS' &&  payInfo.payStatus !== 'NONE' && isCheckIn === false 显示入住按钮
      ...mapState([
        'route',
        'roomNumberList'
      ]),
      identityId(){
        return this.route.params.id
      },
      isDisabled(){
        if (this.roomNumberList.length > 0) {
          let isRightInputRoomNumber = this.roomNumberList.some(i => i === this.roomNumber);
          return !this.roomNumber || (typeof this.days === 'string' && !this.days ) || !this.inTimeFilter || !this.outTimeFilter || this.isErrorNumber || !isRightInputRoomNumber
        } else {
          return !this.roomNumber || (typeof this.days === 'string' && !this.days ) || this.days < 0 || !this.inTimeFilter || !this.outTimeFilter || this.isErrorNumber
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'newIdentityDetail',
        'reportLvYe',
        'getRoomNumberList'
      ]),
      ...mapMutations([
        'DEVICEID'
      ]),
      resultPick(item) {
        this.canSearch = false;
        this.roomNumber = item;
        this.resultList = [];
        this.isErrorNumber = false
      },
      isDialogShow() {
        if (!this.isDisabled) {
          this.resultList = [];
          this.showDialog = true;
        } else {
          this.showDialog = false;
        }
      },
      daysReduce() {
        this.days >= 1 ? this.days = +this.days - 1 : null
      },
      daysAdd() {
        this.days <= 30 ? this.days = +this.days + 1 : null
      },
      resetFilter() {
        this.days = 1;
        this.roomNumber = '';
        this.inTimeFilter = Date.parse(new Date());
        this.isWxPayBtnShow = false;
      },
      getDetail(){
        this.newIdentityDetail({
          identity_id: this.identityId,
          onsuccess: body => {
            this.detail = body.data;
            typeof body.data.nights === 'number' && (this.days = body.data.nights);
            body.data.roomNumber && (this.roomNumber = body.data.roomNumber);
            body.data.reportInTime && (this.inTimeFilter = body.data.reportInTime);
            if (body.data.roomNumber && (typeof body.data.nights === 'number' && body.data.nights >= 0)) this.isWxPayBtnShow = true;
            this.detail.deviceId && this.DEVICEID(this.detail.deviceId);
          }
        })
      },
      setMultiConfirm() {
        this.reportLvYe({
          lvyeReportRecordIds: this.detail.lvyeReportRecordId.split(' '),//旅业上报记录Id
          roomNumber: this.roomNumber,//房间号
          nights: +this.days,//入住晚数
          inTime: this.inTimeFilter,//入住时间
          outTime: this.outTimeFilter,//离店时间
          onsuccess: () => {
            this.resetFilter();
            this.getDetail();
          }
        })
      },
    },
    watch: {
      identityId(val){
        val ? this.resetFilter() : null
      },
      days(val, old) {
        if (val && !/^\d+$/.test(val) && !/^[0-9]*$ /.test(val)) this.days = 0;//非负整数，数字
        if (val > 31) this.days = 31;
        let nowDate = new Date();
        let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
        this.outTimeFilter = tempTime;
      },
      roomNumber(val, old) {
        if (!val) {
          this.resultList = [];
          this.isErrorNumber = false;
        }
        if (!this.canSearch) return;
        if (val && val.split('').some(i => !/^[A-Za-z0-9]+$/.test(i))) {//验证特殊字符
          this.roomNumber = old
        }
        if (this.roomNumberList.length > 0 && val && this.detail.reportInStatus !== 'SUCCESS' && this.detail.reportInStatus !== 'FAIL') {
          this.resultList = [];
          this.resultList = this.roomNumberList.filter(room => room.toString().indexOf(val) > -1);
          if (this.resultList.length === 0) this.isErrorNumber = true;
        }
      },
      resultList(val, old) {
        if (old.length > 0) this.canSearch = true
      }
    },
    activated(){
      this.detail = {};
      this.getDetail();
      if (this.roomNumberList.length === 0) this.getRoomNumberList();
      this.days === 1 && (this.outTimeFilter = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
