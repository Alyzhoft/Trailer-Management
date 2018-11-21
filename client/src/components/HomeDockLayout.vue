<template>
  <div>
    <!-- <InfoModal :clickedTrailer="this.clickedTrailer" v-if="clicked" @close="handleModalClose()"/> -->
    <!-- <EntryModal :clickedDock="this.clickedDock" v-if="entry" @close="handleEntryModalClose()"/> -->

    <div class="noWrap">
      <div
        v-for="dock in dockDoors"
        v-on:click="handleEntryLocation(dock)"
        :key="dock"
        class="trailers"
        id="left"
      >
        <h6>{{ dock }}</h6>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerLocation == dock"
          :key="trailer._id"
          v-on:click.stop="handleOnTrialerClick(trailer)"
          :class="{
            'inner-seat': trailer.trailerLocation == dock,
            populated: trailer.trailerLocation == dock
          }"
        >
          <p>{{ trailer.trailerNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoModal from "./InfoModal.vue";
import EntryModal from "@/components/EntryModal.vue";

export default {
  name: "HomeDockLayout",
  components: {
    InfoModal,
    EntryModal
  },
  data: () => ({
    clicked: false,
    entry: false,
    clickedTrailer: {},
    clickedDock: "",
    dockDoors: [
      36,
      35,
      34,
      33,
      32,
      31,
      30,
      29,
      28,
      27,
      26,
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
  computed: {
    trailers() {
      return this.$store.state.trailers;
    }
  },
  methods: {
    async handleOnTrialerClick(trailer) {
      this.clickedTrailer = trailer;
      this.$emit("trailer", this.clickedTrailer);
      // this.clicked = true;
    },
    async handleEntryLocation(dock) {
      this.clickedDock = dock.toString();
      this.$emit("entry", this.clickedDock);
      // this.entry = true;
    },
    async handleModalClose() {
      this.clickedTrailer = {};
      this.clicked = false;
    },
    async handleEntryModalClose() {
      this.entry = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noWrap {
  white-space: nowrap;
}

.modalTest {
  width: 20px;
  height: 68px;
  border-radius: 4px;
  margin: -98px 0px 0px 0px;
  /* position: relative; */
}

.populated p {
  font-size: 10px;
  color: white;
  position: relative;
  right: 7px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

.trailers {
  width: 1.54%;
  height: 85px;
  background: #d8d8d8;
  display: inline-block;
  position: relative;
  margin-right: 15px;
  margin-top: 1.9%;
  left: 10px;
  text-align: center;
  color: white;
}

.inner-seat {
  width: 20px;
  height: 68px;
  border-radius: 4px;
  margin: -98px 0px 0px 0px;
  background: #d8d8d8;
  /* position: relative; */
}

h6 {
  margin-top: 70px;
  color: black;
  background: white;
}

.populated {
  background-color: green;
  color: white;
  text-align: center;
}

.populated:hover,
.populated:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.trailers:hover,
.trailers:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
