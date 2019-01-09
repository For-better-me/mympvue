<template>
  <div class="order">
    <form @submit = "sureOrder">
      <div class="order_time shadow_wrap order_sub">
        <h4>预约时间</h4>
        <div class="date_wrap" v-if='chargingMode==1'>
          <input  disabled @click="showCalendarEvent('1')" placeholder="开始日期" v-model = 'postData.start_time'/>
          <input  disabled @click="showCalendarEvent('2')" placeholder="结束日期" v-model = 'postData.end_time'/>
        </div>
        <div class="date_wrap2" v-else>
            <picker
              mode="date"
              :start="start_limit"
              :end="end_limit"
              :value='dateHour'
              @change="bindDateChange"
            >
            <input disabled  placeholder="选择日期" v-model = 'dateHour' class="date" />
            </picker>
            <picker @change="bindStartChange" :value="hourIndex" :range="hourArray">
              <input disabled  placeholder="开始时间" v-model = 'start_hour' class="hour" />
            </picker>
            <picker @change="bindEndChange" :value="hourIndex" :range="hourArray">
              <input disabled  placeholder="结束时间" v-model = 'end_hour' class="hour" />
            </picker>
        </div>
      </div>
      <div class="site shadow_wrap order_sub">
        <checkbox-group @change="checkboxChange" name="checkgo">
          <label class="checkbox" v-for="(item,index) in siteCheckbox" :key = "index">
            <p>{{item.title}}<span v-if='item.rent_price>0'>{{item.rent_price}}元/{{chargingMode=='1'?'天':'小时'}}</span></p>
            <checkbox :value="item.id" />
          </label>
        </checkbox-group>
       
      </div>
      <div class="user_order shadow_wrap order_sub">
         <h4>预约时间</h4>
         <input placeholder="请输入真实姓名" name='name' v-model = 'postData.name' />
         <input type = 'number' placeholder="请输入手机号" name='phone' maxlength='11' v-model = 'postData.phone'/>
         <input type = 'number' placeholder="请输入验证码" name='code' class="code" v-model = 'postData.code' />
         <button @click="sendCode" :disabled = "disable" class="btn_code">{{captcha}}</button>
         <h2 v-if='chargingMode == 1'>本次您需支付定金：{{priceDate}}元</h2>
         <h2 v-else>本次您需支付定金：{{priceHour}}元</h2>
         <h5 @click='refundEvent'>退款规则</h5>
         <button form-type = "submit" class="btn_pay">支付</button>
      </div>

    </form>
    <login v-if='isLogin'></login>
    <div v-if='chargingMode == 1'>
      <div class="black_wrap" v-show='showCalendar'>
        <Calendar
            :months="months"
            :value="value"
            :begin='begin'
            :end = 'end'
            :disabled="disabledarr"
            lunar
            clean
            ref="calendar"
            @select="select"
          />
      </div>
    </div>
    <div class="refund">
      
    </div>
    
    
  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
