<template>
  <article>
    <scroller :depend="recordlist"
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="getList"
              use-pulldown
              lock-x>
      <div class="scroller-wrap">
        <Group v-for="(item,index) in recordlist" :key="'record'+index">
          <Cell :title="getTitle(item)"></Cell>
          <Cell :title="getBody(item)" link @onClick="goto('/record/'+item.order_id)"></Cell>
        </Group>
      </div>
    </scroller>

    <footer>
      <div class="button-group">
        <x-button value="添加新订单" @onClick="goto('/record/new')"></x-button>
      </div>
    </footer>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        recordlist: [],
      }
    },
    computed: {
      ...mapState([
        'Interface'
      ])
    },
    methods: {
      ...mapActions([
        'getrecord',
        'goto'
      ]),
      getTitle(item){
        return `<div><span class="cell-title">订单号：</span><span class="cell-text">${item.order_pmsid}</span></div>`
      },
      getBody(item){
        let temp = `<div class="cell-multi"><span class="cell-title">预订人：</span><span class="cell-text">${item.owner + item.owner_tel}</span></div>`
        item.rooms_plan.forEach(i => temp += `<div class="cell-multi"><span class="cell-title">房型：</span><span class="cell-text">${i.room_type + '*' + i.room_count}</span></div>`)
        return temp
      },
      getList(){
        this.getrecord({
          onsuccess: body => this.recordlist = body.data
        })
      }
    },
    mounted(){
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
