<template>
  <div id="myModal" class="modal-custom">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal" />

    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
      </div>
      <div class="modal-body-custom">
        <div>
          <h3 class="headerInline">In/Out: Dock {{ this.request.dock }}</h3>
        </div>
        <form v-on:submit.prevent="completeRequest">
          <div>
            <h4 class="headerInline">Out Placement:</h4>
            <div class="inline">
              <select
                class="form-control"
                v-model="data.outPlacement"
                id="outPlacement dropdownMenuOffset"
                required
              >
                <option>Off-Site Lot</option>
                <option>New Lot</option>
                <option v-for="pls in primaryLotSpots" :key="pls">PL-{{pls}}</option>
              </select>
            </div>
          </div>
          <div class="mt-1">
            <h4 v-if="!tnPopulated" class="headerInline">In: {{ this.request.incarrier }} -</h4>
            <h4
              v-else-if="tnPopulated"
              class="headerInline"
            >In: {{ this.request.incarrier }} - {{ this.request.intrailernumber }}</h4>
            <div class="inline" v-if="!tnPopulated">
              <select
                class="form-control"
                v-model="data.inTrailerNumber"
                id="inTrailerNumber dropdownMenuOffset"
                required
              >
                <option v-for="r in results" :key="r._id">{{ r.trailernumber }}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-1 mr-1 mb-1">Complete</button>
        </form>
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
      results: [],
      tnPopulated: false,
      modal: {
        visible: false,
        text: "",
        header: ""
      },
      data: {
        _id: this.request._id,
        trailer_id: this.request.trailer_id,
        outPlacement: "",
        outcarrier: this.request.outcarrier,
        inTrailerNumber: "",
        dock: this.request.dock,
        inCarrier: this.request.incarrier,
        outcategory: this.request.outcategory
      }
    };
  },
  computed: {
    primaryLotSpots() {
      return this.$store.state.primaryLotSpots;
    }
  },
  mounted() {
    if (this.request.intrailernumber) {
      this.data.inTrailerNumber = this.request.intrailernumber;
      this.tnPopulated = true;
    } else {
      fetch("http://localhost:3000/emptyTrailers", {
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
          this.results = results;
        });
    }
  },
  methods: {
    async completeRequest() {
      let create = true;
      const trailers = this.$store.state.trailers;
      for (let i = 0; i < trailers.length; i++) {
        if (
          trailers[i].trailerlocation.toUpperCase() ==
            this.data.outPlacement.toUpperCase() &&
          (this.data.outPlacement != "Off-Site Lot" &&
            this.data.outPlacement != "New Lot")
        ) {
          create = false;
        }
      }
      if (create) {
        await this.$socket.emit("completed", this.data);
        this.$emit("close");
      } else {
        this.modal.visible = true;
        this.modal.header = "Alert";
        this.modal.text = `A Trailer is already in location ${this.data.outPlacement}`;
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

  /* .btn {
    display: inline-block;
    width: calc(50% - 10px);
  } */
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
  div.inline {
    display: inline-block;
    margin-right: 10px;
    width: calc(45% - 5px);
  }
}
.right {
  float: right;
}

.headerInline {
  display: inline-block;
  margin-right: 10px;
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
