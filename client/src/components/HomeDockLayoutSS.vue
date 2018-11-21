<template>
  <div>
    <div>
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
          v-on:click.stop="handleOnTrialerClick(trailer);"
          :key="trailer._id"
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

export default {
  name: "HomeDockLayout",
  components: {
    InfoModal
  },
  data: () => ({
    clicked: false,
    clickedTrailer: {},
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
    },
    async handleEntryLocation(dock) {
      this.clickedDock = dock.toString();
      this.$emit("entry", this.clickedDock);
      // this.entry = true;
    },
    async handleModalClose() {
      this.clickedTrailer = {};
      this.clicked = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left {
  float: left;
}
.trailers {
  width: 20px;
  height: 85px;
  background: #d8d8d8;
  position: relative;
  left: 15px;
  margin: 4px;
  margin-top: 2%;
  text-align: center;
  color: white;
}

.populated p {
  font-size: 10px;
  color: white;
  position: relative;
  right: 7px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

.inner-seat {
  width: 20px;
  height: 68px;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  margin: -25px 0px 0px -10px;
  background: #d8d8d8;
  position: absolute;
}

h6 {
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
