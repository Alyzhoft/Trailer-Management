<template>
  <div class="container">
    <InfoModal v-if="clicked" @close="clicked = false;" />
    <div>
      <div
        v-for="dock in sectionArray"
        :key="dock"
        class="outer-seat"
        id="div-inline"
      >
        <h4>{{ dock }}</h4>
        <div
          v-for="trailer in trailers"
          v-if="trailer.trailerLocation == dock"
          data-value="test"
          v-on:click="test($event);"
          :key="trailer._id"
          :class="{
            'inner-seat': trailer.trailerLocation == dock,
            populated: trailer.trailerLocation == dock
          }"
        >
          <h5>{{ trailer.trailerNumber }}</h5>
          <h5>{{ trailer.trailerName }}</h5>
        </div>
      </div>
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
    sectionArray: Array
  },
  data: () => ({
    clicked: false,
    testData: ""
  }),
  computed: {
    trailers() {
      return this.$store.state.trailers;
    }
  },
  methods: {
    async test(e) {
      this.clicked = true;
      this.testData = e.target.dataset.value; //Continue working on getting data from event
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
