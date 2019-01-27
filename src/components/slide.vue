<template>
  <div class="slider">
    <swiper
      :indicator-dots="indicator"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      @change = 'changeIndex'
    >
      <block v-for="(item, index) in imgUrls" :key = 'index'>
        <swiper-item>
          <image :src="imgPrefix+item" class="slide-image" mode = 'scaleToFill' />
        </swiper-item>
      </block>
    </swiper>
    <div class="indicator">
       <span  v-for="(item, index) in imgUrls" :class="index == activeIndex?'on':''" :key = 'index'></span>
    </div>
  </div>
</template>

<script>
export default {
    name:'slider',
    data(){
        return {
          activeIndex:0,
          imgPrefix:this.$imgPrefix
        }
    },
    methods:{
      changeIndex(e){
          this.activeIndex = e.mp.detail.current;
      }
    },
    props:{
        'indicator': {
          type: Boolean,
          default: false
        },
        'autoplay': {
          type: Boolean,
          default: false
        },
        'interval': {
          type: Number,
          default: 3000
        },
        'duration': {
          type: Number,
          default: 1000
        },
        'imgUrls':{
            type:Array,
            required:true
        }
    }
}
</script>

<style lang="less">
.slider {
    width:100%;
    height: 4rem;
    overflow: hidden;
    margin-bottom: 0.4rem;
    position: relative;
  .slide-image{
    width: 100%;
    height: 4rem;
  }
  swiper {
    height: 4rem;
  }
  .indicator{
    position: absolute;
    bottom:0.2rem;
    right: 0.2rem;
    z-index: 99;
    span{
      display: inline-block;
      width:0.1rem;
      height: 0.1rem;
      border-radius: 50%;
      background: #a8a8c7;
      margin-left: 0.13rem;
      &.on{
        width:0.3rem;
        background:#fff;
        border-radius: 0.1rem;
      }
    }
  }
  
}

</style>
