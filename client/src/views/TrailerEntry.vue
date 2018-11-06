<template>
  <div class="trailerentry container mt-3">
    <AlertModal v-if="modal.visible" @close="modal.visible = false" :modalInfo="modal"/>
    <form @submit.prevent="addTrailer">
        <fieldset>
            <div class="form-group">
                <label for="trailerNumber">Trailer Number</label>
                <input type="text" minlength="4" maxlength="5" v-model="trailer.trailerNumber" class="form-control" id="trailerNumber" placeholder="Enter Trailer Number">
            </div>
            <div class="form-group">
                <label for="trailerName">Trailer Name</label>
                <select class="form-control" v-model="trailer.trailerName" id="trailerName dropdownMenuOffset">
                    <option>Brockman</option>
                    <option>Dart</option>
                    <option>Filmore</option>
                    <option>Ryder</option>
                    <option>Taylor</option>
                    <option>Transport</option>
                    <option>Wale</option>
                    <option>Wali</option>
                </select>
            </div>
            <div class="form-group">
                <label for="trailerLocation">Trailer Location</label>
                <select class="form-control" v-model="trailer.trailerLocation" id="trailerLocation dropdownMenuOffset">
                    <option v-for="dockNumber in 36" :key="dockNumber">{{ dockNumber }}</option>
                </select>
            </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Create Trailer</button>
        </form>
  </div>
</template>

<script>
import AlertModal from '@/components/AlertModal.vue'

export default {
    name: 'trailerentry',
    components: {
        AlertModal
    },
    data: () => ({
        trailer: {
            trailerNumber: '',
            trailerName: '',
            trailerLocation: ''
        },
        modal: {
            visible: false,
            text: '',
            header: ''
        },
        create: true,
    }),
    methods: {
         async addTrailer() {
            this.create = true;
            const trailers = this.$store.state.trailers
            for (let i = 0; i < trailers.length; i++) {
                if (trailers[i].trailerLocation === this.trailer.trailerLocation) {
                    this.create = false 
                }                
            }

            if(this.create){
                let res = await this.$socket.emit('create', this.trailer)
                this.modal.visible = true;
                this.modal.header = 'Created';
                this.modal.text = `Trailer ${this.trailer.trailerNumber} was Created at Dock: ${this.trailer.trailerLocation}`;
                this.trailer.trailerNumber = '';
                this.trailer.trailerName = '';
                this.trailer.trailerLocation = '';
            } else {
                this.modal.visible = true;
                this.modal.header = 'Error';
                this.modal.text = 'Trailer Already at Location. Please Select a different Location';
            }
        },
    }
}
</script>
