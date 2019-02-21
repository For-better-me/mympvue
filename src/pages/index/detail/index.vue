<template>
  <div class="banner_detail">
    <web-view :src="link" bindmessage="getMessage"></web-view>
  </div>
</template>

<script>
export default {
  name:'About',
  data () {
    return {
      link:''
    }
  },
  onLoad(opt){
    this.link = opt.link;
  },
  mounted(){
    // this.getInfo()
  },
  components: {
  },
  methods: {

  },
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