export default {
  name:'order',
  data () {
    return {
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      disabledarr: [],
      value: [],
      begin:[],
      end:[],
      id:'',
      siteCheckbox:[],
      priceForm:{},
      chargingMode:1,//1-天，2-小时
      showCalendar:false,
      timeFlag:'1',//1--开始时间，2--结束时间
      postData:{
        start_time:'',
        end_time:'',
        category_option_id:[],
        phone:'',
        name:'',
        tid:'',
        code:''
      },
      disable:false,//是否可以获取验证码
      captcha:'获取验证码',
      dateOrdered:[],//已预约的时间--按天
      hourOrdered:[],//已预约的时间--按小小時
      hourOrderedArr:[],//已预约的时间--按小小時--选定日期后
      start_limit:'',//按小时选择 日期限制下限
      end_limit:'',//按小时选择 日期限制上限
      start_hour:'',//按小时选择，开始时间
      end_hour:'',//按小时选择，结束时间
      dateHour:'',//按小时选择，选择的日期
      hourArray:[],
      hourIndex:0,

    }
  },
  onLoad(opt){
    Object.assign(this.$data, this.$options.data())
    this.id = opt.id
  },
  mounted(){
    this.reserveOption(this.id);
  },
  components: {Calendar},
  computed:{
    isLogin() {
        return this.$store.getters.loginFlag
      },
    priceDate(){
      if(this.postData.start_time&&this.postData.end_time&&this.postData.category_option_id){
        let rangeDate = this.countPrice(this.postData.start_time,this.postData.end_time);
        let formPrice = this.priceForm;
        let price = 0;
        this.postData.category_option_id.forEach((item,i)=>{
          price = price + formPrice[item]*rangeDate*20/100;
        })
        price = Math.floor(price*100)/100
        return price;

      } else{
        return 0
      }
    },
    priceHour(){
      if(this.start_hour&&this.end_hour&&this.postData.category_option_id){
        let rangeDate = parseInt(this.end_hour)-parseInt(this.start_hour)+1;
        let formPrice = this.priceForm;
        let price = 0;
        this.postData.category_option_id.forEach((item,i)=>{
          price = price + formPrice[item]*rangeDate*20/100;
        })
        price = Math.floor(price*100)/100
        return price;

      } else{
        return 0
      }
      return 0
    }
  },
  methods: {
    sureOrder(e){
      let mode = this.chargingMode;
      let postData = this.postData;
      postData.tid = this.id
      if(mode == 2){
        postData.start_time = this.dateHour+' '+this.start_hour;
        postData.end_time = this.dateHour+' '+this.end_hour;
      }
      console.log(1111,postData);
      if(mode==1 && (postData.start_time=='' || postData.end_time=='')){
        this.$util.showToast('请选择预约时间');
        return
      }
      if(mode==2 && (this.start_hour=='' || this.end_hour=='')){
        this.$util.showToast('请选择预约时间');
        return
      }
      if(postData.category_option_id.length==0){
        this.$util.showToast('请选择预约项');
        return
      }
      if(!postData.name){
        this.$util.showToast('请输入真实姓名');
        return
      }
      if(!postData.phone){
        this.$util.showToast('请输入手机号');
        return
      } else{
        if(!this.$util.isPhone(postData.phone)){
          this.$util.showToast('请输入正确的手机号');
          return
        }
      }
      if(!postData.code){
        this.$util.showToast('请输入短信验证码');
        return
      }
      //支付
      let url = this.$api.pay;
      let self = this;
      self.$http({
        loading:true,
        url,
        method:'POST',
        data:postData
      }).then(res=>{
          wx.requestPayment({
            timeStamp: res.timestamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
            success(res) { 
              self.$util.showToast('支付成功')
              wx.navigateTo({
                url:'/pages/person/orderList/main?status=2'
              })
            },
            fail(err) { 
              self.$util.showToast('取消支付')
              console.log('err',err)
            }
          })
      })
      
      // let data = await this.$http({url:url,method:'POST'}).then((data)=>{return data})
    },
    // 初始化按小时收费时间限制
    initHourFun(){
      let dateValStart = new Date();
      let dateValEnd = new Date();
      dateValStart.setTime(dateValStart.getTime()+24*60*60*1000);
      dateValEnd.setTime(dateValEnd.getTime()+24*60*60*1000*60);
      dateValStart = this.$util.formatDate(dateValStart);
      dateValEnd = this.$util.formatDate(dateValEnd);
      this.start_limit = dateValStart;
      this.dateHour = dateValStart;
      this.end_limit = dateValEnd;
      this.markHourOrder(dateValStart)
    },
    markHourOrder(date){
      let hourArray=['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
      let orderHour = this.hourOrdered;
      let date_hours = [];
      orderHour.forEach((item,i)=>{
        if(item.date == date){
          date_hours = item.hours;
          this.hourOrderedArr = item.hours;
          return false;
        }
      })
      if(date_hours.length>0){
        date_hours.forEach((item_order,i)=>{
          for (let j = 0;j<hourArray.length; j++) {
            if(item_order == hourArray[j]){
              hourArray[j] = hourArray[j]+'（已预约）'
              break;
            }
          }
        
        })
        
      } 
      this.hourArray = hourArray;
      console.log('markHourOrder',this.hourArray);
    },
    // 支付接口
    countPrice(start_time,end_time){
      let rangeDate = (this.getStamp(end_time) - this.getStamp(start_time))/(24*60*60*1000)+1;
      return rangeDate ;
    },
    // 记录选中消费项目及计算支付金额
    checkboxChange(e){
      this.postData.category_option_id = e.mp.detail.value;
    },
    async reserveOption(tid){
      let url = `${this.$api.reserveOption}?tid=${tid}`;
      let self = this;
      let data = await this.$http({url:url,loading:true}).then((data)=>{return data})
      this.id = data.id;
      this.chargingMode = data.charging_mode;
      this.siteCheckbox = data.children;
      // if(data.charging_mode == '2'){
      //   self.initHourFun();
      // }
      let priceForm = {};
      for(let i = 0;i<data.children.length;i++){
        priceForm[data.children[i].id] = data.children[i].rent_price
      }
      this.priceForm = priceForm;
      //为了保证数据能获取到
      this.getReserveTime(this.id);
      console.log(data.charging_mode,priceForm);
      
    },
    //获得已预约时间
    async getReserveTime(tid){
      let url = `${this.$api.showReserveTime}`;
      let self = this;
      let data = await this.$http({loading:true,url:url,data:{tid},method:'POST'}).then((data)=>{return data})
      if(data){
        if(this.chargingMode == '1'){
          this.dateOrdered = data;
          this.disabledarr = data;
        } else{
          this.hourOrdered = data;
          self.initHourFun();
        }
        
      }
      
    },
    // 选中日期
    select(val, val2) {
      let isOk = true;
      let orderedArr = this.dateOrdered;
      let timeFlag = this.timeFlag;
      let postData = this.postData;
      val[1] = val[1]>9?val[1]:'0'+val[1];
      val[2] = val[2]>9?val[2]:'0'+val[2];
      let select_date = val.join('-');
      if(orderedArr.indexOf(select_date)>-1){
        this.$util.showToast('抱歉，此日期已被预约')
        console.log(orderedArr.indexOf(select_date));
        return;
      }
      if(orderedArr.length>0){
        if((timeFlag == '1'&& postData.end_time)||(timeFlag == '2'&& postData.start_time)){
          if(timeFlag == '1'){
            var timeStampStart = this.getStamp(select_date)
            var timeStampEnd = this.getStamp(postData.end_time)
          } else{
            var timeStampStart = this.getStamp(postData.start_time)
            var timeStampEnd = this.getStamp(select_date)
          }
          
          for(let i=0;i<orderedArr.length;i++){
            let itemStamp = this.getStamp(orderedArr[i])
            if(itemStamp>timeStampStart && itemStamp<timeStampEnd){
              isOk = false;
              break;
            }
          }
        }
        
      }
      if(isOk){
        if(this.timeFlag == '1'){
          this.postData.start_time = select_date;
        } else{
          this.postData.end_time = select_date;
        }
      } else{
        this.$util.showToast('你选择的时间范围内有被预约的日期，请重新选择');
        this.postData.start_time = '';
        this.postData.end_time = '';
      }
      this.showCalendar = false;
      
    },
    //获取时间戳
    getStamp(val){
      return new Date(val).getTime();
    },
    //展示日历
    showCalendarEvent(val){
      this.showCalendar = true;
      this.timeFlag = val;
      this.timeLimit(val);

    },
    // 限制日历的所选日期下限
    timeLimit(val){
      var valueB = [];
      var valueE = [];
      if(val == '2' && this.postData.start_time){
        var _begin = new Date(this.postData.start_time)
      } else{
        var _begin = new Date;
        _begin.setTime(_begin.getTime()+24*60*60*1000);
      }
      if(val == '1' && this.postData.end_time){
        var _end = new Date(this.postData.end_time);
        // _end.setTime(_end.getTime()+24*60*60*1000);
       
      } else{
        var _end = new Date;
        _end.setTime(_end.getTime()+24*60*60*1000*60);
      }
      valueB.push(_begin.getFullYear())
      valueB.push(_begin.getMonth()+1)
      valueB.push(_begin.getDate())
      this.value = valueB;
      this.begin = valueB;

      valueE.push(_end.getFullYear())
      valueE.push(_end.getMonth()+1)
      valueE.push(_end.getDate())
      this.end = valueE;
      console.log(this.begin,this.end,val,);

    },
    // 发送短信验证
    sendCode(){
      console.log(this.postData);
      let tel = this.postData.phone;
      let self = this;
      let url = this.$api.sms;
      console.log(tel);
      if(!this.$util.isPhone(tel)){
         this.$util.showToast('手机格式不正确')
         return;
      }
      this.$http({
        url,
        data:{phone:tel}
      }).then((res)=>{
        let time = 10;
        let interval = setInterval(() => {
            if (--time > 0) {
               this.captcha =  `重新发送(${time})`
               this.disable = true;
            } else {
                clearInterval(interval)
                this.captcha = '获取验证码'
                this.disable = false;
          
            }
        }, 1000)
      })
    },
    bindDateChange(e){
      this.dateHour = e.mp.detail.value;
      this.markHourOrder(e.mp.detail.value)
      this.start_hour = '';
      this.end_hour = '';

    },
    bindStartChange(e){
      let _index = e.mp.detail.value;
      let val = this.hourArray[_index]
      console.log(val,333);
      this.bindHourChange(1,val)
    }
    ,
    bindEndChange(e){
      let _index = e.mp.detail.value;
      let val = this.hourArray[_index]
      this.bindHourChange(2,val);
    }
    ,
    bindHourChange(flag,val){//1-start,2--end
      console.log(flag,val);
      if(val.indexOf('已预约')>-1){
        console.log(val.indexOf('已预约'));
        this.$util.showToast('已预约的时间不可选')
        return;
      }
      let hourOrderedArr = this.hourOrderedArr;
      let isOk = true;
      function compareTime(sHour,eHour) {
        let s_hour = parseInt(sHour)
        let e_hour = parseInt(eHour)
        console.log(sHour,eHour,s_hour,e_hour,'compareTime');
        if(s_hour<=e_hour){
          return true
        } else{
          return false
        }
      }
      //所选时间是否包含已选时间
      function isHas(sHour,eHour) {
        if(hourOrderedArr.length == 0){
          return
        }
        let s_hour = parseInt(sHour)
        let e_hour = parseInt(eHour)
        console.log(sHour,eHour,s_hour,e_hour,'isHas',hourOrderedArr);
        for(let i = 0;i<hourOrderedArr.length;i++){
          let num_hour = parseInt(hourOrderedArr[i])
          console.log(i,num_hour,4444);
          if(num_hour<e_hour && num_hour>s_hour){
            console.log(i,num_hour);
            isOk = false;
            break;
          }
        }
      }
      if(flag==1 && this.end_hour){
        if(compareTime(val,this.end_hour)){
          isHas(val,this.end_hour);
          if(isOk){
            this.start_hour = val;
          } else{
            this.start_hour = ''
            this.end_hour = ''
            this.$util.showToast('所选时间包含已选时间,请重新选择')
          }
        }else{
          this.start_hour = ''
          this.end_hour = ''
          this.$util.showToast('开始时间不能大于结束时间')
        }
      }
      if(flag==2 && this.start_hour){
        isHas(this.start_hour,val);
        if(compareTime(this.start_hour,val)){
          if(isOk){
            this.end_hour = val;
          } else{
            this.$util.showToast('所选时间包含已选时间,请重新选择')
            this.start_hour = ''
            this.end_hour = ''
          }
        }else{
          this.start_hour = ''
          this.end_hour = ''
          this.$util.showToast('开始时间不能大于结束时间')
        }
      }
      if(flag == 1 && isOk){
        this.start_hour = val;
      }
      if(flag == 2 && isOk){
        this.end_hour = val;
      }
      
    },
    // 显示退款规则
    refundEvent(){
      wx.navigateTo({
        url:'/pages/person/about/main?id=2'
      })
    }


  },
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
