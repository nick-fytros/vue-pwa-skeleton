import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './main.vue';
import Config from './utils/config';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);

const config = new Config();

new Vue({
    el: '#app',
    router: config.initRouter(VueRouter),
    store: config.initStore(Vuex),
    render: function (createElement) {
        return createElement(App);
    }
});

// service worker init
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
}