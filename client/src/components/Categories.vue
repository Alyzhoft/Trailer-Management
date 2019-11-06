<template>
  <v-data-table :headers="headers" :items="categories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <DeleteCategoryModal
          v-if="deleteCategory"
          :category="editedItem.category"
          @close="handleDeleteCategoryModalClose();"
        />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Category</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                  </v-col>
                </v-row>
                <v-color-picker v-model="editedItem.color" :mode.sync="mode" class="mx-auto"></v-color-picker>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil-outline</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DeleteCategoryModal from "./DeleteCategoryModal.vue";

export default {
  components: {
    DeleteCategoryModal
  },
  data: () => ({
    dialog: false,
    deleteCategory: false,
    mode: "rgba",
    headers: [
      {
        text: "Category",
        align: "left",
        sortable: false,
        value: "category"
      },
      {
        text: "Color",
        sortable: false,
        value: "color"
      },
      {
        text: "Actions",
        value: "action",
        sortable: false
      }
    ],
    editedIndex: -1,
    editedItem: {
      category: "",
      color: "#FF0000FF"
    },
    defaultItem: {
      category: "",
      color: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    },
    categories() {
      return this.$store.state.categories.sort((a, b) =>
        a.category > b.category ? 1 : b.category > a.category ? -1 : 0
      );
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.categories
        .map(c => {
          return c.category;
        })
        .indexOf(item.category);

      if (item.color === null) {
        this.editedItem.category = item.category;
      } else {
        this.editedItem.category = item.category;
        this.editedItem.color = item.color;
      }
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem.category = item.category;
      this.deleteCategory = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.editCategory();
      } else {
        this.addCategory();
      }
      this.close();
    },

    async addCategory() {
      const categories = this.$store.state.categories.map(c => {
        return c.category;
      });

      let create = true;
      for (let i = 0; i < categories.length; i++) {
        if (
          categories[i].toUpperCase() == this.editedItem.category.toUpperCase()
        ) {
          create = false;
        }
      }

      if (create) {
        const res = await this.$socket.emit("addCategory", this.editedItem);
      } else {
        console.log(`${this.editedItem.category} is already created`);
      }
    },

    async editCategory() {
      const res = await this.$socket.emit("editCategory", this.editedItem);
    },

    async handleDeleteCategoryModalClose() {
      this.deleteCategory = false;
    }
  }
};
</script>