<template>
  <div class="trailerentry container mt-3">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>
    <form @submit.prevent="addTrailer">
      <fieldset>
        <div class="form-group">
          <label for="Category">Category</label>
          <select class="form-control" v-model="trailer.category" id="Category dropdownMenuOffset">
            <option>Dunnage</option>
            <option>Empties for Shipping</option>
            <option>Patio Trailers</option>
            <option>Storage/Misc. Shipping Trailers</option>
            <option>Supermarket/Legacy/Eng</option>
          </select>
        </div>
        <div class="form-group">
          <label for="Carrier">Carrier</label>
          <select class="form-control" v-model="trailer.carrier" id="Carrier dropdownMenuOffset">
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
          <label for="trailerNumber">Trailer Number</label>
          <input
            type="text"
            minlength="4"
            maxlength="6"
            v-model="trailer.trailerNumber"
            class="form-control"
            id="trailerNumber"
            placeholder="Enter Trailer Number"
          >
        </div>
        <div class="form-group">
          <label for="trailerLocation">Trailer Location</label>
          <select class="form-control" v-model="trailer.trailerLocation" id="trailerLocation">
            <option v-for="dockNumber in docks" :key="dockNumber">
              {{
              dockNumber
              }}
            </option>
          </select>
        </div>
        <div class="form-froup mb-2">
          <label for="trailerStatus">Status</label>
          <textarea class="form-control" v-model="trailer.status" form="trailerStatus"></textarea>
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Create Trailer</button>
    </form>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "trailerentry",
  components: {
    AlertModal
  },
  data: () => ({
    trailer: {
      trailerNumber: "",
      carrier: "",
      category: "",
      trailerLocation: "",
      status: ""
    },
    modal: {
      visible: false,
      text: "",
      header: ""
    },
    create: true,
    docks: [
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
      "Lot A",
      "Lot B"
    ]
  }),
  methods: {
    async addTrailer() {
      this.create = true;

      if (
        this.trailer.trailerLocation != "Lot A" &&
        this.trailer.trailerLocation != "Lot B"
      ) {
        const trailers = this.$store.state.trailers;
        for (let i = 0; i < trailers.length; i++) {
          if (trailers[i].trailerLocation === this.trailer.trailerLocation) {
            this.create = false;
          }
        }
      }

      if (this.create) {
        let res = await this.$socket.emit("create", this.trailer);
        this.modal.visible = true;
        this.modal.header = "Created";
        this.modal.text = `Trailer ${
          this.trailer.trailerNumber
        } was Created at Dock: ${this.trailer.trailerLocation}`;
        this.trailer.trailerNumber = "";
        this.trailer.carrier = "";
        this.trailer.trailerLocation = "";
        this.trailer.category = "";
        this.trailer.status = "";
      } else {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text =
          "Trailer Already at Location. Please Select a different Location";
        this.create = true;
      }
    }
  }
};
</script>
