<template>
  <v-data-table :headers="headers" :items="users" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <DeleteUserModal
          v-if="deleteUser"
          :user="editedItem"
          @close="handleDeleteUserModalClose();"
        />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" @click="newUser()" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-form v-model="valid" :lazy-validation="false" ref="form">
                      <v-text-field
                        v-model="editedItem.firstname"
                        label="First Name"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Last Name"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                      <v-switch v-model="editedItem.admin" :label="`Admin: ${editedItem.admin}`"></v-switch>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save" :disabled="!valid">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.admin="{ item }">
      <v-icon>{{ item.admin ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}</v-icon>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil-outline</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DeleteUserModal from "./DeleteUserModal.vue";

export default {
  name: "Users",
  components: {
    DeleteUserModal
  },
  data() {
    return {
      valid: false,
      dialog: false,
      deleteUser: false,
      headers: [
        {
          text: "First Name",
          align: "left",
          sortable: false,
          value: "firstname"
        },
        {
          text: "Last Name",
          sortable: false,
          value: "lastname"
        },
        {
          text: "Email",
          sortable: false,
          value: "email"
        },
        {
          text: "Admin",
          sortable: false,
          value: "admin"
        },
        {
          text: "Actions",
          value: "action",
          align: "right",
          sortable: false
        }
      ],
      editedIndex: -1,
      editedItem: {},
      rules: {
        email: value => {
          if (value != undefined) {
            if (value.length > 0) {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return pattern.test(value) || "Invalid e-mail.";
            }
          } else {
            return "Invalid e-mail.";
          }
        },
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    users() {
      return this.$store.state.users;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    newUser() {
      this.editedItem = { admin: false };
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    },
    editItem(item) {
      this.editedIndex = this.users
        .map(u => {
          return u.email;
        })
        .indexOf(item.email);

      this.editedItem = item;

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = item;
      this.deleteUser = true;
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
        this.editUser();
      } else {
        this.addUser();
      }
      this.close();
    },

    async addUser() {
      const emails = this.$store.state.users.map(u => {
        return u.email;
      });

      let create = true;
      for (let i = 0; i < emails.length; i++) {
        if (emails[i].toUpperCase() == this.editedItem.email.toUpperCase()) {
          create = false;
        }
      }

      if (create) {
        const res = await this.$socket.emit("addUser", this.editedItem);
      } else {
        console.log(`${this.editedItem.email} is already created`);
      }
    },

    async editUser() {
      const res = await this.$socket.emit("editUser", this.editedItem);
    },

    async handleDeleteUserModalClose() {
      this.deleteUser = false;
    }
  }
};
</script>