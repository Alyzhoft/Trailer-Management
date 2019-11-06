<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">Delete {{this.carrier}}</v-card-title>
      <v-card-text>This will perminatly delete {{this.carrier}}.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close');">Disagree</v-btn>
        <v-btn color="green darken-1" text @click="deleteCarrier();">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteCarrierModal",
  props: {
    carrier: String
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    async deleteCarrier() {
      const res = await this.$socket.emit("deleteCarrier", this.carrier);
      this.$emit("close");
    }
  }
};
</script>