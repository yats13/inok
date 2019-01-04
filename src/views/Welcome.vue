<template>
  <div class="welcome" :style="{backgroundImage: 'url('+bgImage+')'}">
    <div class="left" @mouseover="activeClass('coverLeft')">
    <router-link to="/index">
    <h1>{{ title }}</h1>
    <p>{{ msg }}</p>
    </router-link>
    </div>
    <div class="right" @mouseover="activeClass('coverRight')">
      <a href="http://monasteries.org.ua/objects/map/?lang=ru">
      <h1>Карта</h1>
      <p>монастырей Украины</p>
    </a>
    </div>
    <div class="cover" v-bind:class="isActive"></div>
  </div>
</template>

<script>
import bg from '@/assets/bg2.jpg'
export default {
  name: 'Welcome',
  data () {
    return {
      bgImage: bg,
      isActive: '',
      title: 'Официальный сайт',
      msg: 'Синодальной комиссии УПЦ по делам монастырей'
    }
  },
  methods: {
    activeClass (e) {
      this.isActive = e
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .welcome{
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin:0;
  background-size: cover;
  background-position: 50% 50%;
  overflow: hidden;
 }
.left::before, .right::before{
  position: absolute;
  content:'';
  top:0;
  bottom:0;
  width:50%;
  background: rgba(250,250,250,.7);
}
 .left, .right {
   display: flex;
   height: 100%;
   width: 50%;
   padding: 5%;
   flex-direction: column;
   align-items: center;
   justify-content: center;
 }
 .cover{
  position: absolute;
  height: 300%;
  width:50%;
  left:0;
  background: radial-gradient(ellipse at top, rgba(200,200,247,.9), rgba(51,120,185,.9));
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  z-index: 2;
  animation: scale 2s ease-in-out;
  transition: all .5s ease-in;
 }
 .coverLeft{
   right:50%;
   left:0;
   transform: matrix(1, .55, -.2, 1, 0, 0);
   transform-origin: right center 0px;
 }
 .coverRight{
   left:50%;
   right:0;
   transform: matrix(1, -.55, .2, 1, 0, 0);
   transform-origin: left center 0px;
 }

 .left a, .right a{
  z-index:3;
 }
.welcome a:hover{
  color:#fff;
  text-shadow:0 0 5px rgba(0,0,0,0.3);
}
.welcome .right a {
  text-align: right;
}
.welcome h1 {
  font-size: 310%;
  color: inherit;
}
.welcome p {
  color: inherit;
}

@keyframes width {
    from {width: 0px;}
    to {width: 100%;}
}
@keyframes scale {
    0% { width:100%;}
    50% { width:0; }
    100% { width:50%;}
}
</style>
