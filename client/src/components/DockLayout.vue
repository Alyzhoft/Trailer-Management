<template>
  <div class="container">
    <InfoModal :clickedTrailer="this.clickedTrailer" v-if="clicked" @close="handleModalClose()"/>
    <div>
      <div v-for="dock in sectionArray" :key="dock" class="outer-seat" id="div-inline">
        <h4>{{ dock }}</h4>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerLocation == dock"
          v-on:click="handleOnTrialerClick(trailer);"
          :key="trailer._id"
          :class="{
            'inner-seat': trailer.trailerLocation == dock,
            populated: trailer.trailerLocation == dock
          }"
        >
          <h5>{{ trailer.trailerNumber }}</h5>
          <h5>{{ trailer.carrier }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>
// :data-value="trailer._id"
<script>
import InfoModal from "./InfoModal.vue";

export default {
  name: "DockLayout",
  components: {
    InfoModal
  },
  props: {
    sectionArray: Array
  },
  data: () => ({
    clicked: false,
    clickedTrailer: {}
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
h4 {
  color: black;
  background: white;
}
.outer-seat {
  width: 70px;
  height: 125px;
  background: #d8d8d8;
  position: relative;
  margin: 4px;
  margin-top: 2%;
  text-align: center;
  color: white;
}
.inner-seat {
  width: 70px;
  height: 100px;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  margin: -35px 0px 0px -35px;
  background: #d8d8d8;
  position: absolute;
}

.populated {
  background-color: green;
  color: white;
  text-align: center;
}

.populated h5 {
  color: white;
  word-wrap: break-word;
}

#div-inline {
  float: left;
}

.clearBoth {
  clear: both;
}

.populated:hover,
.populated:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
