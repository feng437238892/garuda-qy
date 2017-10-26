<template>
  <div class="content">
    <div class="warning-box">
      <div class="warning"></div>
    </div>
    <div class="dialog-msg">
        <p>发票信息已发送至开票软件</p>
        <p>请至开票软件打印发票</p>
    </div>
    <div class="bottom-box">
        <div class="button-group">
            <XButton value="完成" default @click.native="complete"></XButton>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

module.exports = {
  name: 'InvoiceResult',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'Interface',
    ])
  },
  methods: {
    ...mapActions([
      'goto',
      'replaceto',
      'invoiceComplete'
    ]),
    complete() {
      this.invoiceComplete({
        id: this.$route.params.id,
        onsuccess: body => this.replaceto('/invoice/0')
      })
    }
  },
  mounted() {

  }
}

</script>
<style lang="less" scoped>

.content {
    padding-top: 70px;
}

.bottom-box {
    width: 100%;
    position: absolute;
    bottom: 24px;
}

.warning-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.warning {
  display: block;
  height: 94px;
  width: 94px;
  background: url('data:image/svg+xml;charset=utf8,<svg width="94px" height="94px" viewBox="0 0 186 186" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="15.发票" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="填开发票3" transform="translate(-282.000000, -268.000000)"><path d="M468,362.148148 C468,309.636444 426.363556,268 373.851852,268 C323.636444,268 282,309.636444 282,362.148148 C282,412.363556 323.636444,454 373.851852,454 C426.363556,454 468,412.363556 468,362.148148 Z" id="Fill-" fill="#00B89B"></path><path d="M326.322842,367.13072 C325.938763,366.733217 325.886914,366.057869 326.223761,365.599527 L330.411465,359.901398 C330.740824,359.453247 331.362373,359.361691 331.800864,359.697769 L356.713103,378.791572 C357.151088,379.127263 357.855771,379.108128 358.269755,378.763245 L418.910937,328.244236 C419.332666,327.892901 419.995003,327.92457 420.389024,328.313704 L424.340485,332.216153 C424.73508,332.605854 424.738757,333.232963 424.342041,333.62339 L358.217086,398.700223 C357.823351,399.087717 357.18867,399.075321 356.808729,398.682101 L326.322842,367.13072 Z" id="Fill-" fill="#FFFFFF"></path></g></g></svg>')
}

.dialog-msg {
    text-align: center;
  padding: 14px 0;
  font-size: 16px;
}
</style>
