<template>
  <div class="list">
        <div class="video_wrap shadow_wrap" v-for="(item,i) in mediaList" :key='i'>
            <video :src="item.video" controls objectFit = 'fill' :poster = 'item.video_img'></video>
            <h2>{{item.title}}++{{i}}</h2>
            <span>{{item.time}}</span>
        </div>
  </div>
</template>

<script>
export default {
  name:'videoList',
  data () {
    return {
      mediaList:[],
      currentPage:1,
      totalPage:0,
      tid:''
    }
  },
  components: {  },
  onLoad(opt){
    Object.assign(this.$data, this.$options.data())
  },
  mounted(){
    this.tid = this.$root.$mp.query.tid;
    this.getMedia(this.tid,this.currentPage);
  },
  methods: {
    async getMedia(tid,currentPage){
      wx.showNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '加载中...'
      })
      let mediaList = this.mediaList;
      let url = `${this.$api.mediaList}?tid=${tid}&page=${currentPage}`;
      let data  = await this.$http({loading:true,url}).then((data)=>{ 
        wx.hideNavigationBarLoading();
        wx.setNavigationBarTitle({
          title: '创意视频'
        })
        return data
      });
      mediaList = mediaList.concat(data.list)
      this.mediaList = mediaList;
      this.totalPage = data.total_page
    }
  },
  onPullDownRefresh(){
    let tid = this.tid;
    let currentPage = 1;
    this.currentPage = currentPage;
    this.mediaList = [];
    this.getMedia(tid,currentPage);
    console.log('onPullDownRefresh');
  },
  onReachBottom(){
    let tid = this.tid;
    let currentPage = this.currentPage+1;
    if(currentPage<this.totalPage){
        this.currentPage = currentPage;
        this.getMedia(tid,currentPage);
    } else{
        this.$util.showToast('下面没有了哦~')
    }
    
    console.log('onReachBottom');
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
