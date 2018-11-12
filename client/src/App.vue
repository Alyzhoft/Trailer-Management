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
            <a class="nav-link" href="/#/trailerentry">Trailer Entry</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/edittrailer">Edit Trailer</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/dashboard">Trailer View</a>
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
  },
  methods: mapActions(["getTrailers"]),
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

    delete: function(trailers) {
      this.$store.dispatch("DELETE_TRAILER", trailers);
    }
  }
};
</script>

