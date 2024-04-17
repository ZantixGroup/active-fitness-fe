import axios from "axios";
import { reactive } from 'vue';

export default class Auth {
    static dataStore = reactive({
        accessToken: localStorage.getItem('access_token') ?? null,
        user: JSON.parse(localStorage.getItem('user')) ?? {},
    })

    static get user() {
        return this.dataStore.user;
    }

    static get accessToken() {
        return this.dataStore.accessToken;
    }

    static setAuth(token, user) {
        this.dataStore.accessToken = token;
        axios.defaults.headers.authorization = 'Bearer ' + Auth.accessToken
        this.dataStore.user = user;
    }

    static get isLoggedIn() {
        return !!this.dataStore.accessToken;
    }

    static setUser(user) {
      this.dataStore.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    }

    static setToken(token) {
      this.dataStore.accessToken = token;
    }

    static clearAuth() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        axios.defaults.headers.authorization = null
        this.dataStore.accessToken = null;
        this.dataStore.user = null;
    }
}
