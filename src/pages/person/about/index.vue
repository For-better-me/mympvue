<template>
  <div class="about">
    <h1>{{aboutInfo.title}}</h1>
    <div class="about_content" v-show='aboutInfo.text'>
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
    // Object.assign(this.$data, this.$options.data())
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
      let url = this.$api.aboutInfo;
      let aboutInfo = await this.$http({loading:true,url}).then((data)=>{return data});
      this.aboutInfo = aboutInfo;
    }
  },
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
