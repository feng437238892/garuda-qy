<template>

  <div class="calendar">

    <div class="tools-bar">
      <span class="clear" @click="reset">清除筛选</span>
      <span class="cancel" @click="$emit('onCancel',false)">取消</span>
    </div>

    <div class="select-bar">
      <span @click="nextMonth(-1)">左</span>
      <span>{{year}}年{{month + 1}}月</span>
      <span @click="nextMonth(1)">右</span>
    </div>
    <div class="day-list">
        <span v-for="item in renderdays"
              @click="dateclick(item)"
              class="day-item"
              :class="{checked:item.checked,disabled:item.disabled}"
        >{{item.day}}</span>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  moment.locale('zh-cn');

  export default{
    name: 'calendar',
    props: {
      value: null,
      max: null,
      min: null
    },
    data(){
      return {
        singletime: this.value instanceof Array ? null : this.value,//单选
        current: this.value !== '' && !Array.isArray(this.value) ? this.value : this.value[0] || Date.parse(new Date()),
        starttime: this.value[0] || null,
        endtime: this.value[1] || null,
      }
    },
    computed: {
      year(){
        return moment(this.current).year()
      },
      month(){
        return moment(this.current).month()
      },
      date(){
        return moment(this.current).date()
      },
      days(){
        return moment(moment(this.current).format('YYYY-MM'), "YYYY-MM").daysInMonth();
      },
      daylist(){
        let arr = []
        for (let i = 1; i <= this.days; i++) {
          const dd = moment({
            year: this.year,
            month: this.month,
            day: i
          })
          let timeLengthDisabled = this.starttime && Array.isArray(this.value) ? Math.abs(Date.parse(dd) - this.starttime) > 30 * 24 * 60 * 60 * 1000 : false;
          let maxDisabled = this.max ? Date.parse(dd) > this.max : false;
          let minDisabled = this.min ? Date.parse(dd) < this.min : false;
          arr.push({
            date: Date.parse(dd),
            day: i,
            disabled: timeLengthDisabled || maxDisabled || minDisabled,
            checked: (Date.parse(dd) >= this.starttime && Date.parse(dd) <= this.endtime)
            || Date.parse(dd) === this.starttime
            || Date.parse(dd) === this.endtime
            || Date.parse(dd) === this.singletime
          })
        }
        return arr
      },
      renderdays(){
        let day = moment(this.current).date(1).day()
        let a = [].concat([...this.daylist])
        if (day != 7) {
          for (let i = 0; i < day; i++) {
            a.unshift({
              date: null,
              day: null,
              disabled: true,
              checked: false
            })
          }
        }
        return a
      }
    },
    methods: {
      dateclick(item, getperiod){
        if (this.value instanceof Array) {//多选
          if (this.starttime === null && this.endtime === null) {
            this.starttime = item.date
          } else if (this.starttime !== null && this.endtime === null) {
            if (item.date >= this.starttime) {
              this.endtime = item.date
            } else {
              let mm = this.starttime
              this.starttime = item.date
              this.endtime = mm
            }
            this.$emit('input', [this.starttime, this.endtime]);
            setTimeout(() => {
              this.$emit('onCancel', false);
            }, 300);
          } else {
            this.starttime = item.date
            this.endtime = null
          }
        } else {
          this.singletime = item.date;
          this.$emit('input', this.singletime);
          setTimeout(() => {
            this.$emit('onCancel', false);
          }, 300);
        }
      },
      nextMonth(val) {
        if (val > 0) {
          this.current = Date.parse(moment(this.current).add(1, 'months'))
        } else {
          this.current = Date.parse(moment(this.current).subtract(1, 'months'))
        }
      },
      reset(){
        this.starttime = null
        this.endtime = null
        this.$emit('onReset')
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
