<template>
  <div class="dashboard">
    <div class="container">
      <label>section</label>
      <select class="form-control" v-model="section" id="section dropdownMenuOffset">
          <option v-for="section in 3" :key="section">{{ section }}</option>
      </select>
    </div>
    <div v-if="section == '1'">
      <DockLayout :sectionArray="sectionOne"/>
    </div>
    <div v-if="section == '2'">
      <DockLayout :sectionArray="sectionTwo"/>
    </div>
    <div v-if="section == '3'">
      <DockLayout :sectionArray="sectionThree"/>
    </div>
  </div>
</template>

<script>

  import DockLayout from '@/components/DockLayout.vue'

  export default {
    name: 'dashboard',
    data: () => ({
      section: '',
      sectionOne: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      sectionTwo: [18,19,20,21,22,23,24,25],
      sectionThree: [26,27,28,29,30,31,32,33,34,35,36],
    }),
    components: {
      DockLayout
    },
    computed: {
      trailers(){
        return this.$store.state.trailers
      }
  },
    name: 'home',
  }
</script>
