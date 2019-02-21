<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/#/">Trailer Management</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/#/requests">Requests</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/offsitelot">Off-Site Lot</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/search">Search</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getTrailers();
    this.getDepartedTrailers();
    this.getRequests();
    this.getUserData();
  },
  methods: {
    ...mapActions([
      "getTrailers",
      "getDepartedTrailers",
      "getRequests",
      "getUserData"
    ])
  },
  sockets: {
    connect: function() {},

    create: function(trailer) {
      console.log(trailer);
      if (trailer.isJoi) {
        console.log("Error");
      } else {
        console.log("No Error");
        this.$store.dispatch("ADD_TRAILER", trailer);
      }
    },

    update: function(trailers) {
      this.$store.dispatch("UPDATE_TRAILER", trailers);
    },

    move: function(trailers) {
      this.$store.dispatch("UPDATE_TRAILER", trailers);
    },

    deleteTrailer: function(trailers) {
      this.$store.dispatch("DELETE_TRAILER", trailers);
    },

    request: function(requests) {
      this.$store.dispatch("REQUEST", requests);
    },

    deleteRequest: function(requests) {
      this.$store.dispatch("DELETE_REQUEST", requests);
    },

    completed: function(res) {
      this.$store.dispatch("COMPLETED", res);
    },

    departed: function(res) {
      console.log(res);
      this.$store.dispatch("DEPARTED_TRAILER", res);
    }
  }
};
</script>

<style>
.logout:hover,
.logout:focus {
  cursor: pointer;
}
</style>

