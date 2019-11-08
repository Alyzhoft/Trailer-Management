<template>
  <div>
    <v-data-table :headers="headers" :items="carriers" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <AddCarrierModal v-if="dialog" @close="handleAddCarrierModalClose();"></AddCarrierModal>
              <v-btn color="primary" dark class="mb-2" v-on="on">New Carrier</v-btn>
            </template>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <DeleteCarrierModal
      :carrier="this.carrier"
      v-if="deleteCarrier"
      @close="handleDeleteCarrierModalClose();"
    ></DeleteCarrierModal>
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
      deleteCarrier: false,
      headers: [
        {
          text: "Carrier",
          align: "left",
          sortable: false,
          value: "carrier"
        },
        {
          text: "Actions",
          value: "action",
          align: "right",
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {
        category: "",
        color: "#FF0000FF"
      },
      carrier: ""
    };
  },
  computed: {
    carriers() {
      return this.$store.state.carriers.sort();
    }
  },
  methods: {
    async deleteItem(item) {
      this.carrier = item.carrier;
      this.deleteCarrier = true;
    },
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