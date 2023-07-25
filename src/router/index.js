import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        }
    ]
})


export default routes