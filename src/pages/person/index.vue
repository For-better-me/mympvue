<template>
  <div class="person">
    <div class="user_info">
       <div class="avatar">
          <img :src="avatarUrl">
       </div>
       <p v-if='isLogin'>{{nickName}}</p>
       <button open-type="getUserInfo" @getuserinfo = 'getUserInfo' v-else>登录</button>
    </div>
    <div class="orders shadow_wrap">
      <ul>
        <li @click='goOrder(3)'>
            <img src="/static/img/icon_order.png">
            <p>已确认</p>
        </li>
        <li @click='goOrder(2)'>
            <img src="/static/img/icon_order_2.png">
            <p>待确认</p>
        </li>
        <li @click='goOrder(1)'>
          <a href="">
            <img src="/static/img/icon_order_3.png">
            <p>已取消</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li @click="makePhone" class="bg_arrow">电话咨询</li>
        <li class="bg_arrow"><a href="/pages/person/about/main?id=1">关于新华网媒体创意工场</a></li>
      </ul>
    </div>
    <login v-if='loginFlag' @loadEvent = 'reloadInfo'></login>
  </div>
</template>

<script>
export default {
  name:'Person',
  data () {
    return {
      isLogin:false,//判断当前是否已经登陆
      avatarUrl:'/static/img/avatar.png',
      nickName:''
    }
  },
  onLoad(opt){
   Object.assign(this.$data, this.$options.data())
  },
  computed:{
    loginFlag() {
      return this.$store.getters.loginFlag
    }
  },
  mounted(){
    this.isLoginEvent();
  },
  methods: {
    makePhone(){
      wx.makePhoneCall({
        phoneNumber: '01088050309' // 仅为示例，并非真实的电话号码
      })
    },
    reloadInfo(){
      let self = this;
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          self.nickName = userInfo.nickName
          self.avatarUrl = userInfo.avatarUrl
          self.isLogin = true;
        }
      })
      console.log(userInfo);
    },
    getUserInfo(resp){
      let self = this;
      let url = this.$api.login;
      if(resp.mp.detail.errMsg == 'getUserInfo:ok' && resp.mp.detail.encryptedData){
        wx.login({
          success(res){
            if(res.code){
              wx.getUserInfo({
                success(response) {
                  console.log(response,222);
                  const userInfo = response.userInfo
                  self.$http({
                    url:url,
                    data:{code:res.code,encryptedData:response.encryptedData,rawData:response.rawData,iv:response.iv,signature:response.signature}
                  }).then((data)=>{
                    self.nickName = userInfo.nickName
                    self.avatarUrl = userInfo.avatarUrl
                    wx.setStorageSync('token',data.token);
                    self.isLogin = true;
                  })
                }
              })
              
            }
          }
        })
      }
    },
    isLoginEvent(){
      let token = wx.getStorageSync('token');
      let self = this;
      if(token){
        wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            self.nickName = userInfo.nickName
            self.avatarUrl = userInfo.avatarUrl
            console.log(res);
          },
          fail(err){
            self.isLogin = false;
          }
        })
        self.isLogin = true;
      }else{
        self.isLogin = false;
      }
      console.log(self.isLogin,0);
    },
    goOrder(status){
      if(this.isLogin){
        var path =  `/pages/person/orderList/main?status=${status}`
        wx.navigateTo({url:path})
      } else{
        this.$store.commit('update',{'isLogin':true})
      }
      
    }


    
  },

  created () {
   
  },
  onShareAppMessage(){
     return this.$util.shareEvent()
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
