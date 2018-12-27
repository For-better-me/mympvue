<template>
  <div class="person">
    <div class="user_info">
       <div class="avatar">
          <img src="http://192.168.0.57:8088/uploads/-/system/user/avatar/36/avatar.png">
       </div>
       <p v-if='isLogin'>我在桥上看风景</p>
       <button open-type="getUserInfo" v-else>登录</button>
    </div>
    <div class="orders shadow_wrap">
      <ul>
        <li>
          <a href="/pages/person/orderList/main">
            <img src="/static/img/icon_order.png">
            <p>已确认</p>
          </a>
        </li>
        <li>
          <a href="/pages/person/orderList/main">
            <img src="/static/img/icon_order2.png">
            <p>待确认</p>
          </a>
        </li>
        <li>
          <a href="/pages/person/orderList/main">
            <img src="/static/img/icon_order3.png">
            <p>已取消</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li @click="makePhone" class="bg_arrow">电话咨询</li>
        <li class="bg_arrow"><a href="/pages/person/about/main">关于新华网媒体创意工厂</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'Person',
  data () {
    return {
      isLogin:true
    }
  },

  components: {
  },

  methods: {
    makePhone(){
      wx.makePhoneCall({
        phoneNumber: '18333676885' // 仅为示例，并非真实的电话号码
      })
    }
    
  },

  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
