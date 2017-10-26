<template>
  <div class="weui-cell weui-cell_switch">
    <div class="weui-cell__bd">{{title}}</div>
    <div class="weui-cell__ft">
      <label class="weui-switch-cp">
        <input class="weui-switch-cp__input" type="checkbox" v-model="currentValue"/>
        <div class="weui-switch-cp__box"></div>
      </label>
    </div>
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
      title: {
        type: String,
        required: true
      },
      disabled: Boolean,
      value: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      },
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
