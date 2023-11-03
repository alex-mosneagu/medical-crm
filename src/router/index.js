import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Programari from '../views/programari/Programari.vue'
import Doctori from '../views/doctori/Doctori.vue'
import Pacienti from '../views/pacienti/Pacienti.vue'
import Profile from '../views/profile/Profile.vue'
import Notificari from '../views/notificari/Notificari.vue'
import Servicii from '../views/servicii/Servicii.vue'
import Pachete from '../views/pachete/Pachete.vue'

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
            path: "/notificari",
            name: "Notificari",
            component: Notificari,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/servicii",
            name: "Servicii",
            component: Servicii,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/pachete",
            name: "Pachete",
            component: Pachete,
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