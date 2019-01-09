<template>
  <div class="about">
    <h1>{{refundInfo.title}}</h1>
    <div class="about_content" v-if='refundInfo.text'>
      <wx-parse :content="refundInfo.text" />
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
  name:'About',
  data () {
    return {
      refundInfo:{
        title:'',
        text:''
      }
    }
  },

  onLoad(opt){
    // Object.assign(this.$data, this.$options.data())
  },
  mounted(){
    // this.getInfo()
  },
  components: {
    wxParse
  },

  methods: {
    async getInfo(){
      let self = this;
      let url = this.$api.refundInfo;
      let refundInfo = await this.$http({loading:true,url}).then((data)=>{return data});
      this.refundInfo = refundInfo;
    }
  },
}
</script>

<style scoped lang = 'less'>
 @import url("~mpvue-wxparse/src/wxParse.css");
  @import url('./style');
</style>
