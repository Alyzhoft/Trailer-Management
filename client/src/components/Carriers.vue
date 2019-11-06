<template>
  <div>
    <v-btn absolute right @click="dialog = true">
      <v-icon>mdi-plus</v-icon>Add Carrier
    </v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carrier in carriers" :key="carrier">
            <td>{{ carrier }}</td>
            <v-btn
              class="mt-3"
              small
              color="error"
              absolute
              right
              @click="handleDeleteCarrier(carrier)"
            >Delete</v-btn>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row justify="center">
      <AddCarrierModal v-if="dialog" @close="handleAddCarrierModalClose();"></AddCarrierModal>
    </v-row>
    <v-row justify="center">
      <DeleteCarrierModal
        :carrier="this.carrier"
        v-if="deleteCarrier"
        @close="handleDeleteCarrierModalClose();"
      ></DeleteCarrierModal>
    </v-row>
  </div>
</template>

<script>
import AddCarrierModal from "./AddCarrierModal.vue";
import DeleteCarrierModal from "./DeleteCarrierModal.vue";

export default {
  name: "Carriers",
  components: {
    AddCarrierModal,
    DeleteCarrierModal
  },
  data() {
    return {
      dialog: false,
      deleteCarrier: false
    };
  },
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