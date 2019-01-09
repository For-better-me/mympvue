<template>
  <div class="about">
    <h1>{{aboutInfo.title}}</h1>
    <div class="about_content" v-if='aboutInfo.text'>
      <wx-parse :content="aboutInfo.text" />
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
  name:'About',
  data () {
    return {
      aboutInfo:{
        title:'',
        text:''
      }
    }
  },

  onLoad(opt){
    Object.assign(this.$data, this.$options.data())
    this.getInfo(opt.id);
    if(opt.id == 1){
      wx.setNavigationBarTitle({
        title: '关于我们'
      })
    } else{
      wx.setNavigationBarTitle({
        title: '退款规则'
      })
    }
  },
  mounted(){
    
  },
  components: {
    wxParse
  },

  methods: {
    async getInfo(id){
      let self = this;
      let url = id == 1?this.$api.aboutInfo : this.$api.refundInfo;
      let aboutInfo = await this.$http({loading:true,url}).then((data)=>{return data});
      this.aboutInfo = aboutInfo;
    }
  },
}
</script>

<style scoped lang = 'less'>
 @import url("~mpvue-wxparse/src/wxParse.css");
  @import url('./style');
</style>
