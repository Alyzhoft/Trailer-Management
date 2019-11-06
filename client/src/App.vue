<template>
  <v-app id="app">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="drawer = false" link href="/#/requests">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Requests</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="drawer = false" link href="/#/">
          <v-list-item-action>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Primary Lot</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="drawer = false" link href="/#/offsitelot">
          <v-list-item-action>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Off-Site Lot</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="drawer = false" link href="/#/newlot">
          <v-list-item-action>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>New Lot</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="drawer = false" link href="/#/search">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="drawer = false" link href="/#/admin">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <a class="navbar-brand" href="/#/">
        <img
          src="https://assets.renewalbyandersen.com/-/media/Images/Components/Navigation/header_logo.png?h=64&la=en&w=190&hash=9A5DBCD209227805BE452D77C90F3C21"
          alt
          width="100px"
        />
      </a>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import AlertModal from "@/components/AlertModal.vue";
export default {
  data: function() {
    return {
      drawer: false,
      modal: {
        visible: false,
        text: "",
        header: ""
      }
    };
  },
  async mounted() {
    await this.getTrailers();
    // const departedTrailers = await this.getDepartedTrailers();
    await this.getRequests();
    await this.getCarriers();
    await this.getCategories();
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
      "getUserData",
      "getCarriers",
      "getCategories"
    ])
  },
  sockets: {
    connect: function() {
      console.log("Connected");
    },

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
        this.modal.text = `Cannot create request - ${requests.message}`;
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
          this.modal.text = `Cannot get departed trailers - ${res.requests.routine}`;
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
          this.modal.text = `Cannot get departed trailers - ${res.departed.routine}`;
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
    },

    addCarrier: function(carriers) {
      if (carriers) {
        if (carriers.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get carriers - ${carriers.routine}`;
        } else {
          this.$store.dispatch("ADD_CARRIER", carriers);
        }
      }
    },

    deleteCarrier: function(carriers) {
      if (carriers) {
        if (carriers.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get carriers - ${carriers.routine}`;
        } else {
          this.$store.dispatch("DELETE_CARRIER", carriers);
        }
      }
    },

    addCategory: function(categories) {
      if (categories) {
        if (categories.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get carriers - ${categories.routine}`;
        } else {
          console.log(categories);

          this.$store.dispatch("ADD_CATEGORY", categories);
        }
      }
    },

    editCategory: function(categories) {
      if (categories) {
        if (categories.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get carriers - ${categories.routine}`;
        } else {
          this.$store.dispatch("EDIT_CATEGORY", categories);
        }
      }
    },

    deleteCategory: function(categories) {
      if (categories) {
        if (categories.name) {
          this.modal.visible = true;
          this.modal.header = "Error";
          this.modal.text = `Cannot get carriers - ${categories.routine}`;
        } else {
          this.$store.dispatch("DELETE_CATEGORY", categories);
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

