/** ******* vuex核心模块 *********** **/
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store
