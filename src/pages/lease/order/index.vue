<template>
  <div class="order">
    <form @submit = "sureOrder">
      <div class="order_time">
        <p>预约时间</p>
      </div>
      <div class="site">
        <checkbox-group @change="checkboxChange" name="checkgo">
          <label class="checkbox" v-for="(item,index) in siteCheckbox" :key = "index">
            <checkbox :value="item.name" :checked="item.checked" />
            {{item.value}}
          </label>
        </checkbox-group>
       
      </div>
      <div class="user_order">
         <input placeholder="请输入真实姓名" name='name' />
      </div>
      <a href="/pages/lease/tip/main">提示</a>
      <button form-type = "submit">支付</button>
    </form>
  </div>
</template>

<script>
export default {
  name:'order',
  data () {
    return {
      siteCheckbox:[
        {
          value:'是否需要在场地',
          name:'is_need',
          checked:false
        },
        {
          value:'是否需要在场地2',
          name:'is_need2',
          checked:false
        },
        {
          value:'是否需要在场地3',
          name:'is_need3',
          checked:false
        }
      ]
    }
  },

  components: {
  },

  methods: {
    sureOrder(e){
      console.log(e.mp.detail.value);
    },
    pay(){

    },
    checkboxChange(e){
      console.log(e.mp.detail.value)
    }

  },
  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
  @import url('./style');
</style>
