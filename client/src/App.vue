<template>
  <div id="app">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/#/">
        <img
          src="https://assets.renewalbyandersen.com/-/media/Images/Components/Navigation/header_logo.png?h=64&la=en&w=190&hash=9A5DBCD209227805BE452D77C90F3C21"
          alt
          width="100px"
        >
      </a>
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
            <a class="nav-link" href="/#/">Primary Lot</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/offsitelot">Off-Site Lot</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#/newlot">New Lot</a>
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
import AlertModal from "@/components/AlertModal.vue";
export default {
  data: function() {
    return {
      modal: {
        visible: false,
        text: "",
        header: ""
      }
    };
  },
  async mounted() {
    const trailer = await this.getTrailers();
    // const departedTrailers = await this.getDepartedTrailers();
    const requests = await this.getRequests();
    // const userData = await this.getUserData();
  },
  components: {
    AlertModal
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
      if (trailer.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot add trailer - ${trailer.routine}`;
      } else {
        this.$store.dispatch("ADD_TRAILER", trailer);
      }
    },

    update: function(trailers) {
      if (trailers.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot update trailer - ${trailers.routine}`;
      } else {
        this.$store.dispatch("UPDATE_TRAILER", trailers);
      }
    },

    move: function(trailers) {
      if (trailers.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot move trailer - ${trailers.routine}`;
      } else {
        this.$store.dispatch("UPDATE_TRAILER", trailers);
      }
    },

    deleteTrailer: function(trailers) {
      if (trailers.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot delete trailer - ${trailers.routine}`;
      } else {
        this.$store.dispatch("DELETE_TRAILER", trailers);
      }
    },

    request: function(requests) {
      if (requests.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot create request - ${requests.routine}`;
      } else {
        this.$store.dispatch("REQUEST", requests);
      }
    },

    deleteRequest: function(requests) {
      if (requests.name) {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text = `Cannot delete request - ${requests.routine}`;
      } else {
        this.$store.dispatch("DELETE_REQUEST", requests);
      }
    },
    completed: function(res) {
      if (res.trailers && res.requests) {
        if (res.trailers.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get trailers - ${res.trailers.routine}`;
        } else if (res.requests.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get departed trailers - ${
            res.requests.routine
          }`;
        } else {
          this.$store.dispatch("COMPLETED", res);
        }
      } else {
        if (res.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot complete request - ${res.routine}`;
        }
      }
    },

    departed: function(res) {
      if (res.trailers && res.departed) {
        if (res.trailers.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get trailers - ${res.trailers.routine}`;
        } else if (res.departed.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get departed trailers - ${
            res.departed.routine
          }`;
        } else {
          this.$store.dispatch("DEPARTED_TRAILER", res);
        }
      } else {
        if (res.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot depart trailer - ${res.routine}`;
        }
      }
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

