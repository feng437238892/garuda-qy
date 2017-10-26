<template>
  <div class="search-container">
    <p>search</p>
    <input :placeholder="placeholder" v-model="currentValue" ref="input"/>
    <div class="search-result-show" v-if="results.length > 0">
      <p v-for="result in results" @click="handleResultClick(result)" class="result-item">{{result}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data(){
      return {
        currentValue: ''
      }
    },
    props: {
      value: null,
      placeholder: null,
      results: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      handleResultClick (item) {
        this.$emit('on-result-click', item)
      },
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val, old) {
        this.$emit('input', val);
        if (val !== old) {
          this.$emit('on-change', val);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
