<template>
  <div>
    <div class="noWrap">
      <div
        v-for="dock in dockDoors"
        v-on:click="handleEntryLocation(dock);"
        :key="dock"
        class="trailers"
        id="left"
      >
        <h6>{{ dock }}</h6>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerlocation == dock"
          :key="trailer._id"
          v-on:click.stop="handleOnTrialerClick(trailer);"
          :class="{
            'inner-seat': trailer.trailerlocation == dock,
            populated: trailer.trailerlocation == dock
          }"
        >
          <p>{{ trailer.trailernumber }}</p>
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
    clickedDock: ""
  }),
  computed: {
    trailers() {
      return this.$store.state.trailers;
    },
    dockDoors() {
      return this.$store.state.dockDoors;
    }
  },
  methods: {
    async handleOnTrialerClick(trailer) {
      this.clickedTrailer = trailer;
      console.log(trailer);
      this.$emit("trailer", this.clickedTrailer);
      // this.clicked = true;
    },
    async handleEntryLocation(dock) {
      this.clickedDock = dock.toString();
      this.$emit("entry", this.clickedDock);
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
  height: 5em;
  background: #d8d8d8;
  display: inline-block;
  position: relative;
  margin-right: 1.2%;
  margin-top: 1.9%;
  left: 1%;
  text-align: center;
  color: white;
}

.inner-seat {
  width: 1.3em;
  height: 4.4em;
  border-radius: 4px;
  margin: -98px 0px 0px 0px;
  background: #d8d8d8;
  position: relative;
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
