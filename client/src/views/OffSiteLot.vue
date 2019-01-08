<template>
  <div class="container">
    <div v-if="windowWidth > 1230">
      <EntryModal :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();"/>
      <InfoModal :clickedTrailer="this.trailer" v-if="clicked" @close="handleModalClose();"/>
    </div>
    <div v-else>
      <EntryModalSS :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();"/>
      <InfoModalSS :clickedTrailer="this.trailer" v-if="clicked" @close="handleModalClose();"/>
    </div>
    <h1>Off-Site Lot</h1>
    <span v-on:click.stop="handleEntryOffSiteLocation" class="addBtn">+</span>
    <div
      v-for="trailer in trailers"
      v-if="trailer.trailerlocation == lot"
      v-on:click="handleOnTrialerClick(trailer);"
      :key="trailer._id"
      id="lot"
      :class="{
        listLot: trailer.trailerlocation == lot,
        populated: trailer.trailerlocation == lot
      }"
    >
      <p>{{ trailer.trailernumber }}</p>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";
import EntryModal from "@/components/EntryModal.vue";
import EntryModalSS from "@/components/EntryModalSS.vue";
import InfoModal from "@/components/InfoModal.vue";
import InfoModalSS from "@/components/InfoModalSS.vue";

export default {
  name: "offsitelot",
  components: {
    AlertModal,
    InfoModal,
    InfoModalSS,
    EntryModal,
    EntryModalSS
  },
  data: () => ({
    lot: "Off-Site Lot",
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
      _id: ""
    }
  }),
  computed: {
    trailers() {
      return this.$store.state.trailers;
    }
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
      this.trailer._id = trailer._id;
      this.clicked = true;
    },
    async handleModalClose() {
      this.clickedTrailer = {};
      this.clicked = false;
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
    async handleSSTrailerClicked(value) {
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerLocation;
      this.trailer.trailerNumber = value.trailerNumber;
      this.trailer.status = value.status;
      this.trailer._id = value._id;
      this.clickedSS = true;
    },
    async handleSSEmptyClicked(value) {
      this.clickedDock = value;
      this.entrySS = true;
    },
    async handleEmptyClicked(value) {
      this.clickedDock = value;
      this.entry = true;
    },
    async handleModalClose() {
      this.trailer = {};
      this.clicked = false;
    },
    async handleEntryOffSiteLocation() {
      this.clickedDock = "Off-Site Lot";
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
  height: 68px;
  background: #d8d8d8;
  margin: 4px;
  margin-top: 2%;
  border-radius: 4px;
  text-align: center;
  color: white;
  position: relative;
}

.populated {
  background-color: green;
  color: white;
  text-align: center;
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
