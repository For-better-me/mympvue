<template>
  <div class="home" v-if = 'navList.length>0'>
    <Slider2
    :indicator="indicator"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :imgUrls="imgUrls"></Slider2>
    <div class="home_nav">
        <ul>
            <li v-for = '(nav,index) in navList' :key = 'nav.id' @click='switchNav(nav.id,nav.title,index)' :class='navCurrent == index?"on":""'>
                <img :src="nav.icon_img_bg?imgPrefix+nav.icon_img_bg:imgPrefix+nav.icon_img" v-if='navCurrent == index'>
                <img :src="imgPrefix+nav.icon_img" v-else>
                <p>{{nav.title}}</p>
            </li>
        </ul>
    </div>
    <div class="video_wrap shadow_wrap">
        <!-- <h1>{{title}}</h1> -->
        <block v-for='(item,i) in navList' :key='i'>
            <video :src="imgPrefix+item.video" controls objectFit = 'fill' :poster = 'imgPrefix+item.video_img' v-show="i==navCurrent"></video>
        </block>
        <a :href="moreUrl">更多详情</a>
        
    </div>
    
   
  </div>
</template>

<script>

import Slider2 from '@/components/slide.vue'
export default {
  name:'Home',
  data () {
    return {
      indicator:false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      navList:[],
      imgUrls: [],
      navCurrent:0,
      title:'视频',
      moreUrl:'',
      imgPrefix:this.$imgPrefix,
    }
  },
  onLoad(opt){
    Object.assign(this.$data, this.$options.data())
    console.log('onLoad');
  },
  onShow(){
    console.log('show',this.navList,this.navCurrent);
  },
  mounted(){
    this.getBanner();
    this.getNavs();
    console.log('mounted');
  },
  components: {
    Slider2
  },

  methods: {
    getBanner(){
        let self = this;
        let url = this.$api.banner;
        this.$http({url}).then((data)=>{
            self.imgUrls = data;
        })
        
    },
    getNavs(){
        let self = this;
        let url = this.$api.navList
        let navs = [];
        this.$http({loading:true,url}).then((data)=>{
            self.navList = data;
            self.switchNav(data[0].id,data[0].title,0)
        })
        
    },
    switchNav(id,title,i){
        this.navCurrent = i;
        this.title = title
        if(id == 2){
           this.moreUrl = `/pages/index/brief/main?tid=${id}`
        } else if(id == 9){
           this.moreUrl = `/pages/index/mediaList/main?tid=${id}`
        } else{
           this.moreUrl = `/pages/lease/detail/main?id=${id}`
        }
    },
   
  },
  

  
}
</script>

<style scoped lang = 'less'>
    @import url("./style");
    
</style>
