import {createRouter, createWebHistory} from "vue-router";

import home from "@/components/Home"
import profile from "@/components/Profile";
import tracking from "@/components/Tracking";
import offers from "@/components/Offers";
import login from "@/components/Login";
import register from "@/components/Register";
import createOffer from "@/components/createOffer";

import chats from "@/components/chats";
import chat from "@/components/chat";




const routes =[
    {path: "/", component: home},
    {path: "/profile", component: profile},
    {path: "/tracking", component: tracking},
    {path: "/offers", component: offers},
    {path: "/login", component: login},
    {path: "/register", component: register},
    {path: "/createOffer", component: createOffer},
    {path: "/chats", component: chats},
    {path: "/profile", name: "profile" , component: profile, props: true},
    {path: "/chat", name: "chat" , component: chat, props: true},

]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "active"
})
export default router;
