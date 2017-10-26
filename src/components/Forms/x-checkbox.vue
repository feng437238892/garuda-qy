<template>
  <div>
    <label class="weui-cell weui-check__label" v-for="(one, index) in options">
      <div class="weui-cell__hd">
        <input type="checkbox" class="weui-check" v-model="currentValue" :value="one">
        <i class="weui-icon-checked"></i>
      </div>
      <div class="weui-cell__bd">
        <p>{{one}}</p>
      </div>
    </label>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        type: Array,
        required: true,
        default: () => []
      },
      value: {
        default: null
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (newVal) {
        this.$emit('on-change', newVal)
        this.$emit('input', newVal)
      }
    },
  }
</script>
