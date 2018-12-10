<template>
  <div class="container">
    <div class="mt-2 mb-2">
      <input type="datetime-local" v-model="startDateTime" name="test" id>
      <input type="datetime-local" class="ml-2" v-model="endDateTime" name="test" id>
      <button type="button" @click="search" class="btn btn-secondary ml-2">Submit</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Trailer Number</th>
          <th scope="col">Carrier</th>
          <th scope="col">Departed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dt in departedTrailers" :key="dt._id">
          <td>{{ dt.trailerNumber }}</td>
          <td>{{ dt.carrier }}</td>
          <td>{{ dt.strDepartedDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    startDateTime: "",
    endDateTime: ""
  }),
  computed: {
    departedTrailers() {
      return this.$store.state.departedTrailers;
    }
  },
  methods: {
    search() {
      fetch("http://localhost:3000/departedtrailers", {
        method: "POST",
        body: JSON.stringify({
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime
        }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(trailers => {
          console.log(trailers);
        });
    }
  }
};
</script>

<style scoped>
</style>
