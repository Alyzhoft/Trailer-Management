<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Carrier</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="carrier" required autofocus></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close');">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addCarrier();">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addCarrierModal",
  data() {
    return {
      show: true,
      carrier: ""
    };
  },
  methods: {
    async addCarrier() {
      const carriers = this.$store.state.carriers.map(c => {
        return c.carrier;
      });

      let create = true;
      for (let i = 0; i < carriers.length; i++) {
        if (
          carriers[i].toUpperCase() == this.carrier.toUpperCase() &&
          carriers[i] == this.carrier
        ) {
          create = false;
        }
      }

      if (create) {
        const res = await this.$socket.emit("addCarrier", this.carrier);
        this.$emit("close");
      } else {
        console.log(`${this.carrier} is already created`);
      }
    }
  }
};
</script>