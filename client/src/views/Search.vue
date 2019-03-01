<template>
  <div @keyup.enter="search">
    <AlertModal v-if="modal.visible" @close="modal.visible = false;" :modalInfo="modal"/>

    <div class="container">
      <div class="mt-2 mb-2 form-inline">
        <input
          type="text"
          v-model="trailerNumber"
          placeholder="Trailer Number"
          class="form-control mr-sm-2"
        >
        <div class="inline mr-sm-2">
          <select class="form-control" v-model="category" id="Category dropdownMenuOffset">
            <option value selected disabled>Category</option>
            <option v-for="c in categories" :key="c">{{c}}</option>
          </select>
        </div>
        <div class="inline mr-sm-2">
          <select class="form-control" v-model="carrier" id="Carrier dropdownMenuOffset">
            <option value selected disabled>Carrier</option>
            <option v-for="c in carriers" :key="c">{{c}}</option>
          </select>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            v-model="departed"
            class="custom-control-input"
            id="customCheck1"
            checked
          >
          <label class="custom-control-label" for="customCheck1">Departed</label>
        </div>
        <!--
        <input type="datetime-local" v-model="startDateTime" name="test" id>
        <input type="datetime-local" class="ml-2" v-model="endDateTime" name="test" id>
        -->
        <button type="button" @click="search" class="btn btn-secondary ml-2">Search</button>
        <button type="button" @click="clear" class="btn btn-secondary ml-2">Clear</button>
      </div>
      <div v-if="departedSearch">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Trailer Number</th>
              <th scope="col">Category</th>
              <th scope="col">Carrier</th>
              <th scope="col">Departed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sr in searchResults" :key="sr._id">
              <td>{{ sr.trailernumber }}</td>
              <td>{{ sr.category }}</td>
              <td>{{ sr.carrier }}</td>
              <td>{{ sr.datetime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Trailer Number</th>
              <th scope="col">Category</th>
              <th scope="col">Carrier</th>
              <th scope="col">Inserted</th>
              <th scope="col">Trailer Location</th>
              <th scope="col">Ship Dates</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sr in searchResults" :key="sr._id">
              <td>{{ sr.trailernumber }}</td>
              <td>{{ sr.category }}</td>
              <td>{{ sr.carrier }}</td>
              <td>{{ sr.datetime }}</td>
              <td>{{ sr.trailerlocation }}</td>
              <td>{{ sr.shipdates }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  data: () => ({
    departedSearch: false,
    departed: false,
    trailerNumber: "",
    category: "",
    carrier: "",
    searchResults: [],
    startDateTime: "",
    endDateTime: "",
    modal: {
      visible: false,
      text: "",
      header: ""
    }
  }),
  components: {
    AlertModal
  },
  computed: {
    departedTrailers() {
      return this.$store.state.departedTrailers;
    },
    carriers() {
      return this.$store.state.carriers.sort();
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    search() {
      fetch("https://trailermanagementbe.azurewebsites.net/search", {
        method: "POST",
        body: JSON.stringify({
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          trailerNumber: this.trailerNumber,
          category: this.category,
          carrier: this.carrier,
          departed: this.departed
        }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(trailers => {
          if (trailers.name) {
            this.modal.visible = true;
            this.modal.header = "Error";
            this.modal.text = `Cannot complete search - ${trailers.routine}`;
          } else {
            if (this.departed) {
              this.departedSearch = true;
            } else {
              this.departedSearch = false;
            }
            this.searchResults = trailers;
          }
        });
    },
    clear() {
      // this.departedSearch = false;
      // this.searchResults = [];
      this.startDateTime = "";
      this.endDateTime = "";
      this.trailerNumber = "";
      this.carrier = "";
      this.category = "";
    }
  }
};
</script>

<style scoped></style>
