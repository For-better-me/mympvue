<template>
  <div class="brief">
    <div class="brief_img shadow_wrap">
      <img :src="briefInfo.img" mode='widthFix'>
    </div>
    <h1>{{briefInfo.title}}</h1>
    <div class="brief_content" v-if='briefInfo.text'>
      <wx-parse :content="briefInfo.text" />
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
  name:'Person',
  data () {
    return {
      id:'',
      briefInfo:{
        img:'',
        title:'',
        text:''
      }

    }
  },
  onLoad(opt){
    Object.assign(this.$data, this.$options.data())
    this.id = opt.tid;
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
      let url = `${this.$api.detail}?id=${this.id}`;
      let briefInfo = await this.$http({loading:true,url}).then((data)=>{return data});
      this.briefInfo = briefInfo;
    }
  },
  
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
