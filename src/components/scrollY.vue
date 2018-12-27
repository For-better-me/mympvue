<template>
  <div class="scroll_wrap">
    <scroll-view
        scroll-y
        style="height: 100%"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        @scroll="scroll"
      >
      <slot></slot>
        
    </scroll-view>
  </div>
</template>

<script>
export default {
    name:'scrollWrap',
    data(){
        return {
           
        }
    },
    methods:{
        upper(){
            this.$emit('upperEvent')
        },
        lower(){
            this.$emit('lowerEvent')
        }
    },
    props:['upperEvent','lowerEvent']
}
</script>

<style>

</style>
