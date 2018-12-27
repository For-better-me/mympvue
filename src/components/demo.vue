<template>
  <div class="demo">
     <video
    id="myVideo"
    :src="a"
    enable-danmu
    danmu-btn
    :controls = "controls"
  ></video>
    <slot :todo="todo">
      {{ todo.text }}
    </slot>
  </div>
</template>

<script>
export default {
    name:'demo',
    data(){
        return {
           
        }
    },
    props:{
      a:{
        type:String,
        default:'111'
      },
      controls:{
        type:Boolean,
        default:'111'
      },
      todo:{
        type:Object,
        default:{
          text:'i am a girl',
          isComplete:true
        }
      }
    }
}
</script>

<style>
.slider {
}
</style>
