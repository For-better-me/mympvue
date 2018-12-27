<template>
  <div class="slider">
    <swiper
      :indicator-dots="indicator"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
       mode="scaleToFill"
    >
      <block v-for="(item, index) in imgUrls" :key = 'index'>
        <swiper-item>
          <image :src="item" class="slide-image" mode = 'widthFix' />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
    name:'slider',
    data(){
        return {

        }
    },
    props:{
        'indicator': {
          type: Boolean,
          default: true
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
  .slide-image{
    width: 100%;
  }
  
}
.wx-swiper-dots{position:relative;left: unset!important;right: 0;}

.wx-swiper-dots.wx-swiper-dots-horizontal{
     margin-bottom: 2px;
}
.wx-swiper-dot{
    width:120px;
    display: inline-flex;
    height: 10px;
    margin-left: 10px;
    justify-content:space-between;
}
.wx-swiper-dot::before{
    content: '';
    flex-grow: 1; 
    background: rgba(255,255,255,0.8);
    border-radius: 2px
}
.wx-swiper-dot-active::before{
    background:red;   
    flex-grow: 4; 
}
</style>
