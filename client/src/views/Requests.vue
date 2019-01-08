<template>
  <div>
    <OutPlacementModal v-if="outPlacement" :request="this.request" @close="handleClose"></OutPlacementModal>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Time Submitted</th>
            <th scope="col">Out</th>
            <th scope="col">In</th>
            <th scope="col">Dock</th>
            <th scope="col">Urgent</th>
            <th scope="col">Done</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request._id">
            <td>{{ request.inserted }}</td>
            <td v-if="request.outcarrier">{{ request.outcarrier }} - {{ request.outtrailernumber }}</td>
            <td v-else></td>
            <td v-if="request.incarrier">{{ request.incarrier }} - {{ request.intrailernumber }}</td>
            <td v-else></td>
            <td>{{ request.dock }}</td>
            <td v-if="request.urgent == 'true'">✔</td>
            <td v-else></td>
            <td>
              <button @click="completed(request);" class="btn btn-primary">Done</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OutPlacementModal from "@/components/OutPlacementModal.vue";

export default {
  name: "requests",
  components: {
    OutPlacementModal
  },
  data: () => ({
    outPlacement: false,
    request: {}
  }),
  computed: {
    requests() {
      return this.$store.state.requests;
    }
  },
  methods: {
    async completed(request) {
      if (request.outcarrier) {
        this.request = request;
        this.outPlacement = true;
        console.log("pressed");
      } else {
        let res = await this.$socket.emit("completed", request);
      }
    },

    async handleClose() {
      this.outPlacement = false;
    }
  }
};
</script>
