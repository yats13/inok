<template>
    <section class="container flex">
        <div class="image__wrapper">
            <div
                    :key="image.id"
                    :style="{ backgroundImage: 'url(' + image.link + ')' }"
                    class="image"
                    v-for="image in post.image"
            ></div>
        </div>
        <div class="text__wrapper">
            <h1>{{post.title}}</h1>
            <div class="place">
                {{post.place.monastery_id}},
                {{post.place.s_name}},
                {{post.place.r_name}},
                {{post.place.c_name}}
            </div>
            <div class="post-text" v-html="post.content"></div>
            <a :href="post.source" class="more btn">Источник</a>
            <router-link class="more btn" to="/index">Назад</router-link>
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
            const lang = this.$route.params.lang;
            this.axios
                .get(`https://inok.info/public/api/post/${current}/${lang}`)
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
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-right: 2em;
    }

    .image {
        width: 100%;
        min-height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .text__wrapper {
        width: 50%;
    }

    .place {
        font-weight: 100;
        text-align: right;
        font-size: 0.9rem;
    }

    a.more.btn {
        margin: 2em 0;
        color: #fff !important;
        text-decoration: none;
    }
</style>
