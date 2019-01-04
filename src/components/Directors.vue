<template>
  <div class="directors__wrapper" @scroll="directorScroll">
    <transition-group name="slide" tag="div" class="img-slider">
      <div v-for="number in [currentSlide]" v-bind:key="number" class="directors__item">
        <div class="container__director" :style="{'order': currentSlide == 0? 2:1}">
          <h3>{{ directors[currentSlide].title}}</h3>
          <p>{{ directors[currentSlide].text }}</p>
          <router-link to="/about" class="more btn">Подробнее</router-link>
        </div>
        <div class="image_wrapper" :style="{'order': currentSlide == 0? 1:2}">
          <img :src="directors[currentSlide].image" class="image" alt>
        </div>
      </div>
    </transition-group>
    <div class="link-group">
      <a @click="play=!play" class="play">{{play?'Пауза':'Старт'}}</a>
      <a @click="currentSlide = currentSlide === 1 ? 0 : 1" class="next">Далее</a>
    </div>
  </div>
</template>
<script>
import bg from "@/assets/bg2.jpg";
import pavel from "@/assets/Pavel.jpg";
import onufrii from "@/assets/Onufrii.jpg";
import { TimelineLite } from "gsap";
export default {
  name: "Directors",
  data() {
    return {
      bg,
      currentSlide: 0,
      play: true,
      directors: [
        {
          title: "Блаженнейший Митрополит Киевский и всея Украины Онуфрий",
          text:
            "Церковь сегодня – это, пожалуй, единственное оставшееся звено, которое соединяет Восток и Запад, сохраняет народное единство в стране. Каждый священник знает, что во Христе этнические, социальные и прочие различия отходят на второй план. Каждый человек для нас – образ Божий, который надо любить и почитать. Но одно дело знать, а другое дело – реализовывать это знание в жизни.",
          image: onufrii,
          url: "1"
        },
        {
          title: "Митрополит Вышгородский и Чернобыльский Павел",
          text:
            "Церковь сегодня – это, пожалуй, единственное оставшееся звено, которое соединяет Восток и Запад, сохраняет народное единство в стране. Каждый священник знает, что во Христе этнические, социальные и прочие различия отходят на второй план. Каждый человек для нас – образ Божий, который надо любить и почитать. Но одно дело знать, а другое дело – реализовывать это знание в жизни.",
          image: pavel,
          url: "2"
        }
      ]
    };
  },
  methods: {
    directorScroll() {
      let opacityValue;
      let widthValue;
      let tl = new TimelineLite();
      tl.to(".container__director h3", 0.5, { y: -window.scrollY / 10 })
        .to(".container__director p", 0.25, { y: -window.scrollY / 10 })
        .to(".container__director a", 0.25, { y: -window.scrollY / 10 })
        .to(".image", 0.5, { opacity: this.opacityValue }, "-=0.7");

      if (window.scrollY < 100) {
        this.opacityValue = 0;
        this.widthValue = "50%";
      } else {
        this.opacityValue = 1;
        this.widthValue = 0;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.directorScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.directorScroll);
  },
  mounted() {
    setInterval(() => {
      if (this.play) {
        this.currentSlide = this.currentSlide == 1 ? 0 : 1;
      }
    }, 5000);
  }
};
</script>
<style scoped>
.directors__wrapper {
  height: 100%;
  width: 100%;
}
.img-slider {
  display: flex;
  height: 100%;
  width: calc(100vw - 8em);
  position: relative;
  overflow: hidden;
}
.directors__item {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.image_wrapper {
  position: relative;
  width: 50%;
  height: 100%;
}
.image {
  display: block;
  height: 100%;
  margin: 0 auto;
}
.container__director {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  padding: 2em 4em;
  height: 100%;
  width: calc(50% - 8rem);
}
.container__director h3 {
  font-size: 1.6em;
}
.container__director p {
  margin: 2rem 0;
  font-weight: normal;
  text-align: justify;
}
.slide-leave-active,
.slide-enter-active {
  transition: 2s ease-in-out;
}
.slide-enter {
  opacity: 0 !important;
  transform: translate(100%, 0);
}
.slide-leave-to {
  opacity: 0 !important;
  transform: translate(-100%, 0);
}
.link-group a {
  padding: 1em;
}
a:hover {
  cursor: pointer;
}
.link-group {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
