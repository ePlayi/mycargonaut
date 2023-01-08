import {createRouter, createWebHistory} from "vue-router";

import home from "@/components/Home"
import profile from "@/components/Profile";
import tracking from "@/components/Tracking";
import offers from "@/components/Offers";
import login from "@/components/Login";
import register from "@/components/Register";
import createOffer from "@/components/createOffer";
import Vehicel from "@/components/Vehicel";




const routes =[
    {path: "/", component: home},
    {path: "/profile", component: profile},
    {path: "/tracking", component: tracking},
    {path: "/offers", component: offers},
    {path: "/login", component: login},
    {path: "/register", component: register},
    {path: "/createOffer", component: createOffer},
    {path: "/myVehicels", component: Vehicel},
    {path: "/profile", name: "profile" , component: profile, props: true},

]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "active"
})
export default router;
