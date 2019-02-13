<template>
  <div class="container">
    <!--
      <InfoModal :clickedTrailer="this.clickedTrailer" v-if="clicked" @close="handleModalClose()"/>
    -->
    <div
      v-for="trailer in trailers"
      v-if="trailer.trailerlocation == lot"
      v-on:click="handleOnTrialerClick(trailer);"
      :key="trailer._id"
      id="lot"
      :class="{
        listLot: trailer.trailerlocation == lot,
        populated: trailer.trailerlocation == lot,
        inProcess: trailer.category == 'In Process',
        completed: trailer.category == 'Completed',
        receiving: trailer.category == 'Receiving'
      }"
    >
      <p>{{ trailer.trailernumber }}</p>
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
  height: 95px;
  background: #d8d8d8;
  margin: 4px;
  margin-top: 2%;
  border-radius: 4px;
  text-align: center;
  color: white;
}

.populated {
  background-color: blue;
  text-align: center;
}

p {
  color: white;
  font-weight: bold;
  font-size: 10px;
  position: relative;
  right: 7px;
  writing-mode: vertical-lr;
  text-orientation: upright;
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
  background-color: red;
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
