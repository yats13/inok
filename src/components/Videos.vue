<template lang="html">
    <div class="videos">
        <div class="block">
            <div :style="{backgroundImage:'url('+prayers+')'}" class="interview video__wrapper">
                <router-link to=""><span>ПРОПОВЕДИ, СЛОВА, ПОЗДРАВЛЕНИЯ</span></router-link>
            </div>
            <div :style="{backgroundImage:'url('+birdfly+')'}" class="birdfly video__wrapper">

                <!-- С ВЫСОТЫ ПТИЧЬЕГО ПОЛЕТА -->
            </div>
            <div :style="{backgroundImage:'url('+interview+')'}" class="films video__wrapper">
                <!-- ФИЛЬМЫ, ТЕЛЕПЕРЕДАЧИ, ИНТЕРВЬЮ -->
            </div>
        </div>
        <div class="block">
            <div :style="{backgroundImage:'url('+interview+')'}" class="films video__wrapper">

                <!-- ФИЛЬМЫ, ТЕЛЕПЕРЕДАЧИ, ИНТЕРВЬЮ -->
            </div>
            <div :style="{backgroundImage:'url('+birdfly+')'}" class="birdfly video__wrapper">
                <!-- С ВЫСОТЫ ПТИЧЬЕГО ПОЛЕТА -->
            </div>

            <div :style="{backgroundImage:'url('+prayers+')'}" class="interview video__wrapper">
                <!-- <span>ПРОПОВЕДИ, СЛОВА, ПОЗДРАВЛЕНИЯ</span> -->
            </div>
        </div>
    </div>
</template>

<script>
  import birdfly from "@/assets/bg.jpg";
  import interview from "@/assets/interview.jpg";
  import prayers from "@/assets/prayers.jpg";

  export default {
        name: "all-videos",
        data() {
            return {
                birdfly,
                interview,
                prayers
            };
        }
    };
</script>

<style lang="css">
    .block {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
    }

    .video__wrapper {
        background-size: cover;
        height: 50vh;
        width: 33%;
        background-position: center;
        transition: all 0.5s ease-in;
    }

    .video__wrapper:hover {
        width: 50%;
    }
</style>
