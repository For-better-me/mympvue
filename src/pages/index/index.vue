<template>
  <div class="home">
    <Slider2
    :indicator="indicator"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :imgUrls="imgUrls"></Slider2>
    <div class="home_nav">
        <ul>
            <li v-for = '(nav,index) in navList' :key = 'nav.id'>
                <img :src="nav.icon_img">
                <p>{{nav.title}}</p>
            </li>
        </ul>
    </div>
    <div class="video_wrap shadow_wrap">
        <h1>视频</h1>
        <a href="/pages/index/mediaList/main">更多</a>
        <video :src="videoSrc" controls objectFit = 'fill' poster = 'http://bpic.588ku.com/element_pic/17/11/08/f9c4c381c639daeb7c47439d15640445.jpg!/fw/260/quality/90/unsharp/true/compress/true'></video>
    </div>
   
  </div>
</template>

<script>
import Slider2 from '@/components/slide.vue'
import Demo from '@/components/demo.vue'
export default {
  name:'Home',
  data () {
    return {
      autoplay: false,
      interval: 5000,
      duration: 1000,
      imgUrls: [
        '/static/img/1.jpg',
        '/static/img/2.jpg',
        '/static/img/3.jpg'
      ],
      videoSrc:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      img:'/static/img/2.jpg',
      navList:[
        {
            "id": 6,
            "title": "演播室",
            "icon_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/54bbdc83c0aab9653bbe2c2f275f2b3a.png",
            "video_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/c4cb3f5fd8eff020125d8cc9b0a2148d.png",
            "video": "http://dengkai.viphk.ngrok.org/public/static/upload/video/20181223/8e60223ce902bb589726cb63b60f9db1.mp4"
        },
        {
            "id": 7,
            "title": "MOCO设备",
            "icon_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/7ff5379c77d8facbd94937027aba0c19.png",
            "video_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/5f75c3557d12156942cfb827f54aad19.png",
            "video": "http://dengkai.viphk.ngrok.org/public/static/upload/video/20181223/1c89af7b63657a15d476ecb2dd9a8e2c.mp4"
        },
        {
            "id": 8,
            "title": "录音棚",
            "icon_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/f71e0f0f20f399ea6201556631c5c13a.png",
            "video_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/1f8c1ba808292b462dd9001645f72edc.png",
            "video": "http://dengkai.viphk.ngrok.org/public/static/upload/video/20181223/7fe73146f962cd5ee2aa1e65d2edbeb8.mp4"
        },
        {
            "id": 9,
            "title": "创意产品",
            "icon_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/3820ff4375d3c136d7a9286210b4a754.png",
            "video_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/d23c45ae76845c66488b1d472ad75cb3.png",
            "video": "http://dengkai.viphk.ngrok.org/public/static/upload/video/20181223/b7b33d3e2c56791b60f85aef3a4ae635.mp4"
        },
        {
            "id": 2,
            "title": "简介",
            "icon_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/a0c2d61547ec863a8c33582e7cae6a7b.png",
            "video_img": "http://dengkai.viphk.ngrok.org/public/static/upload/images/20181223/d551bc1eec5129fddf7e9cb62c1e4e95.png",
            "video": "http://dengkai.viphk.ngrok.org/public/static/upload/video/20181223/c2d58f8eb65900ec84f12a9b46de4b1d.mp4"
        }
      ]
    }
  },

  components: {
    Slider2,Demo
  },

  methods: {

  },

  created () {
   
  }
}
</script>

<style scoped lang = 'less'>
    @import url("./style");
</style>
