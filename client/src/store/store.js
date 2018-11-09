import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    trailers: []
  },

  mutations: {
    getTrailers(state, trailers) {
      state.trailers = trailers;
    },

    ADD_TRAILER: (state, payload) => {
      state.trailers.push(payload);
    },

    UPDATE_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    DELETE_TRAILER: (state, payload) => {
      state.trailers = payload;
    }
  },

  actions: {
    getTrailers(state) {
      fetch("http://localhost:3000/trailers/dashboard")
        .then(res => res.json())
        .then(trailers => {
          state.commit("getTrailers", trailers);
        });
    },

    ADD_TRAILER: (state, payload) => {
      state.commit("ADD_TRAILER", payload);
    },

    UPDATE_TRAILER: (state, payload) => {
      state.commit("UPDATE_TRAILER", payload);
    },

    DELETE_TRAILER: (state, payload) => {
      state.commit("DELETE_TRAILER", payload);
    }
  },
  getters: {
    getCurrentTrailers(state) {
      return state.trailers;
    }
  }
});
