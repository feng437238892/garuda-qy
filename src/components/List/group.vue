<template>
  <div class="weui-cell-group">
    <div class="weui-cells__title" v-if="title">{{title}}</div>
    <div class="weui-cells" :class="{'weui-cells_radio':radio,'weui-cells_checkbox':checkbox}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      title: {
        default: null
      },
      radio: {
        type: Boolean
      },
      checkbox: {
        type: Boolean
      }
    }
  }
</script>
