<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Delete</h2>
      </div>
      <div class="modal-body-custom">
        <p>Are you sure you want to delete?</p>
        <button class="btn btn-danger mr-2 inline" @click="remove();">Yes</button>
        <button class="btn btn-primary inline" @click="cancel();">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    deleteRequest: String,
    request: Object
  },
  data: function() {
    return {};
  },
  methods: {
    async remove() {
      let res;
      switch (this.deleteRequest) {
        case "Request":
          res = await this.$socket.emit("deleteRequest", this.request);
          break;

        case "Trailer":
          res = await this.$socket.emit("deleteTrailer", this.request);
          break;
      }
      this.$emit("close");
    },
    async cancel() {
      this.$emit("close");
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
