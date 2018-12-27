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
      img:'/static/img/1.jpg',
      id:''
    }
  },
  onLoad(opt){
    this.id = opt.tid
  },
  mounted(){
    this.getInfo()
  },
  components: {
    wxParse
  },

  methods: {
    async getInfo(){
      let self = this;
      let url = `${this.$api.detail}?tid=${this.id}`;
      let briefInfo = await this.$http({url}).then((data)=>{return data})
      console.log(briefInfo)
    }
  },
  
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
