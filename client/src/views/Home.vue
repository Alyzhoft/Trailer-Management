<template>
  <div class="home">
    <div class="test"></div>
    <div class="dockLayout">
      <HomeDockLayout/>
    </div>
  </div>
</template>

<script>
import HomeDockLayout from "@/components/HomeDockLayout.vue";

export default {
  name: "home",
  components: {
    HomeDockLayout
  }
};
</script>
<style>
.dockLayout {
  position: fixed;
  bottom: 10px;
  margin: 5px;
  left: 5px;
  right: 5px;
  height: 100px;
  width: calc(100% - 20px);
  border: 4px solid black;
}

.test {
  height: 100px;
  width: calc(100% - 20px);
  margin: 5px;
  left: 5px;
  right: 5px;
  position: fixed;
  bottom: 111px;
  border: 4px solid red;
}
h1 {
  text-align: center;
}
</style>
