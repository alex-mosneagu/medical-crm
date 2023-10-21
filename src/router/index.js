import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Programari from '../views/Programari.vue'
import Pacienti from '../views/pacienti/Pacienti.vue'

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
            path: "/programari",
            name: "Programari",
            component: Programari,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/pacienti",
            name: "Pacienti",
            component: Pacienti,
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