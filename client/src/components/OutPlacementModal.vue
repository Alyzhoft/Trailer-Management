<template>
  <div id="myModal" class="modal-custom">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>

    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
        <h2>Out Placement</h2>
      </div>
      <div class="modal-body-custom">
        <div>
          <select class="form-control" v-model="outPlacement" id="Carrier dropdownMenuOffset">
            <option>Off-Site Lot</option>
            <option>New Lot</option>
            <option v-for="pls in primaryLotSpots" :key="pls">PL-{{pls}}</option>
          </select>
        </div>

        <button class="btn btn-primary mt-2" @click="submit();">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "modal",
  props: {
    request: Object
  },
  components: {
    AlertModal
  },
  data: function() {
    return {
      modal: {
        visible: false,
        text: "",
        header: ""
      },
      outPlacement: ""
    };
  },
  computed: {
    primaryLotSpots() {
      return this.$store.state.primaryLotSpots;
    }
  },
  methods: {
    async submit() {
      this.request.outPlacement = this.outPlacement;
      let create = true;
      const trailers = this.$store.state.trailers;
      for (let i = 0; i < trailers.length; i++) {
        if (
          trailers[i].trailerlocation.toUpperCase() ==
            this.request.outPlacement.toUpperCase() &&
          (this.request.outPlacement != "Off-Site Lot" &&
            this.request.outPlacement != "New Lot")
        ) {
          create = false;
        }
      }
      if (create) {
        let res = await this.$socket.emit("completed", this.request);
        this.$emit("close");
      } else {
        this.modal.visible = true;
        this.modal.header = "Alert";
        this.modal.text = `A Trailer is already in location ${
          this.request.outPlacement
        }`;
      }
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
    width: calc(50% - 5px);
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
    width: 30%;
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
