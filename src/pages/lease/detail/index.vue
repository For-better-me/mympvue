<template>
  <div class="detail">
    <div class="detail_box shadow_wrap">
        <img :src="img" mode='widthFix' class="img_detail">
        <div class="sort">
            <p :class="current==0?'on':''" @click='switchTab(0)'>设备介绍</p>
            <p :class="current==1?'on':''" @click='switchTab(1)'>价目表</p>
            <p :class="current==2?'on':''" @click='switchTab(2)'>预约规则</p>
        </div>
        <div class="detail_con">
            <div class="sort_con"  v-show='current==0' >
                <wx-parse :content="info"/>
            </div>
            <div class="sort_con"  v-show='current==1'>
                <wx-parse :content="priceForm" />
            </div>
            <div class="sort_con" v-show='current==2'>
                <wx-parse :content="orderRule" />
            </div>
        </div>
        <div class="foot">
            <div class="call">
                <img src="/static/img/icon_call.png">
                <p>电话咨询</p>
            </div>
            <div class="once_order">立即预约</div>
        </div>
    </div>

</div>
</template>

<script>
    import wxParse from 'mpvue-wxparse'
    export default {
      name:'Person',
      data () {
        return {
          current:0,
          info:'11',
          priceForm:'222',
          orderRule:'44',
          img:'/static/img/1.jpg'
      }
  },

  components: {
    wxParse
  },

  methods: {
    switchTab(i){
        this.current = i;
    }
  },

  created () {

  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
