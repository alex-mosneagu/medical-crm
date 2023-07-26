import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'


const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
    ]
})


export default routes