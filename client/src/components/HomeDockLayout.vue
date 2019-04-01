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
            populated: trailer.trailerlocation == dock,
            inProcess: trailer.category == 'In Process',
            completed: trailer.category == 'Completed'
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
      this.$emit("trailer", this.clickedTrailer);
      // this.clicked = true;
    },
    async handleEntryLocation(dock) {
      this.clickedDock = dock.toString();
      this.$emit("inTrailer", this.clickedDock);
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
@media screen and (min-width: 1200px) {
  .noWrap {
    white-space: nowrap;
  }

  .populated p {
    font-size: 10px;
    color: white;
    font-weight: bold;
    position: relative;
    right: 7px;
    writing-mode: vertical-lr;
    text-orientation: upright;
  }

  .trailers {
    width: 1.54%;
    height: 7em;
    background: #d8d8d8;
    display: inline-block;
    position: relative;
    margin-right: 1.2%;
    margin-top: -0.5%;
    left: 1%;
    text-align: center;
    color: white;
  }

  .inner-seat {
    width: 100%;
    height: 6.1em;
    border-radius: 4px;
    margin: -127px 0px 0px 0px;
    background: #d8d8d8;
    position: relative;
  }

  h6 {
    margin-top: 100px;
    color: black;
    background: white;
  }

  .populated {
    background-color: blue;
    color: white;
    text-align: center;
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
}

@media screen and (max-width: 1199px) {
  #left {
    float: left;
  }
  .trailers {
    width: 20px;
    height: 7em;
    background: #d8d8d8;
    position: relative;
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
    width: 100%;
    height: 5.9em;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    margin: -38px 0px 0px -10px;
    background: #d8d8d8;
    position: absolute;
  }

  h6 {
    color: black;
    background: white;
  }

  .populated {
    background-color: blue;
    color: white;
    text-align: center;
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
}
</style>
