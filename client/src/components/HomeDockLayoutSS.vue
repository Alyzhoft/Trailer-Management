<template>
  <div>
    <InfoModal :clickedTrailer="this.clickedTrailer" v-if="clicked" @close="handleModalClose()"/>
    <div>
      <h1 class="mt-2">Docks Doors</h1>
      <div v-for="dock in dockDoors" :key="dock" class="trailers" id="left">
        <h6>{{ dock }}</h6>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerLocation == dock"
          v-on:click="handleOnTrialerClick(trailer);"
          :key="trailer._id"
          :class="{
            'inner-seat': trailer.trailerLocation == dock,
            populated: trailer.trailerLocation == dock
          }"
        ></div>
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
      this.clickedTrailer = trailer; //Continue working on getting data from event
      this.clicked = true;
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
  width: 70px;
  height: 125px;
  background: #d8d8d8;
  position: relative;
  left: 15px;
  margin: 4px;
  margin-top: 2%;
  text-align: center;
  color: white;
}

.inner-seat {
  width: 70px;
  height: 106px;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  margin: -44px 0px 0px -35px;
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
</style>
