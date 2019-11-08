<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">Delete {{this.user.firstname}} {{this.user.lastname}}</v-card-title>
      <v-card-text>This will perminatly delete {{this.user.firstname}} {{this.user.lastname}}.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close');">Disagree</v-btn>
        <v-btn color="green darken-1" text @click="deleteCategory();">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteUserModal",
  props: {
    user: Object
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    async deleteCategory() {
      const res = await this.$socket.emit("deleteUser", this.user);
      this.$emit("close");
    }
  }
};
</script>