<template>
  <div class="list">
        <div class="video_wrap shadow_wrap" v-for="(item,i) in mediaList" :key='i'>
            <video :src="imgPrefix+item.video" controls objectFit = 'fill' :poster = 'imgPrefix+item.video_img'></video>
            <h2>{{item.title}}</h2>
            <span>{{item.time}}</span>
        </div>
  </div>
</template>

<script>
export default {
  name:'videoList',
  data () {
    return {
      imgPrefix:this.$imgPrefix,
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
    if(currentPage<=this.totalPage){
        this.currentPage = currentPage;
        this.getMedia(tid,currentPage);
    } else{
        this.$util.showToast('下面没有了哦~')
    }
    
    console.log('onReachBottom');
  },
  onShareAppMessage() {
      let self =this;
      return {
        title: '创意列表', // 转发后 所显示的title
        path: `/pages/index/mediaList/main?tid=${self.tid}`, // 相对的路径
        success: (res)=>{    // 成功后要做的事情
          self.$util.showToast('分享成功')
   
        },
        fail: function (res) {
           self.$util.showToast('分享失败')
        }
      }
    }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
