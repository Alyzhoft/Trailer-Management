<template>
  <div>
    <div class="noWrap">
      <div
        v-for="pls in primaryLotSpots"
        v-on:click="handleEntryLocation(pls)"
        :key="pls"
        class="trailers"
        id="left"
      >
        <h6>{{ pls }}</h6>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerlocation == `PL-${pls}`"
          :key="trailer._id"
          v-on:click.stop="handleOnTrialerClick(trailer);"
          :class="{
            'inner-seat': trailer.trailerlocation == `PL-${pls}`,
            populated: trailer.trailerlocation == `PL-${pls}`,
            inProcess: trailer.category == 'In Process',
            completed: trailer.category == 'Completed',
            receiving: trailer.category == 'Receiving',
            receivingRush: trailer.category == 'Receiving - Rush',
            patioDoors: trailer.category == 'Patio Trailers',
            shippingStorageTrailers: trailer.category == 'Storage/Misc. Shipping Trailers',
            empties: trailer.category == 'Empties for Shipping',
            receivingStorage: trailer.category == 'Receiving - Storage',
            doNotUse: trailer.category == 'Do Not Use'
          }"
          :title="trailer.carrier"
          data-toggle="popover"
          data-trigger="hover"
          data-placement="top"
          :data-content="trailer.status"
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
  name: "HomeLotLayout",
  components: {
    InfoModal,
    EntryModal
  },
  data: () => ({
    clicked: false,
    entry: false,
    clickedTrailer: {},
    pls: ""
  }),
  updated() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover();
    });
  },
  mounted() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover();
    });
  },
  computed: {
    trailers() {
      return this.$store.state.trailers;
    },
    primaryLotSpots() {
      return this.$store.state.primaryLotSpots;
    }
  },
  methods: {
    async handleOnTrialerClick(trailer) {
      this.clickedTrailer = trailer;
      this.$emit("trailer", this.clickedTrailer);
      // this.clicked = true;
    },
    async handleEntryLocation(pls) {
      this.pls = pls.toString();
      this.$emit("inTrailer", this.pls);
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
  /* .noWrap {
    white-space: nowrap;
  } */

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
    margin: -10px 0px 0px 0px;
    background: #d8d8d8;
    position: relative;
  }

  h6 {
    /* margin-top: 100px; */
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

  .receiving {
    background-color: purple;
  }

  .receivingRush {
    background-color: magenta;
  }

  .doNotUse {
    background-color: red;
  }

  .receivingStorage {
    background-color: navy;
  }

  .patioDoors {
    background-color: rgb(255, 153, 0);
  }

  .shippingStorageTrailers {
    background-color: steelblue;
  }

  .empties {
    background-color: grey;
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

  .receiving {
    background-color: purple;
  }

  .receivingRush {
    background-color: red;
  }

  .receivingStorage {
    background-color: navy;
  }

  .patioDoors {
    background-color: rgb(255, 153, 0);
  }

  .shippingStorageTrailers {
    background-color: steelblue;
  }

  .empties {
    background-color: grey;
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
