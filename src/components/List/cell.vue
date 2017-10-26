<template>
  <div class="weui-cell " :class="{'weui-cell_access':link}" @click="$emit('onClick')">
    <div class="weui-cell__hd" :class="{'weui-cell__hd_lg':desc}">
      <img v-if="icon"
           :src="icon"
           class="weui-icon-info"
           :class="{'weui-icon-info-lg':desc}">
      <span v-if="badge && desc" class="weui-badge">{{badge}}</span>
    </div>
    <div class="weui-cell__bd">
      <p>
        <span style="vertical-align: middle" v-html="title"></span>

      </p>
      <slot></slot>
      <p v-if="desc" style="font-size: 13px;color: #888888;" v-html="desc"></p>
    </div>
    <div class="weui-cell__ft">
      <span style="vertical-align:middle;" v-html="value"></span>
      <span v-if="dot" class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
      <span v-if="badge && !desc" class="weui-badge" style="margin-right: 5px;">{{badge}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      icon: {
        default: null
      },
      title: {
        default: null
      },
      desc: {
        default: null
      },
      value: {
        default: null
      },
      link: {
        type: Boolean
      },
      dot: {
        type: Boolean
      },
      badge: {
        default: null
      },
    }
  }
</script>
