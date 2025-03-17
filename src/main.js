import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import mitt from 'mitt'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#F17422',
    secondary: '#45BFB3',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
    },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('auth')) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

const app = createApp(App)
const emitter = mitt()

app.config.globalProperties.$root = {}
app.config.globalProperties.$root.$emit = emitter.emit
app.config.globalProperties.$root.$on = emitter.on

app.use(router).use(vuetify).mount('#app')
