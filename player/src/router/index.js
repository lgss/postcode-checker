import Vue from "vue";
import Router from "vue-router";

import Start from '@/pages/Start'
import Check from '@/pages/Check'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "Start",
            component: Start,
            meta: {},
        },
        {
            path: "/enter_postcode",
            name: "Enter Postcode",
            component: Check,
            meta: {}
        }
    ],
});
