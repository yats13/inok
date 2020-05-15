import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/views/Welcome";
import Index from "@/views/Index";
import Events from "@/views/Events";
import Gallery from "@/views/Gallery";
import Video from "@/views/Video";
import News from "@/views/News";
import Post from "@/views/Post";
import Sinod from "@/views/Sinod";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: Welcome,
            meta: {
                title: 'Монастыри Украины - официальный сайт',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Карта монастырей Украины и веб-портал Синодальной комиссии Украинской православной церкви по делам монастырей.'
                    },
                    {
                        property: 'og:description',
                        content: 'Карта монастырей Украины и веб-портал Синодальной комиссии Украинской православной церкви по делам монастырей.'
                    }
                ]
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
            meta: {
                title: 'Ab Page - Example App',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The home page of our example app.'
                    },
                    {
                        property: 'og:description',
                        content: 'The home page of our example app.'
                    }
                ]
            }
        },
        {
            path: '/post/:post_id',
            name: "post",
            component: Post
        },
        {
            path: "/index",
            name: "index",
            component: Index,
            meta: {
                title: 'Монастыри Украины - официальный сайт',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Киевская, Почаевская и Святогорская лавра, а также монастыри Украины. Веб-портал Синодальной комиссии Украинской православной церкви по делам монастырей.'
                    },
                    {
                        property: 'og:description',
                        content: 'Киевская, Почаевская и Святогорская лавра, а также монастыри Украины. Веб-портал Синодальной комиссии Украинской православной церкви по делам монастырей.'
                    }
                ]
            }
        },
        {
            path: "/events",
            name: "Events",
            component: Events
        },
        {
            path: "/gallery",
            name: "Gallery",
            component: Gallery
        },
        {
            path: "/video",
            name: "Video",
            component: () => import(/* webpackChunkName: "video" */ './views/Video.vue'),
        },
        {
            path: "/sinod",
            name: "Sinod",
            component: Sinod
        },
        {
            path: "/news",
            name: "News",
            component: News
        }
    ],
    mode: 'history',
})
