<template>
  <div class="dashboard">
    <div class="container">
      <label>Section</label>
      <select class="form-control" v-model="section" id="section dropdownMenuOffset">
        <option v-for="section in sectionOptions" :key="section">{{ section }}</option>
      </select>
    </div>
    <div v-if="section == '1'">
      <DockLayout :sectionArray="sectionOne"/>
    </div>
    <div v-if="section == '2'">
      <DockLayout :sectionArray="sectionTwo"/>
    </div>
    <div v-if="section == '3'">
      <DockLayout :sectionArray="sectionThree"/>
    </div>
    <div v-if="section == 'Lot A'">
      <LotLayout lot="Lot A"/>
    </div>
    <div v-if="section == 'Lot B'">
      <LotLayout lot="Lot B"/>
    </div>
  </div>
</template>

<script>
import DockLayout from "@/components/DockLayout.vue";
import LotLayout from "@/components/LotLayout.vue";

export default {
  name: "dashboard",
  data: () => ({
    sectionOptions: [1, 2, 3, "Lot A", "Lot B"],
    section: "",
    sectionOne: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    sectionTwo: [18, 19, 20, 21, 22, 23, 24, 25],
    sectionThree: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
  }),
  components: {
    DockLayout,
    LotLayout
  },
  computed: {
    trailers() {
      return this.$store.state.trailers;
    }
  },
  name: "home"
};
</script>
