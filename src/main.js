import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VCalendar } from 'vuetify/labs/VCalendar'
import 'vuetify/styles'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// VueCalendar
import calendar from "@zantixgroup/vue-calendar"
import "@zantixgroup/vue-calendar/dist/style.css"
import Auth from "@/helpers/Auth";

// ApexCharts
import VueApexCharts from "vue3-apexcharts"

Auth.setToken(localStorage.getItem('access_token'));
axios.defaults.baseURL = 'http://127.0.0.1/api/';
axios.defaults.headers.authorization = 'Bearer ' + Auth.accessToken;

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

createApp(App).use(VueAxios, axios).use(vuetify).use(store).use(router).use(calendar).use(VueApexCharts).mount('#app')
