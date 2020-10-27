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
                        :key="index"
                        class="tag__item"
                        v-for="(item, index) in types"
                        v-on:click="currentPostType = index"
                        :class="{ active: index === currentPostType }"
                >
                  <span class="background"
                        :style="{'background': item.color}"
                  ></span>
                  <span class="text">{{ item.name }}</span>
                </a>
            </div>
            <router-link
                    :key="post.id"
                    :to="{name:'post', params:{post_id:post.post_id, lang:post.lang_id}}"
                    class="news-item"
                    v-for="post in getPosts">
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
            };
        },
        methods: {
           getNews() {
             return this.axios
                      .get("https://inok.info/public/api/posts-list")
                      .then(response => {
                          this.types = response.data.types;
                          this.tags = response.data.tags;
                      });
          },
          getVideo() {
              return this.axios
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
          fetchData(){
            setInterval(()=>{
              this.getNews(), this.getVideo
            },1000)
          }
        },
        computed: {
          getPosts(){
            return this.types[1].posts
          }
        },
        async mounted(){
            this.getVideo();
            this.getNews();
            this.fetchData();
        }
    };
</script>
<style lang="scss">
    .center-block {
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;
        margin-right: 1em;
    }

    .main-video {
        min-width: 320px;
        width: 100%;
    }

    .right-block {
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      align-content: flex-start;
    }

    .news-item {
        flex: 1 1 calc(50% - 4px);
        margin: 1px 2px;
        display: flex;
        flex-direction: column;
    }

    .news-item:nth-first-child(1) {
        margin-top: 0;
    }

    .news-item:nth-last-child(1) {
        margin-bottom: 0;
    }

    .title {
        text-transform: uppercase;

        &__wrapper {
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
        color: inherit;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        position: relative;
      .background{
        position: absolute;
        height: 3px;
        width: 100%;
        bottom: 0;
        left: 0;
        transition: height .2s cubic-bezier(.25, .5, .75, 1);
      }
      &:hover .text{
        color: white;
        z-index: 4;
      }
      &:hover .background{
        height: 100%;
        z-index: 3;
      }
    }


    @media screen and (max-width: 960px) {
      #news {
        flex-direction: column;
      }
        .center-block,
        .right-block {
          flex-direction: column;
            width: 100%;
        }
    }
</style>
