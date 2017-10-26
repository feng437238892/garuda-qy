<template>
  <article>
    <Group>
      <Cell title="预订人" :value="detail.owner"></Cell>
      <Cell title="手机号" :value="detail.phone_number"></Cell>
      <Cell title="入住日期" :value="datetimeparse(detail.in_time) +'-' +datetimeparse(detail.out_time)"></Cell>
      <Cell title="房间" v-if="detail.room" :value="detail.room.room_type_name + detail.room.room_number"></Cell>
    </Group>

    <div class="guestcard" v-for="item in detail.guests">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{item.name}}</span></li>
          <li><span><abbr>性别</abbr>{{item.sex}}</span><span><abbr>民族</abbr>{{item.ethnicity}}</span></li>
          <li><span><abbr>生日</abbr>{{item.date_of_birth}}</span></li>
          <li><span><abbr>住址</abbr>{{item.address}}</span></li>
          <li><span><abbr>身份证号</abbr>{{idnumber(item.idcard)}}</span></li>
        </ul>
        <img :src="item.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span>相似度： <abbr>{{item.similarity}}%</abbr></span></p>
        <img :src="item.live_photo" alt="现场照片">
      </div>
    </div>

    <p class="tips" v-if="identityResult">{{identityResult}}</p>

    <div v-if="detail.status === 'PENDING'" class="button-group">
      <XButton value="验证通过" primary @onClick="setidentitystatus(1)"></XButton>
      <XButton value="拒绝" warn @onClick="setidentitystatus(0)"></XButton>
    </div>

  </article>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        detail: {}
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      identityId(){
        return this.route.params.id
      },
      identityResult(){
        return this.detail.status && this.detail.status !== 'PENDING'
          ? this.detail.status === 'AGREED' || this.detail.status === 'AUTO_AGREED'
            ? '已通过'
            : '已拒绝'
          : ''
      }
    },
    methods: {
      ...mapActions([
        'getIdentity',
        'setIdentityStatus'
      ]),
      getDetail(){
        this.getIdentity({
          identity_id: this.identityId,
          onsuccess: body => this.detail = body.data
        })
      },
      setidentitystatus(val){
        this.setIdentityStatus({
          identity_id: this.identityId,
          suborder_id: this.detail.suborder_id,
          status: val ? 'AGREED' : 'REFUSED',
          onsuccess: body => this.detail.status = val ? 'AGREED' : 'REFUSED'
        })
      }
    },
    watch: {
      identityId(val){
        val ? this.getDetail() : null
      }
    },
    activated(){
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
