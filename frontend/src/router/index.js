import {createRouter, createWebHistory} from "vue-router";

import home from "@/components/Home"
import profile from "@/components/Profile";
import tracking from "@/components/Tracking";
import offers from "@/components/Offers";
import login from "@/components/Login";
import register from "@/components/Register";


const routes =[
    {path: "/", component: home},
    {path: "/profile", component: profile},
    {path: "/tracking", component: tracking},
    {path: "/offers", component: offers},
    {path: "/login", component: login},
    {path: "/register", component: register},
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "active"
})
export default router;
