<template>
  <div class="progress-mask" v-show="isShow" ref="progress">
    <p class="progress-value">同步中...请稍候...{{parseInt(val)}}%</p>
    <div class="progress-bar">
      <div class="line" ref="line"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      //每10自增幅度
      step: {
        type: Number,
        default: 5,
      },
      //初始值
      initVal: {
        type: Number,
        default: 0,
      },
      // 到一定进度停止
      stopVal: {
        type: Number,
        default: 80,
      },
      //进度条继续到成功
      isOk: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isShow: false, // 是否显示进度条
        val: 0, // 进度
        timer: null,
      }
    },
    watch: {
      /**
       * 监听组件props变化决定是否继续加载，一般在父组件数据加载完后改变此标志位
       */
      isOk(newValue) {
        if (newValue) {
          this.$refs.line.style.width = '100%';
          this.val = 100;

          setTimeout( () =>{
              console.log(1111)
            this.isShow = false;
            clearInterval(this.timer);
          },200)
        }
      },
      value(newVal) {
        if (!newVal) {
          return;
        }
        this.val = 0;
        this.$refs.line.style.width = 0;

        this.isShow = true;
        let step = 1;
        this.timer = setInterval(() => {
          if (this.val < 99) {
//            step = Math.random() * 4 + 1;
            this.val = this.val + step;
            this.$refs.line.style.width = this.val + '%';
          }
        }, 400)

      }
    }
  }
</script>

<style lang="less" scoped>
  .progress-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    color: #f1f1f1;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .progress-value {
      margin-bottom: 20px;
    }
    .progress-bar {
      width: 72%;
      display: flex;
      flex-direction: column;
      border: 1px solid #f1f1f1;
      border-radius: 10px;
      overflow: hidden;
      .line {
        width: 0;
        height: 10px;
        background-color: #f1f1f1;
        transition: width .3s
      }
    }
  }

</style>
