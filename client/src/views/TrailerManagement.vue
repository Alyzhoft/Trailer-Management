<template>
  <div class="trailerManagement container mt-3">
    <AlertModal v-if="modal.visible" @close="modal.visible = false" :modalInfo="modal"/>
    <div v-if="!found">
      <input
        v-model="searchTerm"
        class="form-control mr-sm-2 mb-1"
        type="text"
        placeholder="Search"
      >
      <button class="btn btn-secondary my-sm-0" @click="search">Search</button>
    </div>
    <form v-if="found">
      <fieldset>
        <div class="form-group">
          <label for="trailerNumber">Trailer Number</label>
          <input
            type="text"
            minlength="4"
            maxlength="5"
            v-model="trailer.trailerNumber"
            class="form-control"
            id="trailerNumber"
            placeholder="Enter Trailer Number"
          >
        </div>
        <div class="form-group">
          <label for="trailerName">Trailer Name</label>
          <select
            class="form-control"
            v-model="trailer.trailerName"
            id="trailerName dropdownMenuOffset"
          >
            <option>Brockman</option>
            <option>Dart</option>
            <option>Filmore</option>
            <option>Ryder</option>
            <option>Taylor</option>
            <option>Transport</option>
            <option>Wale</option>
            <option>Wali</option>
          </select>
        </div>
        <div class="form-group">
          <label for="trailerLocation">Trailer Location</label>
          <select
            class="form-control"
            v-model="trailer.trailerLocation"
            id="trailerLocation dropdownMenuOffset"
          >
            <option v-for="dockNumber in 36" :key="dockNumber">{{ dockNumber }}</option>
          </select>
        </div>
        <button
          type="button"
          @click="updateTrailer()"
          class="btn btn-primary mt-1 mr-1 mb-1"
        >Edit Trailer</button>
        <button type="button" @click="moveTrailer()" class="btn btn-primary mr-1">Move Trailer</button>
        <button type="button" @click="deleteTrailer()" class="btn btn-primary mr-1">Delete Trailer</button>
        <button type="button" v-if="found" @click="found = !found" class="btn btn-primary">Search</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "trailerManagement",
  components: {
    AlertModal
  },
  data: () => ({
    trailer: {
      trailerNumber: "",
      trailerName: "",
      trailerLocation: "",
      _id: ""
    },
    modal: {
      visible: false,
      text: "",
      header: ""
    },
    trailerCurrentLocation: "",
    found: false,
    update: true,
    move: false,
    searchTerm: ""
  }),
  methods: {
    async updateTrailer() {
      let res = await this.$socket.emit("update", this.trailer);
      this.modal.visible = true;
      this.modal.header = "Updated";
      this.modal.text = "Trailer Updated";
    },

    async moveTrailer() {
      this.update = true;
      const trailers = this.$store.state.trailers;

      for (let i = 0; i < trailers.length; i++) {
        if (trailers[i].trailerLocation === this.trailer.trailerLocation) {
          this.update = false;
        }
      }

      if (this.update) {
        let res = await this.$socket.emit("move", this.trailer);
        this.modal.visible = true;
        this.modal.header = "Moved";
        this.modal.text = "Trailer Moved";
      } else {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text =
          "Trailer Already at Location. Please Select a different Location";
      }
    },

    async deleteTrailer() {
      let res = await this.$socket.emit("delete", this.trailer);
      this.modal.visible = true;
      this.modal.header = "Deleted";
      this.modal.text = "Trailer Deleted";
      this.trailer.trailerNumber = "";
      this.trailer.trailerName = "";
      this.trailer.trailerLocation = "";
      this.trailer._id = "";
      this.found = false;
    },

    async search() {
      const trailerNumber = this.searchTerm.match(/^[/\d]{4,5}?$/);
      const trailerLocation = this.searchTerm.match(/^[/\d]{1,2}?$/);
      let searchTerm = "";
      let searchType = "";
      let found = false;

      if (trailerNumber != null) {
        searchType = "trailerNumber";
        searchTerm = trailerNumber[0];
      } else if (trailerLocation != null) {
        searchType = "trailerLocation";
        searchTerm = trailerLocation[0];
      }

      const trailers = this.$store.state.trailers;

      switch (searchType) {
        case "trailerNumber":
          for (let i = 0; i < trailers.length; i++) {
            if (trailers[i].trailerNumber === searchTerm) {
              this.trailer.trailerNumber = trailers[i].trailerNumber;
              this.trailer.trailerName = trailers[i].trailerName;
              this.trailer.trailerLocation = trailers[i].trailerLocation;
              this.trailerCurrentLocation = trailers[i].trailerLocation;
              this.trailer._id = trailers[i]._id;
              this.found = true;
              this.searchTerm = "";
              found = true;
            }
          }
          break;

        case "trailerLocation":
          for (let i = 0; i < trailers.length; i++) {
            if (trailers[i].trailerLocation === searchTerm) {
              this.trailer.trailerNumber = trailers[i].trailerNumber;
              this.trailer.trailerName = trailers[i].trailerName;
              this.trailer.trailerLocation = trailers[i].trailerLocation;
              this.trailerCurrentLocation = trailers[i].trailerLocation;
              this.trailer._id = trailers[i]._id;
              this.found = true;
              this.searchTerm = "";
              found = true;
            }
          }
          break;
      }
      if (!found) {
        this.modal.visible = true;
        this.modal.header = "Not Found";
        this.modal.text = "Trailer Not Found";
      }
    }
  }
};
</script>
