<template>
  <div>
    <transition name="mask">
      <div class="vux-popup-mask"
           v-if="maskShow && value"
           @click="popupHide"></div>
    </transition>

    <transition :name="`vux-popup-animate-${position}`">
      <div v-if="value"
           :style="styles"
           class="vux-popup-dialog"
           :class="[`vux-popup-${position}`, value ? 'vux-popup-show' : '']">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default{
    name: 'popup',
    props: {
      value: Boolean,
      maskShow: {
        type: Boolean,
        default: true
      },
      height: {
        type: String,
        default: 'auto'
      },
      width: {
        type: String,
        default: 'auto'
      },
      position: {
        type: String,
        default: 'bottom'
      },
      topNumber: null,
      isTransparent: Boolean,
      maxHeight: String
    },
    computed: {
      styles () {
        const styles = {};
        if (!this.position || this.position === 'bottom' || this.position === 'top') {
          styles.height = this.height
        } else {
          styles.width = this.width
        }
        if (this.maxHeight) {
          styles['max-height'] = this.maxHeight
        }
        if (this.position === 'top' && this.topNumber) {
          styles.top = +this.topNumber + 'px'
        }
        this.isTransparent && (styles['background'] = 'transparent');
        return styles
      }
    },
    methods: {
      popupHide() {
        this.$emit('input', false)
      }
    }
  }
</script>
<style scoped lang="less">
  @import 'index.less';
</style>
