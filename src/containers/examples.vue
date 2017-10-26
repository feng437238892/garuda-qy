<template>
  <div>
    <scroller lock-x :scrollbar-x=false use-pulldown>
      <!--<Progress v-model="showProgress"></Progress>-->
      <div>
        <Search v-model="searchValue" :results="searchResult" @on-result-click="resultClick" @on-change="getResult"></Search>
        <h1>Forms</h1>
        <Group title="XInput">
          <XInput title="手机号"/>
          <XInput type="number" title="手机号" v-model="inputValue" placeholder="请输入您的常用手机号" footer="footer"/>
          <XInput fill/>
        </Group>
        <Group title="XTextarea">
          <XTextarea v-model="textareaValue" max="50"/>
        </Group>
        <Group title="Switch">
          <XSwitch title="我是开关" v-model="switchValue"/>
          <XSwitch title="我是开关" v-model="switchValue"/>
        </Group>
        <Group radio title="XRadio">
          <XRadio :options="[1,2,3]" v-model="radioValue"/>
        </Group>
        <Group checkbox title="XCheckbox">
          <XCheckbox :options="[1,2,3]" v-model="checklistValue"/>
        </Group>

        <h1>Layers</h1>
        <Group title="Actionsheet">
          <XSwitch title="Actionsheet" v-model="showAction"/>
        </Group>
        <Group title="Dialog">
          <XSwitch title="Dialog" v-model="showDialog"/>
        </Group>
        <Group title="Toast">
          <XSwitch title="Toast 2s" v-model="showToast"/>
          <XSwitch title="Loading" v-model="showLoading"/>

        </Group>

        <h1>List</h1>
        <Group title="Group Cell Link Badge Dot">
          <Cell title="手机号"/>
          <Cell
            icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
            title="手机号"
            value="15300686668"
            link/>
          <Link value="查看更多"/>
          <Cell
            icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
            title="手机号"
            desc="123"
            badge="New"/>
          <Cell title="dot" value="true" dot/>
          <Cell title="badge" value="详细信息" badge="8" link/>
          <Cell title="badge" value="详细信息" badge="New" link/>
        </Group>

        <h1>Layouts</h1>
        <Group title="grid">
          <Grids>
            <Grid value="1" img="123"/>
            <Grid value="2" img="123"/>
            <Grid value="3" img="123"/>
          </Grids>
        </Group>
        <Group title="tab">
          <Tab>
            <TabItem v-for="(item,index) in tabMenu"
                     :value="item"
                     :key="index"
                     :selected="selectedTab === item"
                     @onSelected="selectedTab = item"/>
          </Tab>
        </Group>

        <h1>Display</h1>
        <XButton value="Vue2" primary warn @onClick="showProgress = true"/>
      </div>
    </scroller>





    <Actionsheet v-model="showAction"/>
    <Dialog v-model="showDialog" confirm title="弹窗呀呀呀呀"/>
    <Toast v-model="showToast"/>
    <Toast v-model="showLoading" loading/>
  </div>
</template>

<script>
  export default{
    name: "examples",
    data(){
      return {
//        showProgress:true,
        showDialog: false,
        showAction: false,
        showToast: false,
        showLoading: false,
        switchValue: false,
        inputValue: 15300686668,
        textareaValue: "hello",
        radioValue: 2,
        checklistValue: [1, 2],
        popupShow: true,
        tabMenu: ['待确认', '已确认', 'xxx'],
        selectedTab: '待确认',
        searchValue: '',
        searchResult: []
      }
    },
    methods: {
      resultClick(item) {
          console.log(item);
      },
      getResult(val) {
        if(this.searchValue) {
            this.searchResult = ['201','201','204']
        }else {
            this.searchResult = [];
        }
      }
    }
  }
</script>
