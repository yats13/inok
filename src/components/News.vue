<template>
    <section id="news">
        <div class="center-block">
            <vue-plyr :key="video.id" class="main-video">
                <div :data-plyr-embed-id="video.id" data-plyr-provider="youtube"></div>
            </vue-plyr>
            <span class="main-title">{{video.title}}</span>
        </div>
        <div class="right-block">
            <div class="tags flex-column">
                <a
                        :key="index" :style="{'background': item.color}"
                        class="tag__item"
                        v-for="(item, index) in types"
                        v-on:click="currentPostType = index"
                >{{ item.name }}
                </a>
            </div>
            <router-link
                    :key="post.id"
                    :to="{name:'post', params:{post_id:post.post_id, lang:post.lang_id}}"
                    class="news-item"
                    v-for="post in getPosts">
                <div
                        :style="{backgroundImage: 'url(' + post.image + ')'}"
                        class="title__image"
                        v-if="post.image"
                ></div>
                <div class="title__wrapper">
                    <span class="title">{{ post.title }}</span>
                    <div class="line"></div>
                    <span class="title__date">{{post.date}}</span>
                </div>
            </router-link>
        </div>
    </section>
</template>
<script>
    export default {
        name: "news",
        data() {
            return {
                types: [],
                currentPostType: 1,
                tags: [],
                video: {},
                posts: []
            };
        },
        methods: {
            async getNews() {
                await this.axios
                    .get("https://inok.info/public/api/posts-list")
                    .then(response => {
                        this.types = response.data.types;
                        this.tags = response.data.tags;
                    });
            },
            async getVideo() {
                await this.axios
                    .get("https://www.googleapis.com/youtube/v3/search", {
                            params: {
                                key: 'AIzaSyAgPMk9rrn83qqUtyPa7eKTRdhkknMJ--w',
                                channelId: 'UCRZ0DXqhWAwzjuzsksKQRrA',
                                type: 'video',
                                part: 'snippet',
                                order: 'date',
                                maxResults: 1
                            }
                        }
                    )
                    .then(response => {
                        this.video.id = response.data.items[0].id.videoId;
                        this.video.title = response.data.items[0].snippet.title;
                    })
            },
        },
        computed: {
            getPosts: function () {
                return this.types[this.currentPostType].posts
            }
        },
        created() {
            this.getNews();
            this.getVideo();
        }
    };
</script>
<style lang="scss">
    .center-block {
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-right: 1em;
    }

    .main-video {
        min-width: 320px;
        width: 100%;
    }

    .right-block {
        width: 40%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .news-item {
        flex-basis: 100%;
        margin: 1px 2px;
        display: flex;
        max-height: 8rem;
    }

    .news-item:nth-first-child(1) {
        margin-top: 0;
    }

    .news-item:nth-last-child(1) {
        margin-bottom: 0;
    }

    .title {
        text-transform: uppercase;

        &__image {
            flex: 1;
            width: 12rem;

            height: auto;
            background-size: cover;
            background-repeat: no-repeat;
        }

        &__wrapper {
            flex: 2;
            bottom: 1rem;
            background-color: #fff;
            padding: 0.5em;
        }

        &__date {
            color: #777;
            font-size: 0.8em;
        }
    }

    .main-title {
        font-size: 2em;
        padding: 1em;
        background-color: #fff;
    }

    .tags {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .tag__item {
        color: white;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 767px) {
        #news {
            flex-direction: column;
        }
        .center-block,
        .right-block {
            width: 100%;
        }
    }
</style>
