<template>
  <div>
    <div v-if="edit">
      <EditModalSS
        :clickedTrailer="this.trailer"
        @close="handleEditModalClose"
        @cancle="handleEditCancle"
      />
    </div>
    <div v-else-if="move">
      <MoveModalSS
        :clickedTrailer="this.trailer"
        @close="handleMoveModalClose"
        @cancle="handleMoveCancle"
      />
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
            <h5>
              Carrier:
              <span>{{this.trailer.carrier}}</span>
            </h5>
            <h5>
              Category:
              <span>{{this.trailer.category}}</span>
            </h5>
            <h5
              v-if="trailer.shipDates != null && trailer.shipDates.length > 0 && trailer.shipDates != 'undefined'"
            >
              Ship Dates:
              <span
                v-for="sd in this.trailer.shipDates"
                :key="sd"
                class="inline"
              >{{ sd }}</span>
            </h5>
            <p>{{this.trailer.status}}</p>
            <button @click="handleEditClicked()" class="btn btn-primary mr-1 mb-1">Edit</button>
            <button @click="handleMoveClicked()" class="btn btn-primary mr-1 mb-1">Move</button>
            <button @click="deleteTrailer()" class="btn btn-danger mb-1">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModalSS from "@/components/EditModalSS.vue";
import MoveModalSS from "@/components/MoveModalSS.vue";

export default {
  name: "infoModal",
  props: ["clickedTrailer", "windowWidth"],
  components: {
    EditModalSS,
    MoveModalSS
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
        shipDates: this.clickedTrailer.shipDates,
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

    async handleMoveClicked() {
      this.move = true;
    },
    async handleEditClicked() {
      this.edit = true;
    },
    async handleEditCancle() {
      this.edit = false;
    },
    async handleMoveCancle() {
      this.move = false;
    },
    async handleEditModalClose(value) {
      this.edit = false;
      console.log(value);
      this.trailer.trailerNumber = value.trailerNumber;
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerLocation;
      this.$emit("close");
    },
    async handleMoveModalClose(value) {
      this.move = false;
      this.trailer.trailerLocation = value;
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
  padding-top: 20px; /* Location of the box */
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

.inline {
  display: inline-block;
  margin-right: 10px;
  /* width: calc(50% - 10px); */
}

h5 {
  font-weight: bold;
}

h5 span {
  font-weight: normal;
}

.closeBtn:hover,
.closeBtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
