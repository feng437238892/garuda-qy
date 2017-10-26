<template>
  <div :class="{hide:!value}">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class=" weui-icon_toast" :class="[loading ? 'weui-loading' : 'weui-icon-success-no-circle']"></i>
      <p class="weui-toast__content">{{content}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      loading: {
        type: Boolean
      },
      title: {
        default: null
      },
      value: {
        default: false
      },
      timer: {
        default: 2000
      }
    },
    computed: {
      content(){
        return this.title
          ? this.title
          : this.loading
            ? '加载中...'
            : '已完成'
      }
    },
    watch: {
      value(val){
        (val && !this.loading) ? setTimeout((val) => this.$emit('input', false), +this.timer) : null
      }
    }
  }
</script>
