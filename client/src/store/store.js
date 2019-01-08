import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    trailers: [],
    departedTrailers: [],
    requests: [],
    dockDoors: [
      37,
      36,
      35,
      34,
      33,
      32,
      31,
      30,
      29,
      28,
      25,
      24,
      23,
      22,
      21,
      20,
      19,
      "18a",
      18,
      17,
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ]
  },

  mutations: {
    getTrailers(state, trailers) {
      state.trailers = trailers;
    },

    getDepartedTrailers(state, departedTrailers) {
      state.departedTrailers = departedTrailers;
    },

    getRequests(state, requests) {
      state.requests = requests;
    },

    ADD_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    UPDATE_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    DELETE_TRAILER: (state, payload) => {
      state.trailers = payload;
    },

    REQUEST: (state, payload) => {
      state.requests = payload;
    },

    COMPLETED: (state, payload) => {
      state.trailers = payload.trailers;
      state.requests = payload.requests;
    },

    DEPARTED_TRAILER: (state, payload) => {
      state.trailers = payload.trailers;
      state.departedTrailers = payload.departed;
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

    getRequests(state) {
      fetch("http://localhost:3000/requests")
        .then(res => res.json())
        .then(requests => {
          state.commit("getRequests", requests);
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

    REQUEST: (state, payload) => {
      state.commit("REQUEST", payload);
    },

    COMPLETED: (state, payload) => {
      state.commit("COMPLETED", payload);
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
