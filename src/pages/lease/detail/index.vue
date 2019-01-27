<template>
  <div class="detail" v-if = 'img'>
    <div class="detail_box shadow_wrap">
        <img :src="imgPrefix+img" mode='widthFix' class="img_detail">
        <div class="sort">
            <p :class="current==0?'on':''" @click='switchTab(0)'><span>设备介绍</span></p>
            <p :class="current==1?'on':''" @click='switchTab(1)'><span>价目表</span></p>
            <p :class="current==2?'on':''" @click='switchTab(2)'><span>预约规则</span></p>
        </div>
        <div class="detail_con" v-if='introduce || priceList ||reserveRule'>
            <div class="sort_con"  v-show='current==0' >
                <wx-parse :content="introduce"/>
            </div>
            <div class="sort_con"  v-show='current==1'>
                <wx-parse :content="priceList" />
            </div>
            <div class="sort_con" v-show='current==2'>
                <wx-parse :content="reserveRule" />
            </div>
        </div>
        <div class="foot">
            <div class="call"  @click='makePhone'>
                <img src="/static/img/icon_call.png">
                <p>电话咨询</p>
            </div>
            <div class="once_order" @click="goOrder">立即预约</div>
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
          imgPrefix:this.$imgPrefix,
          id:'',
          current:0,
          img:'',
          introduce:'',
          priceList:'',
          reserveRule:""

        }
      },
      onLoad(opt){
        Object.assign(this.$data, this.$options.data())
        this.id = opt.id
      },
      mounted(){
        this.getInfo(this.id);
      },
      components: {
        wxParse
      },
      methods: {
        switchTab(i){
            this.current = i;
        },
        async getInfo(id){
          let self = this;
          let url = `${this.$api.detail}?id=${id}`;
          let rentDetail = await this.$http({loading:true,url}).then((data)=>{return data});
          this.rentDetail = rentDetail;
          this.introduce = rentDetail.introduce;
          this.priceList = rentDetail.price_list;
          this.reserveRule = rentDetail.reserve_rule;
          this.img = rentDetail.img;
        },
        makePhone(){
          wx.makePhoneCall({
            phoneNumber: '01088050309' // 仅为示例，并非真实的电话号码
          })
        },
        goOrder(){
          let id = this.id;
          wx.navigateTo({
            url:`/pages/lease/order/main?id=${id}`
          })
        }
      },

  
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
