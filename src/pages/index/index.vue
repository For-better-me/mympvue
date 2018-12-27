<template>
  <div class="home">
    <Slider2
    :indicator="indicator"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :imgUrls="imgUrls"></Slider2>
    <div class="home_nav">
        <ul>
            <li v-for = '(nav,index) in navList' :key = 'nav.id' @click='switchNav(index)'>
                <img :src="nav.icon_img">
                <p>{{nav.title}}</p>
            </li>
        </ul>
    </div>
    <div class="video_wrap shadow_wrap">
        <h1>视频</h1>
        <a href="/pages/index/mediaList/main" @click='moreEvent'>更多</a>
        <block v-for='(item,i) in navList'>
            <video :src="item.video" controls objectFit = 'fill' poster = 'item.video_img' v-show='i==navCurrent'></video>
        </block>
    </div>
    
   
  </div>
</template>

<script>

import Slider2 from '@/components/slide.vue'
export default {
  name:'Home',
  data () {
    return {
      autoplay: true,
      interval: 3000,
      duration: 1000,
      navList:[],
      imgUrls: [],
      navCurrent:0
    }
  },
  created () {
    
  },
  mounted(){
    this.getBanner();
    this.getNavs();
  },
  components: {
    Slider2
  },

  methods: {
    getBanner(){
        let self = this;
        let url = this.$api.banner;
        let imgs = [];
        this.$http({url}).then((data)=>{
            for(let i = 0;i<data.length;i++){
                imgs.push(data[i].img)
            }
        })
        self.imgUrls = imgs;
    },
    getNavs(){
        let self = this;
        let url = this.$api.navList
        let navs = [];
        this.$http({url}).then((data)=>{
            self.navList = data;
            self.switchNav(0)
        })
        
    },
    switchNav(index){
        this.navCurrent = index;
    },
    moreEvent(){
        let index = this.navCurrent;
        if(index == 0){
            wx.navigateTo({url: '/pages/index/brief/main'})
        } else if(index == 4){
            wx.navigateTo({url: '/pages/index/mediaList/main'})
        } else{
            wx.navigateTo({url: '/pages/lease/order/main'})
        }
    }
  },
  

  
}
</script>

<style scoped lang = 'less'>
    @import url("./style");
    
</style>
