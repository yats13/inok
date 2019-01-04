<template lang="html">
<div class="container">
  <h2>{{title}}</h2>
  <masonry
  :cols="{default: 5, 1000: 3, 700: 2, 400: 1}"
  :gutter="2"
  >
  <div v-for="(item, index) in monasteries" :key="index">
    <a :href="item.url" class="monastery">
    <img :src="item.image" class="img-fluid"/>
</a>
  </div>
</masonry>
</div>
</template>

<script>
export default {
  name: "monasteries",
  data() {
    return {
      title: "Монастыри",
      monasteries: []
    };
  },
  methods: {
    getMonasteries() {
      this.axios
        .get("https://inok.info/public/api/monasteries")
        .then(response => {
          this.monasteries = response.data;
        });
    }
  },
  mounted() {
    this.getMonasteries();
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 2rem;
  margin: 1em 0;
}
.img-fluid {
  max-width: calc((100vw - 11em) / 5);
}
</style>