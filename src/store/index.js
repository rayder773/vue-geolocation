import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [],
  },
  mutations: {
    addToHistory(state, payload) {
      state.history.push(...payload);
    },
    cleanHistory(state) {
      state.history = [];
    }
  },
  actions: {},
  modules: {}
});
