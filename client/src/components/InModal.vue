<template>
  <div id="myModal" class="modal-custom">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>

    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Dock: {{this.clickedDock}}</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3"></div>
        <form>
          <fieldset>
            <div>
              <div>
                <label for="Carrier">Carrier</label>
                <select
                  class="form-control"
                  v-model="inTrailer.carrier"
                  id="Carrier dropdownMenuOffset"
                  @change="getTrailerNumbers"
                  required
                >
                  <option v-for="c in carriers" :key="c">{{c}}</option>
                </select>
              </div>
              <div v-if="bolTrailerNumber">
                <label for="trailerNumber">Trailer Number</label>
                <select
                  class="form-control"
                  v-model="inTrailer.trailerInfo"
                  id="trailerNumber dropdownMenuOffset"
                >
                  <option
                    v-for="tn in trailerNumbers"
                    :value="{trailerLocation: tn.trailerlocation, trailerNumber: tn.trailernumber}"
                    :key="tn._id"
                  >{{tn.trailernumber}}</option>
                </select>
              </div>
              <div v-if="bolSpecial">
                <label for="Special">Special</label>
                <select
                  class="form-control"
                  v-model="inTrailer.special"
                  id="Special dropdownMenuOffset"
                >
                  <option>E-Track</option>
                  <option>Reinforced</option>
                  <option>Not Reinforced</option>
                  <option>TPOD</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              @click="submitRequest();"
              class="btn btn-primary mt-1 mr-1 mb-1"
            >Submit</button>
            <button type="button" @click="$emit('close');" class="btn btn-secondary mr-2">Cancel</button>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="urgent"
                class="custom-control-input"
                id="urgent"
                checked
              >
              <label class="custom-control-label" for="urgent">Urgent</label>
            </div>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="bolTrailerNumber"
                class="custom-control-input"
                id="trailerNumberCheck"
                checked
              >
              <label class="custom-control-label" for="trailerNumberCheck">Trailer Number</label>
            </div>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="bolSpecial"
                class="custom-control-input"
                id="special"
                checked
              >
              <label class="custom-control-label" for="special">Special</label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "InRequestModal",
  props: {
    clickedDock: String
  },
  components: {
    AlertModal
  },
  data: function() {
    return {
      inRequest: true,
      urgent: false,
      bolSpecial: false,
      bolTrailerNumber: false,
      inTrailer: {
        carrier: "",
        special: "",
        trailerInfo: {}
      },
      trailerNumbers: [],
      modal: {
        visible: false,
        text: "",
        header: ""
      }
    };
  },
  computed: {
    dockDoors() {
      return this.$store.state.dockDoors;
    },
    carriers() {
      return this.$store.state.carriers.sort();
    }
  },
  mounted() {},
  methods: {
    async submitRequest() {
      const data = {
        carrier: this.carrier,
        urgent: this.urgent,
        dock: this.clickedDock,
        special: this.special,
        inTrailer: this.inTrailer,
        inRequest: this.inRequest
      };
      this.submit = true;
      const requests = this.$store.state.requests;
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].dock === this.clickedDock) {
          this.submit = false;
        }
      }

      if (this.submit) {
        if (!data.inTrailer.carrier) {
          this.modal.visible = true;
          this.modal.header = "Alert";
          this.modal.text = "A Carrier must be selected";
        } else {
          let res = await this.$socket.emit("request", data);
          this.$emit("close", this.trailer);
        }
      } else {
        this.modal.visible = true;
        this.modal.header = "Alert";
        this.modal.text = "Request has already been submitted for this dock";
      }
    },

    async getTrailerNumbers() {
      const carrier = this.inTrailer.carrier;
      fetch("https://trailermanagementbe.azurewebsites.net/trailerNumbers", {
        method: "POST",
        body: JSON.stringify({
          carrier: carrier
        }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(trailerNumbers => {
          this.trailerNumbers = [];
          this.trailerNumbers = trailerNumbers;
        });
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1199px) {
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

  .btn {
    display: inline-block;
    width: calc(50% - 10px);
  }
}

@media screen and (min-width: 1200px) {
  .inline {
    display: inline-block;
    margin-right: 10px;
    width: calc(50% - 10px);
  }
  /* The Modal (background) */
  .modal-custom {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 50px; /* Location of the box */
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
    width: 50%;
    border-radius: 20px;
  }
}

.right {
  float: right;
}

.headerInline {
  display: inline-block;
  margin-right: 10px;
}

.checkInline {
  display: inline-block;
  margin-right: 10px;
  /* width: calc(30% - 5px); */
}

div.inline {
  display: inline-block;
  margin-right: 10px;
  width: calc(45% - 5px);
}

h4.inline {
  display: inline-block;
  width: calc(90% - 15px);
}

/* Modal Header */
.modal-header-custom {
  padding: 0px 16px;
  color: white;
}

/* Modal Body */
.modal-body-custom {
  padding: 0px 16px;
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
