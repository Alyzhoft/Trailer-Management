import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    trailers: [],
    departedTrailers: []
  },

  mutations: {
    getTrailers(state, trailers) {
      state.trailers = trailers;
    },

    getDepartedTrailers(state, departedTrailers) {
      state.departedTrailers = departedTrailers;
    },

    ADD_TRAILER: (state, payload) => {
      state.trailers.push(payload);
    },

    UPDATE_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    DELETE_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    DEPARTED_TRAILER: (state, payload) => {
      state.trailers = payload.trialerResults;
      state.departedTrailers = payload.departedTrailersResults;
    }
  },

  actions: {
    getTrailers(state) {
      fetch("http://localhost:3000/trailers")
        .then(res => res.json())
        .then(trailers => {
          state.commit("getTrailers", trailers);
        });
    },

    getDepartedTrailers(state) {
      fetch("http://localhost:3000/departedtrailers")
        .then(res => res.json())
        .then(departedTrailers => {
          state.commit("getDepartedTrailers", departedTrailers);
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
    },

    DEPARTED_TRAILER: (state, payload) => {
      state.commit("DEPARTED_TRAILER", payload);
      console.log(payload);
    }
  },
  getters: {
    getCurrentTrailers(state) {
      return state.trailers;
    }
  }
});
