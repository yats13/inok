<template lang="html">
    <div class="container">
        <h2>{{title}}</h2>
        <masonry
                :cols="{default: 5, 1000: 3, 767: 2, 560: 1}"
                :gutter="2"
        >
            <div :key="index" v-for="(item, index) in monasteries">
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
        max-width: 100%;
    }
</style>