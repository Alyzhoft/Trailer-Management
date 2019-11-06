<template>
  <div>
    <v-container fluid>
      <v-tabs centered>
        <v-tab @click="carriersTab = true, categoriesTab = false, usersTab = false">Carriers</v-tab>
        <v-tab @click="carriersTab = false, categoriesTab = true, usersTab = false">Categories</v-tab>
        <v-tab @click="carriersTab = false, categoriesTab = false, usersTab = true">Users</v-tab>
      </v-tabs>
      <Carriers v-if="carriersTab" />
      <Categories v-if="categoriesTab" />
      <div v-if="usersTab">users</div>
    </v-container>
  </div>
</template>

<script>
import Carriers from "@/components/Carriers.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "Admin",
  components: {
    Carriers,
    Categories
  },
  data: () => ({
    dialog: false,
    deleteCarrier: false,
    carriersTab: true,
    categoriesTab: false,
    usersTab: false
  }),
  computed: {
    carriers() {
      return this.$store.state.carriers.sort();
    }
  },
  methods: {
    async handleAddCarrierModalClose() {
      this.dialog = false;
    },
    async handleDeleteCarrierModalClose() {
      this.deleteCarrier = false;
    },
    async handleDeleteCarrier(carrier) {
      this.carrier = carrier;
      this.deleteCarrier = true;
    }
  }
};
</script>

<style scoped>
</style>
