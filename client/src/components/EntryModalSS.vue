<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Add Trailer</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3">
          <!-- <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/> -->
        </div>
        <form>
          <fieldset>
            <div>
              <label for="Category">Category</label>
              <select
                class="form-control"
                v-model="trailer.category"
                id="Category dropdownMenuOffset"
                required
              >
                <option>Dunnage</option>
                <option>Empties for Shipping</option>
                <option>Patio Trailers</option>
                <option>Storage/Misc. Shipping Trailers</option>
                <option>Supermarket/Legacy/Eng</option>
              </select>
            </div>
            <div>
              <label for="Carrier">Carrier</label>
              <select
                class="form-control"
                v-model="trailer.carrier"
                id="Carrier dropdownMenuOffset"
                required
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
            <div>
              <label for="trailerNumber">Trailer Number</label>
              <input
                type="text"
                minlength="4"
                maxlength="5"
                v-model="trailer.trailerNumber"
                class="form-control"
                id="trailerNumber"
                placeholder="Enter Trailer Number"
                required
              >
            </div>
            <div>
              <label for="trailerLocation">Trailer Location</label>
              <input
                type="text"
                v-model="trailer.trailerLocation"
                class="form-control"
                id="trailerNumber"
                readonly
              >
            </div>
            <div class="form-froup mb-2">
              <label for="trailerStatus">Status</label>
              <textarea class="form-control" v-model="trailer.status" form="trailerStatus" required></textarea>
            </div>
            <button
              type="button"
              @click="addTrailer();"
              class="btn btn-primary mt-1 mr-1 mb-1"
            >Add Trailer</button>
            <button type="button" @click="$emit('close');" class="btn btn-secondary">Cancel</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    clickedDock: String
  },
  data: function() {
    return {
      trailer: {
        trailerNumber: "",
        carrier: "",
        trailerLocation: this.clickedDock,
        category: "",
        status: ""
      },
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
        "Lot B",
        "Off-Site Lot"
      ]
    };
  },
  methods: {
    async addTrailer() {
      this.create = true;

      if (
        this.trailer.trailerLocation != "Lot A" &&
        this.trailer.trailerLocation != "Lot B" &&
        this.trailer.trailerLocation != "Off-Site Lot"
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
        // this.modal.visible = true;
        // this.modal.header = "Created";
        // this.modal.text = `Trailer ${
        //   this.trailer.trailerNumber
        // } was Created at Dock: ${this.trailer.trailerLocation}`;
        this.trailer.trailerNumber = "";
        this.trailer.carrier = "";
        this.trailer.trailerLocation = "";
        this.trailer.category = "";
        this.trailer.status = "";
        this.$emit("close");
      } else {
        // this.modal.visible = true;
        // this.modal.header = "Error";
        // this.modal.text =
        //   "Trailer Already at Location. Please Select a different Location";
        this.create = true;
      }
    }
  }
};
</script>

<style scoped>
/* Modal Header */
.modal-header-custom {
  padding: 0px 16px;
  color: white;
}

/* Modal Body */
.modal-body-custom {
  padding: 0px 16px;
}

/* The Modal (background) */
.modal-custom {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content-custom {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 20px;
}

/* The Close Button */
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.closeBtn:hover,
.closeBtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
