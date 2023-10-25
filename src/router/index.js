import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Programari from '../views/Programari.vue'
import Doctori from '../views/doctori/Doctori.vue'
import Pacienti from '../views/pacienti/Pacienti.vue'
import Profile from '../views/profile/Profile.vue'

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
            path: "/doctori",
            name: "Doctori",
            component: Doctori,
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
            path: "/profilul-meu",
            name: "Profile",
            component: Profile,
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