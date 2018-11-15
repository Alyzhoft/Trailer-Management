<template>
  <div>
    <div>
      <div v-for="dock in dockDoors" :key="dock" class="outer-seat" id="div-inline">
        <h4>{{ dock }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeDockLayout",
  data: () => ({
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
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  color: black;
  background: white;
}
/* .outer-seat {
  width: 70px;
  height: 125px;
  background: #d8d8d8;
  position: relative;
  margin: 4px;
  margin-top: 2%;
  text-align: center;
  color: white;
} */

#div-inline {
  float: left;
  margin-left: 12px;
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
