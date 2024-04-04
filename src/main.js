import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VCalendar } from 'vuetify/labs/VCalendar'
import '@mdi/font/css/materialdesignicons.css'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App)
app.use(VueAxios, axios)
axios.defaults.baseURL = 'http://127.0.0.1/api';

const vuetify = createVuetify({
    components: {
        ...components,
        VCalendar,
    },
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#FF4545',
                    secondary: '#D4D4D4',
                }
            },
        },
    },
})

createApp(App).use(vuetify).use(store).use(router).mount('#app')
