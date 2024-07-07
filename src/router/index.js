import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Programari from '../views/programari/Programari.vue'
import Staff from '../views/staff/Staff.vue'
import StaffIstoric from '../views/staff/StaffIstoric.vue'
import Pacienti from '../views/pacienti/Pacienti.vue'
import Profile from '../views/profile/Profile.vue'
import Notificari from '../views/notificari/Notificari.vue'
import Servicii from '../views/servicii/Servicii.vue'
import Pachete from '../views/pachete/Pachete.vue'
import Contracte from '../views/contracte/Contracte.vue'
import ConfirmaProgramarea from '../views/ConfirmaProgramarea.vue'
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
            path: "/staff",
            name: "Staff",
            component: Staff,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/staff/:id",
            name: "StaffIstoric",
            component: StaffIstoric,
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
            path: "/contracte",
            name: "Contracte",
            component: Contracte,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/confirma-programarea",
            name: "ConfirmaProgramarea",
            component: ConfirmaProgramarea
        },
    ]
})


export default routes