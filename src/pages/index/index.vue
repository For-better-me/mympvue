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
        <h1>{{title}}</h1>
        <a :href="moreUrl">更多</a>
        <block v-for='(item,i) in navList' :key='i'>
            <video :src="item.video" controls objectFit = 'fill' :poster = 'item.video_img' v-show='i==navCurrent'></video>
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
      navCurrent:0,
      title:'视频',
      moreUrl:''
    }
  },
  onLoad(){
    this.getBanner();
    this.getNavs();
  },
  created () {
    
  },
  mounted(){
    
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
        this.title = this.navList[index].title
        let id = this.navList[index].id
        if(index == 0){
           this.moreUrl = `/pages/index/brief/main?tid=${id}`
        } else if(index == 4){
           this.moreUrl = `/pages/index/mediaList/main?tid=${id}`
        } else{
           this.moreUrl = `/pages/lease/order/main?tid=${id}`
        }
        console.log(this.moreUrl)
    },
   
  },
  

  
}
</script>

<style scoped lang = 'less'>
    @import url("./style");
    
</style>
