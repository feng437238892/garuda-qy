<template>
  <div>
    <div class="weui-mask" :class="{'hide':!value}" @click="$emit('input', false)"></div>
    <div class="weui-actionsheet" :class="{'weui-actionsheet_toggle':value}">
      <div class="weui-actionsheet__menu">
        <div v-for="item in menu" class="weui-actionsheet__cell" @click="option(item)">{{item}}</div>
      </div>
      <div class="weui-actionsheet__action" v-if="cancel">
        <div class="weui-actionsheet__cell" @click="option('cancel')">取消</div>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    props: {
      menu: {
        type: Array,
        default: () => ['无选项']
      },
      value: {
        default: false
      },
      cancel: {
        type: Boolean
      }
    },
    methods: {
      option(val){
        console.log(val)
        this.$emit('onClick', val)
        this.$emit('input', false)
      }
    }
  }
</script>
