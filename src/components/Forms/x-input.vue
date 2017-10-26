<template>
  <div class="weui-cell">
    <div class="weui-cell__hd" v-if="!fill"><label class="weui-label">{{title}}</label></div>
    <div class="weui-cell__bd">
      <input class="weui-input"
             :type="type"
             :placeholder="placeholder"
             :value="value"
             @input="updateValue($event.target.value)"/>
    </div>
    <div class="weui-cell__ft" v-if="!fill && footer"><label class="weui-label">{{footer}}</label></div>
  </div>
</template>

<script>
  export default{
    props: {
      type: {
        default: 'text'
      },
      title: {
        default: null
      },
      footer: {
        default: null
      },
      value: {
        default: null
      },
      placeholder: {
        default: "请输入文本"
      },
      fill: {
        type: Boolean
      },
    },
    methods: {
      updateValue: function (value) {
        this.type == ('number' || 'Number')
          ? this.$emit('input', value ? Number(value) : value)
          : this.$emit('input', value)
      }
    }
  }
</script>
