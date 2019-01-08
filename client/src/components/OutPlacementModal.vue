<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Out Placement</h2>
      </div>
      <div class="modal-body-custom">
        <button class="btn btn-primary mr-2" @click="lotA();">Lot A</button>
        <button class="btn btn-primary mr-2" @click="lotB();">Lot B</button>
        <button class="btn btn-primary" @click="offSiteLot();">Off-Site Lot</button>
      </div>
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
    return {};
  },
  methods: {
    async lotA() {
      this.request.outPlacement = "Lot A";
      let res = await this.$socket.emit("completed", this.request);
      this.$emit("close");
    },
    async lotB() {
      this.request.outPlacement = "Lot B";
      let res = await this.$socket.emit("completed", this.request);
      this.$emit("close");
    },
    async offSiteLot() {
      this.request.outPlacement = "Off-Site Lot";
      let res = await this.$socket.emit("completed", this.request);
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
/* .right {
  float: right;
} */

.inline {
  display: inline-block;
  margin-right: 10px;
  width: calc(50% - 10px);
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
  width: 30%;
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
