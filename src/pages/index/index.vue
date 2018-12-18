<template>
  <div class="home">
    <swiper
      indicator-dots="false"
      autoplay="true"
      interval="3000"
      duration="1000"
    >
      <block v-for="(item, index) in imgUrls">
        <swiper-item>
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  name:'Home',
  data () {
    return {
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    }
  },

  components: {
  },

  methods: {

  },

  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
    @import url("./style");
</style>
