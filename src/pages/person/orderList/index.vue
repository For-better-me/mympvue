<template>
  <div class="orders">
    <block v-if = 'orderList != null'>
      <ul v-if='orderList.length>0'>
        <li class="shadow_wrap" v-for='(item,i) in orderList' :key='item.id'>
          <h1>订单编号：{{item.out_trade_no}} <span>￥{{item.earnest_money}}</span></h1>
          <h4>{{item.title}}</h4>
          <p v-for = '(reserve,j) in  item.reserve_arr' :key='j+reserve.id'>{{reserve.title}}</p>
          <h5>时间：{{item.start_time}} - {{item.end_time}} </h5>
          <button v-if='item.status == 3 || item.status == 2' @click='cancelOrder(item.id,i)'>取消订单</button>
          <button v-else @click='reOrder(item.tid)'>重新预约</button>
        </li>
      </ul>
      <div class="nodata" v-else>
        <img src="/static/img/nodata.jpg">
        <p>暂无此类订单</p>
      </div>
    </block>
    <login v-if='loginFlag' @loadEvent = 'getOrderList'></login>
  </div>
</template>

<script>
export default {
  name:'Orders',
  data () {
    return {
      orderList:null,
      currentPage:1,
      totalPage:0,
      status:'',
      title:''
    }
  },
  onLoad(opt){
   Object.assign(this.$data, this.$options.data())
  },
  mounted(){
    this.status = this.$root.$mp.query.status;
    this.getOrderList();
    if(this.status == 1){
      this.title = '已取消'
    } else if(this.status == 2){
      this.title = '待确认'
    } else{
      this.title = '已确认'
    }
  },
  components: {
  },
  computed:{
    loginFlag() {
      return this.$store.getters.loginFlag
    }
  },
  methods: {
    getOrderList(){
      let status = this.status;
      let currentPage = this.currentPage;
      wx.showNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '加载中...'
      })
      let self = this;
      let url = `${this.$api.reserveList}?status=${status}&page=${currentPage}`;
      let token = wx.getStorageSync('token');
      let orderList = [];
      self.$http({
        loading:true,
        url:url
      }).then(data=>{
        orderList = orderList.concat(data.list);
        self.orderList = orderList;
        self.totalPage = data.total_page
        wx.hideNavigationBarLoading();
        wx.setNavigationBarTitle({
          title: self.title
        })
      })
    },
    reOrder(id){
      wx.navigateTo({url:`/pages/lease/order/main?id=${id}`})
    },
    cancelOrder(id,i){
      let url = `${this.$api.cancelOrder}?id=${id}`
      let orderList = this.orderList;
      let self = this;
      wx.showModal({
        title: '温馨提示',
        content: '确认要取消此订单吗？',
        success(res) {
          if (res.confirm) {
            self.$http({
              loading:true,
              url
            }).then(res=>{
              orderList.splice(i,1)
              self.orderList = orderList;
              self.$util.showToast('订单取消成功')
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    
  },
  onPullDownRefresh(){
    let status = this.status;
    let currentPage = 1;
    this.currentPage = currentPage;
    this.orderList = [];
    this.getOrderList(status,currentPage);
    console.log('onPullDownRefresh');
  },
  onReachBottom(){
    let status = this.status;
    let currentPage = this.currentPage+1;
    if(currentPage<=this.totalPage){
        this.currentPage = currentPage;
        this.getOrderList(status,currentPage);
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
