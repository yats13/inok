<template>
  <div class="video page">
    <vue-plyr class="video-item" v-for="video in videos.items" :key="video.id">
      <div v-if="video.youtube" data-plyr-provider="youtube" :data-plyr-embed-id="video.youtube"></div>
    </vue-plyr>
    <div class="pagination">
      <a
        class="btn"
        v-if="videos.current > 1"
        @click.prevent="getVideos(videos.before)"
      >Предыдущая - {{videos.before}}</a>
      <a class="btn" @click.prevent="getVideos(videos.next)">Следующая - {{videos.next}}</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videos: [],
      pagination: [],
      currentPage: 1
    };
  },
  methods: {
    getVideos(page) {
      this.currentPage = page > 1 ? page : 1;
      this.axios
        .get(`https://inok.info/public/api/videos/${this.currentPage}`)
        .then(response => (this.videos = response.data.data));
    }
  },
  mounted() {
    this.getVideos();
  }
};
</script>
<style>
.video {
  padding: 4em;
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
}
.video-item {
  width: 25%;
}
.pagination {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
}
</style>
