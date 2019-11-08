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
      <User v-if="usersTab" />
    </v-container>
  </div>
</template>

<script>
import Carriers from "@/components/Carriers.vue";
import Categories from "@/components/Categories.vue";
import User from "@/components/User.vue";
import { mapActions } from "vuex";

export default {
  name: "Admin",
  components: {
    Carriers,
    Categories,
    User
  },
  data: () => ({
    deleteCarrier: false,
    carriersTab: true,
    categoriesTab: false,
    usersTab: false
  }),
  async mounted() {
    await this.getUsers();
  },
  computed: {},
  methods: {
    ...mapActions(["getUsers"])
  }
};
</script>

<style scoped>
</style>
