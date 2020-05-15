<template>
    <div id="app">
        <aside class="left-menu">
            <a>
                <v-icon name="search"/>
            </a>
            <div class="social-container">
                <a
                        href="https://play.google.com/store/apps/details?id=ua.losjakov.monasteriesuoc.app&hl=ru"
                        target="_blank"
                >
                    <v-icon name="brands/google-play"/>
                </a>
                <a href="http://monasteries.org.ua/objects/map/?lang=ru" target="_blank">
                    <v-icon name="map-marked-alt"/>
                </a>
                <a href="https://www.facebook.com/monasteriesofuoc" target="_blank">
                    <v-icon name="brands/facebook-f"/>
                </a>
                <a href="https://t.me/monasteriesofuoc" target="_blank">
                    <v-icon name="brands/telegram-plane"/>
                </a>
            </div>
        </aside>
        <nav class="main">
            <router-link class="menu-item" exact to="/">Главная</router-link>
            <router-link class="menu-item" to="/about">О нас</router-link>
            <router-link class="menu-item" to="/events">События</router-link>
            <router-link class="menu-item" to="/gallery">Галерея</router-link>
            <router-link class="menu-item" to="/video">Видео</router-link>
            <router-link class="menu-item" to="/news">Светская пресса</router-link>
            <router-link class="menu-item" to="/sinod">Заседания синода</router-link>
        </nav>
        <transition name="page-transition">
            <router-view/>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                isActive: false
            };
        }
    };
</script>
<style>
    @import url("https://fonts.googleapis.com/css?family=Lora:400i,700i&subset=cyrillic");

    *,
    html,
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        color: #2c3e50;
    }

    *,
    ::after,
    ::before {
        box-sizing: inherit;
    }

    #app {
        font-family: "Lora", serif;
        font-style: italic;
        font-weight: bold;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    section {
        height: calc(100vh - 8em);
        padding: 4rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        cursor: pointer;
    }

    .container a {
        text-decoration: underline;
        color: #3378b9 !important;
    }

    .main {
        position: absolute;
        left: 4rem;
        top: 1rem;
        width: 50%;
        z-index: 10;
    }

    .main a {
        position: relative;
        padding: 0.5em;
    }

    .main a::before {
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

    .main a:hover::before {
        left: 0;
        width: 100%;
    }

    .flex-container {
        display: flex;
    }

    .row {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .router-link-exact-active {
        display: none;
    }

    .left-menu {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        z-index: 4;
    }

    .left-menu a {
        padding: 1em;
        border-left: 5px solid transparent;
        transition: all 0.3s ease;
    }

    .left-menu a:hover svg {
        transform: scale(1.4);
    }

    .social-container {
        display: flex;
        flex-direction: column;
    }

    .social-container a {
        padding: 0.3em 1em;
    }

    .btn {
        display: block;
        margin-left: 0;
        padding: 0.6em 1.2em;
        max-width: 10rem;
        color: #fff;
        text-align: center;
        background: linear-gradient(
                120deg,
                rgba(200, 200, 247, 0.9),
                rgba(51, 120, 185, 0.9)
        );
        transition: all 0.2s ease;
    }

    .btn:hover {
        background: linear-gradient(
                120deg,
                rgba(51, 120, 185, 0.9),
                rgba(200, 200, 247, 0.9)
        );
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    }
</style>
