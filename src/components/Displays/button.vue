<template>
  <a class="weui-btn"
     :class="[type,disable,load,minic,plainc]"
     @click="$emit('onClick')">
    <i v-if="loading" class="weui-loading"></i>
    <span>{{value}}</span>
  </a>
</template>

<script>
  export default{
    props: {
      value: {
        default: '操作按钮'
      },
      plain: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      primary: {
        type: Boolean
      },
      warn: {
        type: Boolean
      },
      mini: {
        type: Boolean
      }
    },
    computed: {
      type(){
        return this.warn
          ? 'weui-btn_warn'
          : this.primary
            ? 'weui-btn_primary'
            : 'weui-btn_default'
      },
      disable(){
        return this.disabled ? 'weui-btn_disabled' : null
      },
      load(){
        return this.loading ? 'weui-btn_loading' : null
      },
      minic(){
        return this.mini ? 'weui-btn_mini' : null
      },
      plainc(){
        return this.plain ? 'weui-btn_plain-default' : null
      }
    }
  }
</script>
