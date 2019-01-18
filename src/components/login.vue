<template>
  <div class="login">
    <div class="login_modal">
      <h4>温馨提示</h4>
      <p>为了更好的体验小程序，请先登录</p>
      <div class="btns">
        <button open-type='getUserInfo' class="sure" @getuserinfo='sureEvent'>确定</button>
        <button @click='cancelEvent'>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  data () {
    return {
      id:''
    }
  },
  mounted(){

  },
  components: {
  },
  props:['loadEvent'],
  methods: {
    login(self,code,detail){
      let url = this.$api.login;
      self.$http({
        loading:true,
        url,
        data:{code:code,encryptedData:detail.encryptedData,rawData:detail.rawData,iv:detail.iv,signature:detail.signature}
      }).then((data)=>{
          wx.setStorageSync('token',data.token);
          self.$store.commit('update',{'isLogin':false})
          self.$emit('loadEvent');
          self.$util.showToast('登录成功')
      })
    },
    sureEvent(resp){
      let self = this;
      if(resp.mp.detail.errMsg == 'getUserInfo:ok'){
        let detail = resp.mp.detail
        console.log('第一次获取的userinfo',detail);
        let now = Number(Date.now());
        let time = Number(self.$store.state.time);
        let code = self.$store.state.code;
        console.log(now,time,code,1212121);
        let isOk = (now-time)<(5*60*1000);
        console.log(isOk,'isok',now-time);
        if(isOk){
          self.login(self,code,detail);
        } else{
          console.log('code过期了');
          wx.login({
            success(res) {
              if (res.code) {
                let now = Date.now();
                self.$store.commit('update',{'code':res.code,'time':now});
                wx.getUserInfo({
                  success(response) {
                    console.log('第2次获取的userinfo',response);
                    self.login(self,res.code,response);
                  }
                })
              }
            }
          })
        }
        
        
      }
    },
    cancelEvent(){
      this.$store.commit('update',{'isLogin':false})
    },

  },
  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
  .login{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 99;
  }
  .login_modal{
    position: absolute;
    left: 0;
    right: 0;
    top:25%;
    width: 68%;
    background: #fff;
    border-radius: 2px;
    margin: 0 auto;
    padding: 0.4rem;
    overflow: hidden;
    h4{
      font-size: 0.36rem;
    }
    p{
      font-size: 0.28rem;
      margin-top: 0.3rem;
    }
    button{
      display: inline-block;
      float: right;
      width: 1.6rem;
      height: 0.62rem;
      margin-left: 0.25rem;
      line-height: 0.6rem;
      font-size: 0.28rem;
      margin-top: 0.6rem;

      &.sure{
        color:#fff;
        background: #0050a2;
        border-radius: 3px;
      }
    }
  }
</style>
