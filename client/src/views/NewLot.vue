<template>
  <div class="container-fluid">
    <div>
      <EntryModal :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();"/>
      <InfoModal :clickedTrailer="this.trailer" v-if="clicked" @close="handleModalClose();"/>
    </div>
    <span v-on:click.stop="handleEntry" class="addBtn">+</span>
    <h1>New Lot</h1>
    <div
      v-for="trailer in trailers"
      v-on:click="handleOnTrialerClick(trailer);"
      :key="trailer._id"
      id="lot"
      :class="{
        listLot: trailer.trailerlocation == lot,
        populated: trailer.trailerlocation == lot,
        inProcess: trailer.category == 'In Process',
        completed: trailer.category == 'Completed',
        receiving: trailer.category == 'Receiving',
        receivingRush: trailer.category == 'Receiving - Rush',
        patioDoors: trailer.category == 'Patio Trailers',
        shippingStorageTrailers: trailer.category == 'Storage/Misc. Shipping Trailers',
        empties: trailer.category == 'Empties for Shipping',
        receivingStorage: trailer.category == 'Receiving - Storage'
      }"
      :title="trailer.carrier"
      data-toggle="popover"
      data-trigger="hover"
      data-placement="top"
      :data-content="trailer.status"
    >
      <p>{{ trailer.trailernumber }}</p>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";
import EntryModal from "@/components/EntryModal.vue";
import InfoModal from "@/components/InfoModal.vue";

export default {
  name: "newlot",
  components: {
    AlertModal,
    InfoModal,
    EntryModal
  },
  data: () => ({
    lot: "New Lot",
    windowWidth: "",
    entry: false,
    clicked: false,
    clickedDock: "",
    trailer: {
      trailerNumber: "",
      carrier: "",
      category: "",
      trailerLocation: "",
      status: "",
      shipDates: [],
      _id: ""
    }
  }),
  computed: {
    trailers() {
      return this.$store.state.trailers.filter(
        trailer => trailer.trailerlocation == this.lot
      );
    }
  },
  updated() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover();
    });
  },
  mounted() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover();
    });
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    async handleEntryModalClose() {
      this.entry = false;
      this.clickedDock = "";
    },
    async handleOnTrialerClick(trailer) {
      this.clickedTrailer = trailer;
      this.trailer.carrier = trailer.carrier;
      this.trailer.category = trailer.category;
      this.trailer.status = trailer.status;
      this.trailer.trailerLocation = trailer.trailerlocation;
      this.trailer.trailerNumber = trailer.trailernumber;
      this.trailer.status = trailer.status;
      this.trailer.shipDates = trailer.shipdates;
      this.trailer._id = trailer._id;
      this.clicked = true;
    },
    async handleTrailerClicked(value) {
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerLocation;
      this.trailer.trailerNumber = value.trailerNumber;
      this.trailer.status = value.status;
      this.trailer._id = value._id;
      this.clicked = true;
    },
    async handleEmptyClicked(value) {
      this.clickedDock = value;
      this.entry = true;
    },
    async handleModalClose() {
      this.trailer = {};
      this.clicked = false;
    },
    async handleEntry() {
      this.clickedDock = "New Lot";
      this.entry = true;
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
h4 {
  color: black;
  background: white;
}

.listLot {
  width: 20px;
  height: 95px;
  background: #d8d8d8;
  margin: 4px;
  margin-top: 2%;
  border-radius: 4px;
  text-align: center;
  color: white;
  position: relative;
}

.populated {
  background: blue;
  color: white;
  font-weight: bold;
  text-align: center;
}

.inProcess {
  background-color: gold;
}

.inProcess p {
  color: black;
  font-weight: bold;
}

.completed {
  background-color: green;
}

.receiving {
  background-color: purple;
}

.receivingRush {
  background-color: red;
}

.receivingStorage {
  background-color: navy;
}

.patioDoors {
  background-color: rgb(255, 153, 0);
}

.shippingStorageTrailers {
  background-color: steelblue;
}

.empties {
  background-color: grey;
}

p {
  color: white;
  font-size: 10px;
  position: relative;
  right: 7px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

#lot {
  float: left;
}

.clearBoth {
  clear: both;
}

.addBtn {
  position: absolute;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  left: 85%;
}

.addBtn:hover,
.addBtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.populated:hover,
.populated:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
