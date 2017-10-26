<template>
  <a class="weui-grid" @click="$emit('onClick')">
    <div v-if="img" class="weui-grid__icon">
      <img :src="img">
    </div>
    <p class="weui-grid__label">{{value}}</p>
  </a>
</template>

<script>
  export default{
    props: {
      img: {
        default: null
      },
      value: {
        default: 'Grid'
      }
    }
  }
</script>
