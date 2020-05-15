<template>
    <div class="video page">
        <div :key="video.id" class="video_list" v-for="video in videos.items">
            <vue-plyr class="video-item">
                <div :data-plyr-embed-id="video.youtube" data-plyr-provider="youtube" v-if="video.youtube"></div>
            </vue-plyr>
        </div>

        <div class="pagination">
            <a
                    @click.prevent="getVideos(videos.before)"
                    class="btn"
                    v-if="videos.current > 1"
            >Предыдущая - {{videos.before}}</a>
            <a @click.prevent="getVideos(videos.next)" class="btn">Следующая - {{videos.next}}</a>
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
        display: flex;
        position: relative;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 50px;
    }

    .video_list {
        width: 25%;
    }

    .video-item {
        width: 100%;
    }

    .pagination {
        display: flex;
        position: relative;
        justify-content: space-between;
        width: 100%;
    }
</style>
