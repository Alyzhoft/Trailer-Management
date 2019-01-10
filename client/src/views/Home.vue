<template>
  <div class="home">
    <div v-if="windowWidth > 1230">
      <TempModal
        :clickedDock="this.clickedDock"
        v-if="empty"
        @close="handleTempModalClose();"
        @addTrailer="handleAddTrailer"
        @inTrailer="handleInTrailer"
      />
      <EntryModal :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();"/>
      <InModal v-if="inTrailer" :clickedDock="this.clickedDock" @close="handleInClose"></InModal>
      <InfoModal
        :windowWidth="this.windowWidth"
        :clickedTrailer="this.trailer"
        v-if="clicked"
        @close="handleModalClose();"
      />
      <div class="dock">
        <HomeDockLayout @inTrailer="handleEmptyClicked" @trailer="handleTrailerClicked"/>
      </div>
      <div>
        <div class="row">
          <div class="lotA col-sm">
            <div>
              <h1 class="center">Primary Lot</h1>
              <span v-on:click.stop="handleEntryPrimaryLocation" class="addBtn">+</span>
              <HomeLotLayout lot="Primary Lot" @trailer="handleTrailerClicked"/>
            </div>
          </div>
        </div>
      </div>
      <div class="building"></div>
    </div>
    <div v-else class="container">
      <EntryModalSS :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose();"/>
      <InfoModalSS
        :clickedTrailer="this.trailer"
        :windowWidth="this.windowWidth"
        v-if="clicked"
        @close="handleModalClose();"
      />
      <div class="row">
        <h1 class="mt-2 boarder">Docks Doors</h1>
        <HomeDockLayoutSS @entry="handleEmptyClicked" @trailer="handleTrailerClicked"/>
      </div>
      <div class="lotASS row">
        <div>
          <span v-on:click.stop="handleEntryLotALocation" class="addBtn">+</span>
          <h1 class="boarder">Primary Lot</h1>
          <HomeLotLayoutSS lot="Primary Lot" @trailer="handleTrailerClicked"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeDockLayout from "@/components/HomeDockLayout.vue";
import HomeDockLayoutSS from "@/components/HomeDockLayoutSS.vue";
import HomeLotLayout from "@/components/HomeLotLayout.vue";
import HomeLotLayoutSS from "@/components/HomeLotLayoutSS.vue";
import EntryModal from "@/components/EntryModal.vue";
import EntryModalSS from "@/components/EntryModalSS.vue";
import InfoModal from "@/components/InfoModal.vue";
import InfoModalSS from "@/components/InfoModalSS.vue";
import InModal from "@/components/InModal.vue";
import TempModal from "@/components/TempModal.vue";

export default {
  name: "home",
  components: {
    HomeDockLayout,
    HomeDockLayoutSS,
    HomeLotLayout,
    HomeLotLayoutSS,
    InfoModal,
    InfoModalSS,
    EntryModal,
    EntryModalSS,
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
    },
    test: [
      37,
      36,
      35,
      34,
      33,
      32,
      31,
      30,
      29,
      28,
      25,
      24,
      23,
      22,
      21,
      20,
      19,
      18,
      17,
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ]
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
    async handleEntryPrimaryLocation() {
      this.clickedDock = "Primary Lot";
      console.log(this.clickedDock);
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
      console.log(value);
      this.clickedDock = value;
      this.entry = true;
    },
    async handleInTrailer(value) {
      console.log(value);
      this.clickedDock = value;
      this.inTrailer = true;
    },
    async handleInClose() {
      this.inTrailer = false;
    },
    async handleTrailerClicked(value) {
      console.log(value);
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
    async handleSSTrailerClicked(value) {
      this.trailer.carrier = value.carrier;
      this.trailer.category = value.category;
      this.trailer.status = value.status;
      this.trailer.trailerLocation = value.trailerlocation;
      this.trailer.trailerNumber = value.trailernumber;
      this.trailer.shipDates = value.shipdates;
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
.row {
  width: 100%;
}
.boarder {
  border-bottom: 4px solid black;
  width: 100%;
}

.lotA {
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
  height: 75px;
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
  bottom: 100px;
}

.lotB .addBtn {
  position: absolute;
  top: 10%;
  left: 100%;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.lotA .addBtn {
  position: absolute;
  top: 10%;
  margin-bottom: 10px;
  left: 85%;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.lotASS .addBtn {
  position: absolute;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  left: 85%;
}

.lotBSS .addBtn {
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
</style>
