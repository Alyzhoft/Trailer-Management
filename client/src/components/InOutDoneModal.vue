<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
      </div>
      <div class="modal-body-custom">
        <div>
          <h3 class="headerInline">In/Out: Dock {{ this.request.dock }}</h3>
        </div>
        <div>
          <h4 class="headerInline">Out Placement:</h4>
          <div class="inline">
            <select
              class="form-control"
              v-model="data.outPlacement"
              id="Carrier dropdownMenuOffset"
            >
              <option>Primary Lot</option>
              <option>Off-Site Lot</option>
            </select>
          </div>
        </div>
        <div class="mt-1">
          <h4 class="headerInline">In: {{ this.request.incarrier }} -</h4>
          <div class="inline">
            <select
              class="form-control"
              v-model="data.inTrailerNumber"
              id="Carrier dropdownMenuOffset"
            >
              <option></option>
              <option v-for="r in results" :key="r._id">{{ r.trailernumber }}</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="completeRequest();"
        class="btn btn-primary mt-1 mr-1 mb-1"
      >Complete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    request: Object
  },
  data: function() {
    return {
      results: [],
      data: {
        _id: this.request._id,
        trailer_id: this.request.trailer_id,
        outPlacement: "",
        outcarrier: this.request.outcarrier,
        inTrailerNumber: "",
        dock: this.request.dock,
        inCarrier: this.request.incarrier
      }
    };
  },
  mounted() {
    console.log(this.request);
    fetch("http://localhost:3000/trailerNumbers", {
      method: "POST",
      body: JSON.stringify({
        carrier: this.request.incarrier
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(results => {
        console.log(results);
        this.results = results;
      });
  },
  methods: {
    async completeRequest() {
      let res = await this.$socket.emit("completed", this.data);
      this.$emit("close");
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
  width: calc(45% - 5px);
}

h4.inline {
  display: inline-block;
  width: calc(50% - 15px);
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
  width: 40%;
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
