<template>
  <div class="home">
    <TempModal
      :clickedDock="this.clickedDock"
      v-if="empty"
      @close="handleTempModalClose();"
      @addTrailer="handleAddTrailer"
      @inTrailer="handleInTrailer"
    />
    <EntryModal :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();" />
    <InModal v-if="inTrailer" :clickedDock="this.clickedDock" @close="handleInClose"></InModal>
    <InfoModal
      :windowWidth="this.windowWidth"
      :clickedTrailer="this.trailer"
      v-if="clicked"
      @close="handleModalClose();"
    />
    <div class="dock">
      <h1 v-if="windowWidth < 1200" class="mt-2 boarder">Docks Doors</h1>
      <HomeDockLayout @inTrailer="handleEmptyClicked" @trailer="handleTrailerClicked" />
    </div>
    <div>
      <div class="row">
        <div class="primaryLot col-sm">
          <div>
            <!-- <span v-on:click.stop="handleEntryPrimaryLocation" class="addBtn">+</span> -->
            <h1 class="center boarder">Primary Lot</h1>
            <HomeLotLayout
              lot="Primary Lot"
              @inTrailer="handleEntryPrimaryLocation"
              @trailer="handleTrailerClicked"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="building"></div>
  </div>
</template>

<script>
import HomeDockLayout from "@/components/HomeDockLayout.vue";
import HomeLotLayout from "@/components/HomeLotLayout.vue";
import EntryModal from "@/components/EntryModal.vue";
import InfoModal from "@/components/InfoModal.vue";
import InModal from "@/components/InModal.vue";
import TempModal from "@/components/TempModal.vue";

export default {
  name: "home",
  components: {
    HomeDockLayout,
    HomeLotLayout,
    InfoModal,
    EntryModal,
    TempModal,
    InModal
  },
  data: () => ({
    windowWidth: "",
    entry: false,
    clicked: false,
    inTrailer: false,
    clickedDock: "",
    empty: false,
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
    async handleEntryPrimaryLocation(value) {
      this.clickedDock = `PL-${value}`;
      this.entry = true;
    },
    async handleEntryModalClose() {
      this.entry = false;
      this.clickedDock = "";
    },
    async handleTempModalClose() {
      this.empty = false;
      this.clickedDock = "";
    },
    async handleAddTrailer(value) {
      this.clickedDock = value;
      this.entry = true;
    },
    async handleInTrailer(value) {
      this.clickedDock = value;
      this.inTrailer = true;
    },
    async handleInClose() {
      this.inTrailer = false;
    },
    async handleTrailerClicked(value) {
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerlocation;
      this.trailer.trailerNumber = value.trailernumber;
      this.trailer.shipDates = value.shipdates;
      this.trailer.status = value.status;
      this.trailer._id = value._id;
      this.clicked = true;
    },
    async handleEmptyClicked(value) {
      this.clickedDock = value;
      this.empty = true;
    },
    async handleModalClose() {
      this.trailer = {};
      this.clicked = false;
    }
  }
};
</script>

<style>
@media only screen and (max-width: 1199px) {
  .row {
    width: 100%;
  }

  .boarder {
    border-bottom: 4px solid black;
    width: 100%;
  }

  .primaryLot .addBtn {
    position: absolute;
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
    left: 85%;
  }
}

@media screen and (min-width: 1200px) {
  .row {
    width: 100%;
  }

  .primaryLot {
    height: 20em;
    margin-top: 1em;
  }

  .center {
    text-align: center;
  }

  .building {
    position: fixed;
    bottom: 10px;
    margin: 5px;
    left: 5px;
    right: 5px;
    height: 50px;
    width: calc(100% - 20px);
    border: 4px solid black;
  }

  .dock {
    height: 75px;
    width: calc(100% - 20px);
    margin: 5px;
    left: 5px;
    right: 5px;
    position: fixed;
    bottom: 75px;
  }

  .lotB .addBtn {
    position: absolute;
    top: 10%;
    left: 100%;
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
  }

  .primaryLot .addBtn {
    position: absolute;
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
    left: 85%;
  }
}

.addBtn:hover,
.addBtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
