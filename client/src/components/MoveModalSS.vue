<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Move Trailer</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3">
          <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>
        </div>
        <form>
          <fieldset>
            <div>
              <label for="trailerLocation">Current Trailer Location</label>
              <input
                type="text"
                v-model="trailer.currentTrailerLocation"
                class="form-control"
                id="trailerNumber"
                readonly
              >
            </div>
            <div>
              <label for="trailerLocation">New Trailer Location</label>
              <select class="form-control" v-model="trailer.trailerLocation" id="trailerLocation">
                <option v-for="dockNumber in docks" :key="dockNumber">
                  {{
                  dockNumber
                  }}
                </option>
              </select>
            </div>
            <button
              type="button"
              @click="moveTrailer();"
              class="btn btn-primary mt-2 mr-1 mb-1"
            >Move Trailer</button>
            <button type="button" @click="$emit('cancle');" class="btn btn-secondary mt-2">Cancel</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "modal",
  props: ["clickedTrailer"],
  components: {
    AlertModal
  },
  data: function() {
    return {
      trailer: {
        currentTrailerLocation: this.clickedTrailer.trailerLocation,
        trailerLocation: "",
        _id: this.clickedTrailer._id
      },
      modal: {
        visible: false,
        text: "",
        header: ""
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
    async moveTrailer() {
      this.update = true;
      const trailers = this.$store.state.trailers;

      if (
        this.trailer.trailerLocation != "Lot A" &&
        this.trailer.trailerLocation != "Lot B" &&
        this.trailer.trailerLocation != "Off-Site Lot"
      ) {
        for (let i = 0; i < trailers.length; i++) {
          if (trailers[i].trailerlocation === this.trailer.trailerLocation) {
            this.update = false;
          }
        }
      }

      if (this.update) {
        let res = await this.$socket.emit("move", this.trailer);

        this.trailer.currentTrailerLocation = this.trailer.trailerLocation;
        this.$emit("close", this.trailer.trailerLocation);
        // this.trailer.trailerlocation = "";
        // this.modal.header = "Moved";
        // this.modal.text = "Trailer Moved";
      } else {
        this.modal.visible = true;
        this.modal.header = "Error";
        this.modal.text =
          "Trailer Already at Location. Please Select a different Location";
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
