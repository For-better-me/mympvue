<template>
  <div class="brief">
    <div class="brief_img shadow_wrap">
      <img :src="img" mode='widthFix'>
    </div>
    <div class="brief_content">
      <wx-parse :content="info" />
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
  name:'Person',
  data () {
    return {
      info:'',
      img:'/static/img/1.jpg'
    }
  },

  components: {
    wxParse
  },

  methods: {

  },

  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
