<style lang="scss">

</style>

<template>
    <v-app dark>
        <div v-if="!user.firstName">
            <v-content>
                <v-tabs icons grow>
                    <v-tabs-bar dark>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tabs-item href="#tab-1">
                            <v-icon>person</v-icon>
                            Log in
                        </v-tabs-item>
                        <v-tabs-item href="#tab-2">
                            <v-icon>person add</v-icon>
                            Sign up
                        </v-tabs-item>
                    </v-tabs-bar>
                    <v-tabs-items>
                        <v-tabs-content v-for="i in 2" :key="i" :id="'tab-' + i">
                            <v-card flat>
                                <v-card-text>
                                    Login page
                                </v-card-text>
                            </v-card>
                        </v-tabs-content>
                    </v-tabs-items>
                </v-tabs>
            </v-content>
        </div>
        <div v-else>
            <v-navigation-drawer app></v-navigation-drawer>
            <v-toolbar app>
            </v-toolbar>
            <v-content>
                <!-- <v-container> -->
                <p>{{user}}</p>
                <!-- </v-container> -->
                <!-- <router-link to="/a"></router-link>
            <router-link to="/b"></router-link> 
            <router-view></router-view>-->
            </v-content>
            <v-footer app></v-footer>
        </div>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import * as actionTypes from './utils/store/actionTypes';

export default {
    components: {},
    computed: {
        user() {
            return this.$store.getters.userInfo;
        }
    },
    mounted: function() {
        this.$store.dispatch(actionTypes.FETCH_USER_INFO);
    }
};
</script>