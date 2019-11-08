<template>
  <div id="myModal" class="modal-custom">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal" />

    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('cancle');">&times;</span>
        <h2 v-if="inRequest">In/Out Request</h2>
        <h2 v-else>Out Request</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3"></div>
        <form>
          <fieldset>
            <div>
              <h3 class="headerInline">Out:</h3>
              <h4 class="inline">Dock {{ dock }}</h4>
            </div>
            <div v-if="inRequest">
              <h4 class="headerInline">In:</h4>
              <div class="inline">
                <label for="Carrier">Carrier</label>
                <select
                  class="form-control"
                  id="Carrier dropdownMenuOffset"
                  v-model="inTrailer.carrier"
                  @change="getTrailerNumbers"
                >
                  <option v-for="c in carriers" :key="c">{{c}}</option>
                </select>
              </div>
              <div class="inline">
                <label for="Carrier">Trailer Number</label>
                <select
                  class="form-control"
                  v-model="inTrailer.trailerInfo"
                  id="trailerNumber dropdownMenuOffset"
                  required
                >
                  <option
                    v-for="tn in trailerNumbers"
                    :value="{trailerLocation: tn.trailerlocation, trailerNumber: tn.trailernumber}"
                    :key="tn._id"
                  >{{tn.trailernumber}}</option>
                </select>
              </div>
              <div class="inline">
                <label for="Carrier">Special</label>
                <select
                  class="form-control"
                  v-model="inTrailer.special"
                  id="Carrier dropdownMenuOffset"
                  required
                >
                  <option>E-Track</option>
                  <option>Reinforced</option>
                  <option>Not Reinforced</option>
                  <option>TPOD</option>
                </select>
              </div>
            </div>

            <div v-if="categoryChange">
              <h4 class="headerInline">Category:</h4>
              <div class="inline">
                <select
                  class="form-control mt-1 mb-2"
                  v-model="outTrailer.category"
                  id="Category dropdownMenuOffset"
                  required
                >
                  <option value selected disabled>Category</option>
                  <option v-for="c in categories" :key="c">{{c}}</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              @click="submitRequest();"
              class="btn btn-primary mt-1 mr-1 mb-1"
            >Submit</button>
            <button type="button" @click="$emit('cancle');" class="btn btn-secondary mr-2">Cancel</button>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="inRequest"
                class="custom-control-input"
                id="inRequest"
                checked
                @change="handleCheckBox"
              />
              <label class="custom-control-label" for="inRequest">In Request</label>
            </div>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="urgent"
                class="custom-control-input"
                id="urgent"
                checked
              />
              <label class="custom-control-label" for="urgent">Urgent</label>
            </div>
            <div class="checkInline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="categoryChange"
                class="custom-control-input"
                id="categoryChange"
                checked
              />
              <label class="custom-control-label" for="categoryChange">Category Change</label>
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
  name: "OutInModal",
  props: ["clickedTrailer"],
  components: {
    AlertModal
  },
  data: function() {
    return {
      shipDate: "",
      inRequest: false,
      outRequest: true,
      categoryChange: false,
      urgent: false,
      trailerNumbers: [],
      dock: this.clickedTrailer.trailerLocation,
      outTrailer: {
        trailerNumber: this.clickedTrailer.trailerNumber,
        carrier: this.clickedTrailer.carrier,
        category: this.clickedTrailer.category,
        completed: false,
        shipDates: [],
        status: this.clickedTrailer.status,
        _id: this.clickedTrailer._id
      },
      inTrailer: {
        carrier: "",
        special: "",
        trailerInfo: {}
      },
      modal: {
        visible: false,
        text: "",
        header: ""
      }
    };
  },
  computed: {
    carriers() {
      return this.$store.state.carriers
        .map(c => {
          return c.carrier;
        })
        .sort();
    },
    categories() {
      return this.$store.state.categories
        .map(c => {
          return c.category;
        })
        .sort();
    }
  },
  methods: {
    handleCheckBox() {
      if (this.inRequest == false) {
        this.inTrailer.carrier = "";
        this.inTrailer.trailerInfo = {};
      }
    },
    async submitRequest() {
      const data = {
        dock: this.dock,
        outRequest: this.outRequest,
        outTrailer: this.outTrailer,
        inTrailer: this.inTrailer,
        inRequest: this.inRequest,
        categoryChange: this.categoryChange,
        urgent: this.urgent
      };

      this.submit = true;
      const requests = this.$store.state.requests;
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].dock === this.clickedTrailer.trailerLocation) {
          this.submit = false;
        }
      }

      if (this.submit) {
        let res = await this.$socket.emit("request", data);
        this.$emit("close", this.trailer);
      } else {
        this.modal.visible = true;
        this.modal.header = "Alert";
        this.modal.text = "Request has already been submitted for this dock";
      }
    },

    async getTrailerNumbers() {
      const carrier = this.inTrailer.carrier;
      fetch("http://localhost:3000/trailerNumbers", {
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

  .right {
    float: right;
  }

  .headerInline {
    display: inline-block;
    margin-right: 10px;
  }

  div.inline {
    display: inline-block;
    margin-right: 10px;
    width: calc(30% - 5px);
  }

  .checkInline {
    display: inline-block;
    margin-right: 10px;
    /* width: calc(30% - 5px); */
  }
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
