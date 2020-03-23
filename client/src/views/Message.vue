<template>
  <div>
    <h1>User Not Found</h1>
    <h2>Please speak with you crew lead.</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Admin",
  components: {},
  data: () => ({}),
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
