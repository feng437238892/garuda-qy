<template>
  <a href="javascript:void(0);" class="weui-cell weui-cell_link">
    <div class="weui-cell__bd">{{value}}</div>
  </a>
</template>

<script>
  export default{
    props: {
      value: {
        default: null
      }
    }
  }
</script>
