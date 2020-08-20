import Vue from "vue";
import Router from "vue-router";

import Start from '@/pages/Start'
import Check from '@/pages/Check'
import Result from '@/pages/PostcodeResult'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "Start",
            component: Start,
        },
        {
            path: "/enter_postcode",
            name: "Enter Postcode",
            component: Check,
        },
        {
            path: "/postcode_result/:postcode",
            name: "Result",
            component: Result,
            props: true
        }
    ],
});
