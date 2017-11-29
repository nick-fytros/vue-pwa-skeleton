import localforage from 'localforage';
import * as mutationTypes from '../mutationTypes';
import * as actionTypes from '../actionTypes';
import * as userService from '../../../services/user';

const userStorage = localforage.createInstance({
    name: 'user'
});

const state = {
    user: {
        email: '',
        userToken: '',
        firstName: '',
        lastName: ''
    }
};

// getters
const getters = {
    userInfo: state => state.user
};

// actions
const actions = {
    [actionTypes.FETCH_USER_INFO]({ dispatch, commit }) {
        // check indexedDB for user
        userStorage
            .getItem('userInfo')
            .then(userInfo => {
                if (userInfo) {
                    commit(mutationTypes.UPDATE_USER_INFO, userInfo);
                } else {
                    // fetch from api
                    return userService.fetchUserInfo();
                }
            })
            .then(userInfo => {
                commit(mutationTypes.UPDATE_USER_INFO, userInfo);
                // then save to the database too
                return userStorage.setItem('userInfo', userInfo)
            })
            .then(userInfo => {
                // saved, do something if you want with the data
            })
            .catch(error => {
                // console.error(error);
            });
    }
};

// mutations
const mutations = {
    [mutationTypes.UPDATE_USER_INFO](state, userInfo) {
        state.user.email = userInfo.email;
        state.user.userToken = userInfo.userToken;
        state.user.firstName = userInfo.firstName;
        state.user.lastName = userInfo.lastName;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
