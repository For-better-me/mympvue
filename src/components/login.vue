<template>
  <div class="login">
    <div class="login_modal">
      <h4>温馨提示</h4>
      <p>为了更好的体验时间简史军军军军为了更好的体验时间简史军军军军为了更好的体验时间简史军军军军</p>
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
    sureEvent(resp){
      let self = this;
      let url = this.$api.login;
      if(resp.mp.detail.errMsg == 'getUserInfo:ok'){
        let detail = resp.mp.detail
        console.log(detail);
        wx.login({
          success(res){
            if(res.code){
              self.$http({
                loading:true,
                url,
                data:{code:res.code,encryptedData:detail.encryptedData,rawData:detail.rawData,iv:detail.iv,signature:detail.signature}
              }).then((data)=>{
                  wx.setStorageSync('token',data.token);
                  self.$store.commit('update',{'isLogin':false})
                  self.$emit('loadEvent');
                  self.$util.showToast('登录成功')
              })
            }
          }
        })
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
