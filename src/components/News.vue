<template>
  <div class="news" @scroll="handleScroll">
    <div class="tags_wrapper">
      <h2>{{tagName}}</h2>
      <ul class="tags">
        <span>Рубрики:</span>
        <li>
          <a
            class="tag"
            @click="isActive = '', tagName='Последние события'"
            :class="{'active': !isActive}"
          >Все</a>
        </li>
        <li v-for="tag in tags" :key="tag.id">
          <a
            class="tag"
            @click="isActive = tag.id, tagName = tag.name"
            :class="{'active': isActive === tag.id ? true:false}"
          >{{tag.name}}</a>
        </li>
      </ul>
      <div class="tag__content">
        <router-link
          v-for="content in filteredContent"
          :to="{ name:'post', params: { post_id: content.id }}"
          class="tag__card"
          :key="content.id"
        >
          <div class="tag__text">
            <h3>{{content.title}}</h3>
            <span class="post__date">{{ content.date}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <aside class="recent-info">
      <v-calendar :attributes="attrs"></v-calendar>
      <p>{{fasting}}</p>
      <span v-for="holiday in holidays" :key="holiday.id">{{holiday.title}}</span>
      <div>
        <span v-for="(saint, index) in saints" :key="index">{{saint.title}}</span>
      </div>
    </aside>
  </div>
</template>
<script>
import { TimelineLite } from "gsap";
import "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import { Calendar } from "v-calendar";
import "@/assets/calendar.min.css";
export default {
  name: "news",
  components: {
    vCalendar: Calendar
  },
  data() {
    return {
      categories: [],
      attrs: [
        {
          key: "",
          highlight: {
            backgroundColor: "rgba(200,200,247,.9)"
          },
          dates: new Date(),
          popover: {
            label: "!"
          }
        }
      ],
      holidays: [],
      saints: [],
      fasting: "",
      tags: [],
      contents: [],
      isActive: "",
      tagName: "Последние события"
    };
  },
  mounted() {
    this.getPosts();
    this.renderCalendar();
  },
  methods: {
    renderCalendar() {
      this.axios
        .get("https://azbyka.ru/days/api/day.json")
        .then(
          response => (
            (this.saints = response.data.saints),
            (this.holidays = response.data.holidays),
            (this.fasting =
              response.data.fasting.type === 1 ? "Постный день" : "Поста нет")
          )
        );
    },
    getPosts() {
      this.axios
        .get("https://inok.info/public/api/posts-list")
        .then(
          response => (
            (this.contents = response.data.posts),
            (this.tags = response.data.tags)
          )
        );
    },
    handleScroll() {
      const tl = new TimelineLite();
      tl.to(".recent-info", 0.5, { y: -window.scrollY / 8 });
    }
  },
  computed: {
    filteredContent() {
      if (this.isActive === "") {
        return this.contents;
      } else {
        return this.contents.filter(content => {
          if (content.tags.indexOf(this.isActive)) return content;
        });
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.news {
  position: relative;
}
.tags_wrapper {
  width: calc(80% - 2em);
}
.tags_wrapper h2 {
  font-size: 2rem;
}
.tags_wrapper h3 {
  color: inherit;
  font-size: 1.1rem;
  font-weight: bold;
}
.tags_wrapper p {
  font-size: 0.9rem;
  font-weight: normal;
}
.tags_wrapper ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 1rem 0;
}
.tags_wrapper .tag {
  position: relative;
  padding: 0.5em;
}
.tag:hover {
  cursor: pointer;
}
.tag::before,
.active::before {
  position: absolute;
  content: "";
  height: 4px;
  width: 0;
  background: linear-gradient(
    120deg,
    rgba(200, 200, 247, 0.9),
    rgba(51, 120, 185, 0.9)
  );
  bottom: 0;
  right: 0;
  transition: width 0.2s cubic-bezier(0.51, 0.18, 0, 0.88) 0.1s;
}
.tag:hover::before,
.active::before {
  left: 0;
  width: 100%;
}
.tag__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -1em;
  /* width:80%; */
}
.tag__card {
  width: calc(33% - 2em);
  margin: 0.25rem 1em;
  /* background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); */
}
.tag__text {
  padding: 0.5em;
}
.thumbnail {
  overflow: hidden;
  max-height: 180px;
}
.thumbnail img {
  max-width: 100%;
}
.recent-info {
  position: absolute;
  height: 80vh;
  width: 20%;
  right: -4em;
  top: 25%;
  padding: 3em 2em;
  background: linear-gradient(
    120deg,
    rgba(200, 200, 247, 0.9),
    rgba(51, 120, 185, 0.9)
  );
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
}
.recent-info h3 {
  font-size: 1.5rem;
}
.recent-info ul {
  padding-left: 1em;
}
.post__date {
  font-size: 0.9rem;
  font-weight: 100;
}
</style>
