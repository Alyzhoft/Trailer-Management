<template>
  <div id="myModal" class="modal-custom">
    <!-- Modal content -->
    <div class="modal-content-custom">
      <div class="modal-header-custom">
        <span class="closeBtn" @click="$emit('close');">&times;</span>
      </div>
      <form v-on:submit.prevent="completeRequest">
        <div class="modal-body-custom">
          <div>
            <h3 class="headerInline">In:</h3>
            <h4 class="inline">Dock {{ this.request.dock }}</h4>
          </div>
          <div>
            <h3 class="headerInline">Carrier:</h3>
            <h4 v-if="!tnPopulated" class="inline">{{ this.request.incarrier }}</h4>
            <h4
              v-if="tnPopulated"
              class="inline"
            >{{ this.request.incarrier }} - {{ this.request.intrailernumber }}</h4>
          </div>
          <div v-if="!tnPopulated">
            <h3 class="headerInline">Trailer Number:</h3>
            <div class="inline">
              <select
                class="form-control"
                v-model="data.inTrailerNumber"
                id="trailerNumber dropdownMenuOffset"
                required
              >
                <option v-for="r in results" :key="r._id">{{ r.trailernumber }}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-1 mr-1 mb-1">Complete</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    request: Object
  },
  data: function() {
    return {
      results: [],
      tnPopulated: false,
      data: {
        _id: this.request._id,
        inTrailerNumber: "",
        dock: this.request.dock,
        inCarrier: this.request.incarrier
      }
    };
  },
  mounted() {
    if (this.request.intrailernumber) {
      this.data.inTrailerNumber = this.request.intrailernumber;
      this.tnPopulated = true;
    } else {
      fetch("https://trailermanagementbe.azurewebsites.net/trailerNumbers", {
        method: "POST",
        body: JSON.stringify({
          carrier: this.request.incarrier
        }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(results => {
          this.results = results;
        });
    }
  },
  methods: {
    async completeRequest() {
      let res = await this.$socket.emit("completed", this.data);
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1199px) {
  /* The Modal (background) */
  .modal-custom {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content-custom {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 20px;
  }

  .btn {
    display: inline-block;
    width: calc(50% - 10px);
  }
}

@media screen and (min-width: 1200px) {
  .inline {
    display: inline-block;
    margin-right: 10px;
    width: calc(50% - 10px);
  }
  /* The Modal (background) */
  .modal-custom {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 50px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content-custom {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 20px;
  }
}
.right {
  float: right;
}

.headerInline {
  display: inline-block;
  margin-right: 10px;
}

h4.inline {
  display: inline-block;
  /* width: 90%; */
  /* width: calc(50% - 15px); */
}

/* Modal Header */
.modal-header-custom {
  padding: 0px 16px;
  color: white;
}

/* Modal Body */
.modal-body-custom {
  padding: 0px 16px;
}

/* The Close Button */
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.closeBtn:hover,
.closeBtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
