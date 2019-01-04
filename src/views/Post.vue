<template>
  <section class="container flex">
    <div class="image__wrapper">Image</div>
    <div class="text__wrapper">
      <h1>{{post.title}}</h1>
      <div v-html="post.content" class="post-text"></div>
      <router-link to="/index" class="more btn">Назад</router-link>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      post: Object
    };
  },
  mounted() {
    const current = this.$route.params.post_id;
    this.axios
      .get("https://inok.info/public/api/post/" + current)
      .then(response => (this.post = response.data.data));
  }
};
</script>
<style lang="css" scoped>
.flex {
  display: flex;
  flex-direction: row;
}
h1 {
  font-size: 2em;
  margin-bottom: 1em;
}
.image__wrapper {
  width: 40%;
}
.text__wrapper {
  width: 60%;
}
a.more.btn {
  margin: 2em 0;
  color: #fff !important;
  text-decoration: none;
}
</style>
