import AComponent from '../components/a.vue';
import BComponent from '../components/b.vue';
import * as actions from './store/actions';
import * as getters from './store/getters';
import user from './store/modules/user';

class Config {
    constructor() {
        this.debug = process.env.NODE_ENV !== 'production';
        this.routes = [
            {
                path: '/a',
                component: AComponent
            },
            {
                path: '/b',
                component: BComponent
            }
        ];
    }

    initRouter(VueRouter) {
        return new VueRouter({
            routes: this.routes
        });
    }

    initStore(Vuex) {
        return new Vuex.Store({
            actions,
            getters,
            modules: {
                user
            },
            strict: this.debug
        });
    }
}

export default Config;
