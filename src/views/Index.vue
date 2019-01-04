<template>
  <div class="index page">
    <section class="first-screen" @scroll="handleScroll">
      <div class="header-screen">
        <div class="header-image__wrapper">
          <div class="parallax">
            <img :src="headerImage" alt class="header-image">
          </div>
        </div>
        <div class="header-text" data-hover-only="true" id="scene1">
          <h1>{{ header.title }}</h1>
          <p>{{ header.description }}</p>
          <router-link to="/about" class="more btn">Подробнее</router-link>
        </div>
      </div>
      <div class="scroll-downs">
        <div class="mousey">
          <div class="scroller"></div>
        </div>
      </div>
    </section>
    <section id="news">
      <news></news>
    </section>
    <section class="direction">
      <directors></directors>
    </section>
    <section id="videos">
      <all-videos></all-videos>
    </section>
    <section id="monasteries">
      <monasteries></monasteries>
    </section>
  </div>
</template>
<script>
import headerImage from "@/assets/1750.jpg";
import Directors from "@/components/Directors";
import News from "@/components/News";
import Monasteries from "@/components/Monasteries";
import Video from "@/components/Video";
import { TimelineLite } from "gsap";
export default {
  name: "Index",
  components: {
    Directors,
    News,
    Monasteries,
    allVideos: Video
  },
  data() {
    return {
      headerImage,
      header: {
        title: "Монастыри",
        description:
          "веб-портал Синодальной комиссии Украинской православной церкви по делам монастырей"
      }
    };
  },
  methods: {
    handleScroll() {
      let opacityValue;
      const tl = new TimelineLite();
      tl.to(".header-image", 0.5, { y: window.scrollY / 4 })
        .to(".parallax", 0.5, { y: -window.scrollY / 10 })
        .to(".header-text", 0.2, {
          autoAlpha: this.opacityValue,
          y: -window.scrollY / 8
        });
      if (window.scrollY < 300) {
        this.opacityValue = 1;
      } else {
        this.opacityValue = 0;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    const tl = new TimelineLite();
    tl.staggerFromTo(
      ".left-menu a",
      0.5,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0 },
      0.3
    );
    tl.staggerFromTo(
      ".menu-item",
      0.5,
      { opacity: 0, top: -60 },
      { opacity: 1, top: 0 },
      0.05
    );
    tl.fromTo(".header-text", 0.2, { opacity: 0 }, { opacity: 1 });
    tl.from(".header-image", 0.5, { opacity: 0, x: -200 });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.direction {
  background-size: cover;
}
.header-screen {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  width: 100%;
}
.header-image__wrapper {
  position: relative;
  width: 50%;
  height: 100%;
}
.parallax {
  position: absolute;
  overflow: hidden;
  margin: 3rem;
  top: 0;
  background-color: #fff;
}
.header-text {
  display: flex;
  position: relative;
  width: 30%;
  height: 50%;
  padding: 0 10%;
  flex-direction: column;
  justify-content: center;
}

.header-text h1 {
  font-size: 4rem;
  font-style: normal;
  font-weight: bolder;
}
.header-text p {
  max-width: 90%;
  margin-bottom: 1rem;
}
.scroll-downs {
  position: absolute;
  right: 0;
  bottom: 20px;
  left: 0;
  margin: auto;
  width: 34px;
  height: 55px;
}
.mousey {
  width: 3px;
  padding: 6px 8px;
  height: 20px;
  border: 2px solid #2c3e50;
  border-radius: 25px;
  opacity: 0.75;
  box-sizing: content-box;
}
.scroller {
  width: 3px;
  height: 3px;
  border-radius: 25%;
  background-color: #2c3e50;
  animation-name: scroll;
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
  animation-iteration-count: infinite;
}
#news {
  background-color: #efefef;
}
#monasteries {
  margin: 5em 0;
}
@keyframes scroll {
  0% {
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}
</style>
