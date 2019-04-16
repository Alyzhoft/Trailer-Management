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
    <div v-else-if="out">
      <OutInModal
        :clickedTrailer="this.trailer"
        @close="handleInOutClose"
        @cancle="handleInOutClose"
      ></OutInModal>
    </div>
    <div v-else-if="inTrailer">
      <InModal :clickedTrailer="this.trailer" @close="handleInClose" @cancle="handleInClose"></InModal>
    </div>
    <DeleteModal
      v-else-if="deleteTrailer"
      :deleteRequest="'Trailer'"
      :request="this.trailer"
      @close="handleClose"
    ></DeleteModal>
    <div v-else>
      <div id="myModal" class="modal-custom">
        <!-- Modal content -->
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <span class="closeBtn" @click="$emit('close');">&times;</span>
            <h2>{{ this.trailer.trailerNumber }}</h2>
          </div>
          <div class="modal-body-custom">
            <h5>
              Carrier:
              <span>{{ this.trailer.carrier }}</span>
            </h5>
            <h5>
              Category:
              <span>{{ this.trailer.category }}</span>
            </h5>
            <h5
              v-if="
                trailer.shipDates != null &&
                  trailer.shipDates.length > 0 &&
                  trailer.shipDates != 'undefined'
              "
            >
              Ship Dates:
              <span
                v-for="sd in this.trailer.shipDates"
                :key="sd"
                class="inline"
              >{{ sd }}</span>
            </h5>
            <p>{{ this.trailer.status }}</p>
            <button @click="handleEditClicked();" class="btn btn-primary mr-1 mb-1 inline">Edit</button>
            <button @click="handleMoveClicked();" class="btn btn-primary mr-1 mb-1 inline">Move</button>
            <button
              @click="handleDepartedClicked(trailer);"
              class="btn btn-primary mr-1 mb-1 inline"
            >Departed</button>
            <button
              v-if="
                !trailer.trailerLocation.startsWith('PL-') &&
                  trailer.trailerLocation != 'Off-Site Lot'
              "
              class="btn btn-primary mr-1 mb-1 inline"
              @click="handleOutClicked();"
            >Out</button>
            <button @click="handleDeleteTrailer();" class="btn btn-danger mb-1">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModal from "@/components/EditModal.vue";
import MoveModal from "@/components/MoveModal.vue";
import OutInModal from "@/components/OutInModal.vue";
import InModal from "@/components/InModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "infoModal",
  props: {
    clickedTrailer: Object
  },
  components: {
    EditModal,
    MoveModal,
    OutInModal,
    InModal,
    DeleteModal
  },
  data: function() {
    return {
      edit: false,
      move: false,
      out: false,
      inTrailer: false,
      deleteTrailer: false,
      trailer: {
        trailerNumber: this.clickedTrailer.trailerNumber,
        carrier: this.clickedTrailer.carrier,
        trailerLocation: this.clickedTrailer.trailerLocation,
        category: this.clickedTrailer.category,
        status: this.clickedTrailer.status,
        shipDates: this.clickedTrailer.shipDates,
        _id: this.clickedTrailer._id
      }
    };
  },
  methods: {
    async handleDeleteTrailer() {
      this.deleteTrailer = true;
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
    async handleOutClicked() {
      this.out = true;
    },
    async handleInClicked() {
      this.inTrailer = true;
    },
    async handleCancle() {
      this.edit = false;
    },
    async handleEditModalClose(value) {
      this.edit = false;
      this.trailer.trailerNumber = value.trailernumber;
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerlocation;
      this.$emit("close");
    },
    async handleInOutClose() {
      this.out = false;
      this.$emit("close");
    },
    async handleInClose() {
      this.inTrailer = false;
      this.$emit("close");
    },
    async handleMoveModalClose(value) {
      this.move = false;
      this.trailer.trailerlocation = value;
      this.$emit("close");
    },

    async handleClose() {
      this.deleteTrailer = false;
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 925px) {
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
  .inline {
    display: inline-block;
    margin-right: 10px;
    width: calc(50% - 5px);
  }
  .btn-danger {
    width: calc(100% - 10px);
  }
}

@media only screen and (min-width: 926px) and (max-width: 1199px) {
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
    width: 50%;
    border-radius: 20px;
  }
}

@media screen and (min-width: 1200px) {
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
}

/* Modal Header */
.modal-header-custom {
  padding: 2px 16px;
  color: white;
}

/* Modal Body */
.modal-body-custom {
  padding: 2px 16px;
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
