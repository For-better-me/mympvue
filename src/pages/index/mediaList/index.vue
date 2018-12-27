<template>
  <div class="list">
        <div class="video_wrap shadow_wrap">
            <video :src="videoSrc" controls objectFit = 'fill' poster = 'http://bpic.588ku.com/element_pic/17/11/08/f9c4c381c639daeb7c47439d15640445.jpg!/fw/260/quality/90/unsharp/true/compress/true'></video>
            <h2>视频视频视频视频视频视频视频视频视频视频视频视频视频视频视频</h2>
            <span>2018-12-25</span>
        </div>
        <div class="video_wrap shadow_wrap">
            <video :src="videoSrc" controls objectFit = 'fill' poster = 'http://bpic.588ku.com/element_pic/17/11/08/f9c4c381c639daeb7c47439d15640445.jpg!/fw/260/quality/90/unsharp/true/compress/true'></video>
            <h2>视频视频视频视频视频视频视频视频视频视频视频视频视频视频视频</h2>
            <span>2018-12-25</span>
        </div>
  </div>
</template>

<script>
export default {
  name:'videoList',
  data () {
    return {
      videoSrc:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    }
  },
  components: {  },
  methods: {
    update(){
        console.log('update')
    },
    loadMore(){
        console.log('loadMore')
    },
  },
  created () {
   
  },
  onPullDownRefresh(){
    console.log('onPullDownRefresh');
  },
  onReachBottom(){
    console.log('onReachBottom');
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
