<template>
  <div class="vux-tab-item"
       :class="[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected, 'vux-tab-disabled': disabled}]"
       :style="style" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
  import {childMixin} from './multi-items.js'

  export default {
    mixins: [childMixin],
    props: {
      activeClass: String,
      disabled: Boolean
    },
    computed: {
      style () {
        return {
          borderWidth: this.$parent.lineWidth + 'px',
          borderColor: this.$parent.activeColor,
          color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
          border: this.$parent.animate ? 'none' : 'auto'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .setRightLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid @c;
    color: @c;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }

  .vux-1px-r {
    position: relative;
    &:after {
      .setRightLine();
    }
  }
</style>
