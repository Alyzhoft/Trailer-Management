<template>
  <div>
    <OutPlacementModal v-if="outPlacement" :request="this.request" @close="handleClose"></OutPlacementModal>
    <InDoneModal v-if="inDone" :request="this.request" @close="handleClose"></InDoneModal>
    <InOutDoneModal v-if="inOutDone" :request="this.request" @close="handleClose"></InOutDoneModal>
    <DeleteModal
      v-if="deleteRequest"
      :deleteRequest="'Request'"
      :request="this.request"
      @close="handleClose"
    ></DeleteModal>

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
            <td
              v-if="request.incarrier && request.special && request.intrailernumber"
            >{{ request.incarrier }} - {{ request.intrailernumber }} - {{ request.special }}</td>
            <td
              v-else-if="request.incarrier && request.special"
            >{{ request.incarrier }} - {{ request.special }}</td>
            <td
              v-else-if="request.incarrier && request.intrailernumber"
            >{{ request.incarrier }} - {{ request.intrailernumber }}</td>
            <td v-else-if="request.incarrier">{{ request.incarrier }}</td>
            <td v-else></td>
            <td>{{ request.dock }}</td>
            <td v-if="request.urgent == 'true'">✔</td>
            <td v-else></td>
            <td>
              <button @click="completed(request);" class="btn btn-primary">Done</button>
            </td>
            <td>
              <span v-on:click.stop="handleDeleteRequest(request)" class="remove">❌</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OutPlacementModal from "@/components/OutPlacementModal.vue";
import InDoneModal from "@/components/InDoneModal.vue";
import InOutDoneModal from "@/components/InOutDoneModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "requests",
  components: {
    OutPlacementModal,
    InDoneModal,
    InOutDoneModal,
    DeleteModal
  },
  data: () => ({
    outPlacement: false,
    inDone: false,
    inOutDone: false,
    deleteRequest: false,
    request: {}
  }),
  computed: {
    requests() {
      return this.$store.state.requests;
    }
  },
  methods: {
    async completed(request) {
      if (request.outcarrier && request.incarrier) {
        this.request = request;
        this.inOutDone = true;
      } else if (request.outcarrier) {
        this.request = request;
        this.outPlacement = true;
      } else if (request.incarrier) {
        this.request = request;
        this.inDone = true;
      } else {
        let res = await this.$socket.emit("completed", request);
      }
    },

    async handleClose() {
      this.outPlacement = false;
      this.inDone = false;
      this.inOutDone = false;
      this.deleteRequest = false;
    },

    async handleDeleteRequest(request) {
      this.request = request;
      this.deleteRequest = true;
    }
  }
};
</script>
<style>
.remove:hover,
.remove:focus {
  text-decoration: none;
  cursor: pointer;
}
</style>

