<template>
  <div class="lease">
    <div class="lease_list">
      <ul>
        <li class="shadow_wrap" v-for="(item,i) in leaseList" :key='i' @click="toDetail('/pages/lease/detail/main',item.id)">
          <img :src="imgPrefix+item.img">
          <div class="tit_wrap">
            <img src="/static/img/bg1.png">
            <p class="ellipsis">{{item.title}}</p>
            <span>立即预约</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'Lease',
  data () {
    return {
      imgPrefix:this.$imgPrefix,
      leaseList:[],
      currentPage:1,
      totalPage:null
    }
  },
  mounted(){
    this.getleaseList()
  },
  components: {
  },

  methods: {
    async getleaseList(page){
      let url = this.$api.leaseList;
      let data = await this.$http({loading:true,url}).then((data)=>{return data});
      this.leaseList = data;
    },
    toDetail(path,id){
      wx.navigateTo({
        url: `${path}?id=${id}`
      })
    }

  },

  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
   @import './style'; 
</style>
