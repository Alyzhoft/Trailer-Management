<template>
  <div id="myModal" class="modal-custom">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>

    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('cancle');">&times;</span>
        <h2>Edit Trailer</h2>
      </div>
      <div class="modal-body-custom">
        <div class="trailerManagement container mt-3">
          <!--
            <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>
          -->
        </div>
        <form>
          <fieldset>
            <div class="inline">
              <label for="Category">Category</label>
              <select
                class="form-control"
                v-model="trailer.category"
                @change="emptyCheck"
                id="Category dropdownMenuOffset"
              >
                <option v-for="c in categories" :key="c">{{ c }}</option>
              </select>
            </div>
            <div class="inline">
              <label for="Carrier">Carrier</label>
              <select
                class="form-control"
                v-model="trailer.carrier"
                id="Carrier dropdownMenuOffset"
              >
                <option v-for="c in carriers" :key="c">{{c}}</option>
              </select>
            </div>
            <div class="inline">
              <label for="trailernumber">Trailer Number</label>
              <input
                type="text"
                minlength="3"
                maxlength="7"
                v-model="trailer.trailerNumber"
                class="form-control"
                id="trailernumber"
                placeholder="Enter Trailer Number"
              >
            </div>
            <div
              class="form-group mb-2"
              v-if="
                trailer.category == 'Patio Trailers' ||
                  trailer.category == 'Storage/Misc. Shipping Trailers' || trailer.category == 'In Process'
              "
            >
              <label for="shipDate">Ship Date</label>
              <div class="input-group mb-3">
                <input type="date" v-model="shipDate" class="form-control">
                <div class="input-group-append">
                  <button @click="addDate();" class="btn btn-outline-primary" type="button">+</button>
                </div>
                <div
                  class="input-group"
                  v-if="
                    trailer.shipDates != null && trailer.shipDates.length > 0
                  "
                >
                  <span
                    v-for="sd in trailer.shipDates"
                    :key="sd"
                    class="mt-1 mr-1 badge badge-pill badge-primary"
                  >
                    {{ sd }}
                    <span v-on:click.stop="removeDate(sd);" class="addBtn">x</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group mb-2">
              <label for="trailerStatus">Comments</label>
              <textarea class="form-control" v-model="trailer.status" form="trailerStatus"></textarea>
            </div>
            <button
              type="button"
              @click="updateTrailer();"
              class="btn btn-primary mt-1 mr-1 mb-1"
            >Edit Trailer</button>
            <button type="button" @click="$emit('cancle');" class="btn btn-secondary">Cancel</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "EditModal",
  props: ["clickedTrailer"],
  data: function() {
    return {
      shipDate: "",
      prevCategory: this.clickedTrailer.category,
      trailer: {
        trailerNumber: this.clickedTrailer.trailerNumber,
        carrier: this.clickedTrailer.carrier,
        trailerLocation: this.clickedTrailer.trailerLocation,
        category: this.clickedTrailer.category,
        shipDates: [],
        status: this.clickedTrailer.status,
        _id: this.clickedTrailer._id
      },
      modal: {
        visible: false,
        text: "",
        header: ""
      }
    };
  },
  components: {
    AlertModal
  },
  computed: {
    carriers() {
      return this.$store.state.carriers.sort();
    },
    categories() {
      return this.$store.state.categories.sort();
    }
  },
  mounted() {
    let shipDates = "";
    if (this.clickedTrailer.shipDates != null) {
      if (this.clickedTrailer.shipDates.length > 1) {
        for (let i = 0; i < this.clickedTrailer.shipDates.length; i++) {
          this.trailer.shipDates.push(this.clickedTrailer.shipDates[i]);
        }
      } else {
        this.trailer.shipDates.push(this.clickedTrailer.shipDates[0]);
      }
    }
  },
  methods: {
    async updateTrailer() {
      if (
        this.trailer.category == "Empties for Shipping" &&
        this.prevCategory != "Empties for Shipping"
      ) {
        this.trailer.status = "";
        this.trailer.shipDates = [];
      }
      console.log(this.trailer);

      let res = await this.$socket.emit("update", this.trailer);
      this.$emit("close", this.trailer);
    },
    addDate() {
      if (this.shipDate != "") {
        this.trailer.shipDates.push(this.shipDate);
        this.shipDate = "";
      }
    },
    removeDate(sd) {
      const index = this.trailer.shipDates.indexOf(sd);
      if (index > -1) {
        this.trailer.shipDates.splice(index, 1);
      }
    },
    emptyCheck() {
      if (
        this.trailer.category == "Empties for Shipping" &&
        this.prevCategory != "Empties for Shipping"
      ) {
        this.modal.visible = true;
        this.modal.header = "Alert";
        this.modal.text =
          'Changing the category to "Empties for Shipping" will remove shipdates and/or comments for this trailer';
      }
    }
  }
};
</script>

<style scoped>
/* .right {
  float: right;
} */

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
