import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);
Vue.config.devtools = true;

export const store = new Vuex.Store({
  state: {
    error: {},
    user: {},
    trailers: [],
    departedTrailers: [],
    requests: [],
    categories: [
      "Bays",
      "Completed",
      "Dunnage",
      "Empties for Shipping",
      "In Process",
      "Patio Trailers",
      "Receiving",
      "Receiving - Rush",
      "Receiving - Storage",
      "Storage/Misc. Shipping Trailers",
      "Supermarket/Legacy/Eng"
    ],
    carriers: [
      "Dart",
      "Transport Design",
      "DRT",
      "Waletich",
      "Taylor",
      "Terminal",
      "Trucking Proz",
      "UTS",
      "J&R",
      "Kuehl",
      "American Fast Freight",
      "Ryder",
      "Keene’s",
      "XPO Logistics",
      "Universal",
      "XTRA Lease",
      "Brockman",
      "Fillmore",
      "Renewal Green",
      "Renewal Black",
      "Teams"
    ],
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
    ],
    RVACdockDoors: [
      74,
      73,
      72,
      71,
      70,
      69,
      68,
      67,
      66,
      65,
      64,
      63,
      62,
      61,
      60,
      59,
      58,
      57,
      56,
      55,
      54,
      53,
      52,
      51,
      50,
      49,
      48,
      47,
      46,
      45,
      44,
      43,
      42,
      41,
      40
    ],
    secondaryLotSpots: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60
    ]
  },

  mutations: {
    error(state, response) {
      state.error = response;
    },
    getTrailers(state, response) {
      state.trailers = response;
    },

    getDepartedTrailers(state, departedTrailers) {
      state.departedTrailers = departedTrailers;
    },

    getRequests(state, requests) {
      state.requests = requests;
    },

    getUserData(state, user) {
      state.user = user;
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

    DELETE_REQUEST: (state, payload) => {
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
      fetch("https://trailermanagementbe.azurewebsites.net/trailers")
        .then(res => res.json())
        .then(response => {
          if (response.name) {
            response.function = "getTrailers";
            state.commit("error", response);
          } else {
            state.commit("getTrailers", response);
          }
        });
    },

    getDepartedTrailers(state) {
      fetch("https://trailermanagementbe.azurewebsites.net/departedtrailers")
        .then(res => res.json())
        .then(response => {
          if (response.name) {
            response.function = "getDepartedTrailers";
            state.commit("error", response);
          } else {
            state.commit("getDepartedTrailers", response);
          }
        });
    },

    getRequests(state) {
      fetch("https://trailermanagementbe.azurewebsites.net/requests")
        .then(res => res.json())
        .then(response => {
          if (response.name) {
            response.function = "getRequests";
            state.commit("error", response);
          } else {
            state.commit("getRequests", response);
          }
        });
    },

    getUserData(state) {
      fetch("https://trailermanagement.azurewebsites.net/.auth/me")
        .then(res => res.json())
        .then(user => {
          state.commit("getUserData", user);
        });
    },

    ADD_TRAILER: (state, payload) => {
      if (payload.name) {
        payload.function = "addTrailer";
        state.commit("error", payload);
      } else {
        state.commit("ADD_TRAILER", payload);
      }
    },

    UPDATE_TRAILER: (state, payload) => {
      if (payload.name) {
        payload.function = "updateTrailer";
        state.commit("error", payload);
      } else {
        state.commit("UPDATE_TRAILER", payload);
      }
    },

    DELETE_TRAILER: (state, payload) => {
      state.commit("DELETE_TRAILER", payload);
    },

    REQUEST: (state, payload) => {
      state.commit("REQUEST", payload);
    },

    DELETE_REQUEST: (state, payload) => {
      state.commit("DELETE_REQUEST", payload);
    },

    COMPLETED: (state, payload) => {
      state.commit("COMPLETED", payload);
    },

    DEPARTED_TRAILER: (state, payload) => {
      state.commit("DEPARTED_TRAILER", payload);
    }
  },
  getters: {
    getCurrentTrailers(state) {
      return state.trailers;
    }
  }
});
