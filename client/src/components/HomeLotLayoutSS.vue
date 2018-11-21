<template>
  <div class="container">
    <!-- <InfoModal :clickedTrailer="this.clickedTrailer" v-if="clicked" @close="handleModalClose()"/> -->

    <div
      v-for="trailer in trailers"
      v-if="trailer.trailerLocation == lot"
      v-on:click="handleOnTrialerClick(trailer);"
      :key="trailer._id"
      id="lot"
      :class="{
      'listLot': trailer.trailerLocation == lot,
      populated: trailer.trailerLocation == lot
      }"
    >
      <p>{{ trailer.trailerNumber }}</p>
    </div>
  </div>
</template>

<script>
import InfoModal from "./InfoModal.vue";

export default {
  name: "DockLayout",
  components: {
    InfoModal
  },
  props: {
    lot: ""
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
      this.clickedTrailer = trailer;
      this.$emit("trailer", this.clickedTrailer);
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

.listLot {
  width: 20px;
  height: 68px;
  background: #d8d8d8;
  margin: 4px;
  margin-top: 2%;
  border-radius: 4px;
  text-align: center;
  color: white;
}

.populated {
  background-color: green;
  color: white;
  text-align: center;
}

.populated p {
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

.populated:hover,
.populated:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
