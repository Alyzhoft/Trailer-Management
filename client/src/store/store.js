import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.devtools = true;

export const store = new Vuex.Store({
  state: {
    error: {},
    user: {},
    trailers: [],
    departedTrailers: [],
    requests: [],
    categories: [],
    carriers: [],
    users: [],
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
    primaryLotSpots: [
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

    getCarriers(state, carriers) {
      state.carriers = carriers;
    },

    getCategories(state, categories) {
      state.categories = categories;
    },

    getUsers: (state, users) => {
      state.users = users;
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
    },

    ADD_CARRIER: (state, payload) => {
      state.carriers = payload;
    },

    DELETE_CARRIER: (state, payload) => {
      state.carriers = payload;
    },

    ADD_CATEGORY: (state, payload) => {
      state.categories = payload;
    },

    EDIT_CATEGORY: (state, payload) => {
      state.categories = payload;
    },

    DELETE_CATEGORY: (state, payload) => {
      state.categories = payload;
    },

    ADD_USER: (state, payload) => {
      state.users = payload;
    },

    EDIT_USER: (state, payload) => {
      state.users = payload;
    },

    DELETE_USER: (state, payload) => {
      state.users = payload;
    }
  },

  actions: {
    getTrailers(state) {
      fetch("http://localhost:3000/trailers")
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
      fetch("http://localhost:3000/departedtrailers")
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
      fetch("http://localhost:3000/requests")
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
      // fetch(`https://trailermanagement.azurewebsites.net/.auth/me`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json"
      //   }
      //   // mode: "no-cors"
      // })
      //   .then(res => res.json)
      //   .then(user => {
      const user = { email: "Alexander.Lyzhoft@Andersencorp.com" };
      fetch(`http://localhost:3000/getUser`, {
        method: "POST",
        body: JSON.stringify({
          user: user
        }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(userData => {
          state.commit("getUserData", userData);
        });
      // });
    },

    getCarriers(state) {
      fetch("http://localhost:3000/carriers")
        .then(res => res.json())
        .then(carriers => {
          state.commit("getCarriers", carriers);
        });
    },

    getCategories(state) {
      fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(categories => {
          state.commit("getCategories", categories);
        });
    },

    getUsers(state) {
      fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
          state.commit("getUsers", users);
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
    },

    ADD_CARRIER: (state, payload) => {
      state.commit("ADD_CARRIER", payload);
    },

    DELETE_CARRIER: (state, payload) => {
      state.commit("DELETE_CARRIER", payload);
    },

    ADD_CATEGORY: (state, payload) => {
      state.commit("ADD_CATEGORY", payload);
    },

    EDIT_CATEGORY: (state, payload) => {
      state.commit("EDIT_CATEGORY", payload);
    },

    DELETE_CATEGORY: (state, payload) => {
      state.commit("DELETE_CATEGORY", payload);
    },

    ADD_USER: (state, payload) => {
      state.commit("ADD_USER", payload);
    },

    EDIT_USER: (state, payload) => {
      state.commit("EDIT_USER", payload);
    },

    DELETE_USER: (state, payload) => {
      state.commit("DELETE_USER", payload);
    }
  },
  getters: {
    getCurrentTrailers(state) {
      return state.trailers;
    },

    getUser(state) {
      return state.user;
    }
  }
});
