<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('cancle');">&times;</span>
        <h2>In: {{ inTrailer.carrier }} - {{inTrailer.trailerNumber}}</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3"></div>
        <form>
          <fieldset>
            <div>
              <h4 class="headerInline">Dock #:</h4>
              <div class="inline">
                <select
                  class="form-control"
                  v-model="inTrailer.trailerLocation"
                  id="trailerLocation"
                >
                  <option v-for="dockNumber in dockDoors" :key="dockNumber">{{ dockNumber }}</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              @click="submitRequest();"
              class="btn btn-primary mt-1 mr-1 mb-1"
            >Submit</button>
            <button type="button" @click="$emit('cancle');" class="btn btn-secondary mr-2">Cancel</button>
            <div class="inline custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="urgent"
                class="custom-control-input"
                id="urgent"
                checked
              >
              <label class="custom-control-label" for="urgent">Urgent</label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: ["clickedTrailer"],
  data: function() {
    return {
      shipDate: "",
      inRequest: false,
      urgent: false,
      inTrailer: {
        trailerNumber: this.clickedTrailer.trailerNumber,
        carrier: this.clickedTrailer.carrier,
        trailerLocation: "",
        category: this.clickedTrailer.category,
        shipDates: [],
        status: this.clickedTrailer.status,
        _id: this.clickedTrailer._id
      }
    };
  },
  computed: {
    dockDoors() {
      return this.$store.state.dockDoors;
    }
  },
  mounted() {},
  methods: {
    handleCheckBox() {
      if (this.inRequest == false) {
        this.inTrailer.carrier = "";
        this.inTrailer.trailerNumber = "";
      }
    },
    async submitRequest() {
      const data = {
        inTrailer: this.inTrailer,
        urgent: this.urgent,
        inRequest: true
      };
      let res = await this.$socket.emit("inRequest", data);
      this.$emit("close", this.trailer);
    }
  }
};
</script>

<style scoped>
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
