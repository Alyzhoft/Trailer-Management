<template>
  <div>
    <div v-if="edit">
      <EditModal
        :clickedTrailer="this.trailer"
        @close="handleEditModalClose"
        @cancle="handleCancle"
      />
    </div>
    <div v-else-if="move">
      <MoveModal :clickedTrailer="this.trailer" @close="handleMoveModalClose"/>
    </div>
    <div v-else>
      <div id="myModal" class="modal-custom">
        <!-- Modal content -->
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <span class="closeBtn" @click="$emit('close');">&times;</span>
            <h2>{{this.trailer.trailerNumber}}</h2>
          </div>
          <div class="modal-body-custom">
            <h5>{{this.trailer.carrier}}</h5>
            <h5>{{this.trailer.category}}</h5>
            <p>{{this.trailer.status}}</p>
            <button @click="handleEditClicked()" class="btn btn-primary mr-1 mb-1">Edit</button>
            <button @click="handleMoveClicked()" class="btn btn-primary mr-1 mb-1">Move</button>
            <button
              @click="handleDepartedClicked(trailer)"
              class="btn btn-primary mr-1 mb-1"
            >Departed</button>
            <button @click="deleteTrailer()" class="btn btn-danger mb-1">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModal from "@/components/EditModal.vue";
import MoveModal from "@/components/MoveModal.vue";

export default {
  name: "infoModal",
  props: {
    clickedTrailer: Object
  },
  components: {
    EditModal,
    MoveModal
  },
  data: function() {
    return {
      edit: false,
      move: false,
      trailer: {
        trailerNumber: this.clickedTrailer.trailerNumber,
        carrier: this.clickedTrailer.carrier,
        trailerLocation: this.clickedTrailer.trailerLocation,
        category: this.clickedTrailer.category,
        status: this.clickedTrailer.status,
        _id: this.clickedTrailer._id
      }
    };
  },
  methods: {
    async deleteTrailer() {
      let res = await this.$socket.emit("delete", this.clickedTrailer);

      this.$emit("close");
    },
    async handleDepartedClicked(trailer) {
      let res = await this.$socket.emit("departed", trailer);
      this.$emit("close");
    },

    async handleMoveClicked() {
      this.move = true;
    },
    async handleEditClicked() {
      this.edit = true;
    },
    async handleCancle() {
      console.log("Cancle");
      this.edit = false;
    },
    async handleEditModalClose(value) {
      this.edit = false;
      console.log(value);
      this.trailer.trailerNumber = value.trailernumber;
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerlocation;
      this.$emit("close");
    },
    async handleMoveModalClose(value) {
      this.move = false;
      this.trailer.trailerlocation = value;
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
/* Modal Header */
.modal-header-custom {
  padding: 2px 16px;
  color: white;
}

/* Modal Body */
.modal-body-custom {
  padding: 2px 16px;
}

/* The Modal (background) */
.modal-custom {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 5; /* Sit on top */
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
