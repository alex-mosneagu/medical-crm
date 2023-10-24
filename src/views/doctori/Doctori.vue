<template>
  <sidebar />
dsa
  <section class="container-hero">
    <h5 class="text-primary mb-4">Doctori</h5>
    <div class="filters mb-6">
      <add />
    </div>
    <v-row>
      <v-col v-for="doctor in doctori" cols="3">
        <card :nume="doctor.nume" :prenume="doctor.prenume" :id="doctor.id" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  import Sidebar from '../components/Sidebar.vue'
  import Card from './components/Card.vue';
  import Add from './components/Add.vue';
  import axios from 'axios'

  export default {
    name: 'Programari',
    components: {
      Sidebar,
      Card,
      Add
    },
    data() {
      return{
        doctori: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get('http://localhost/api/doctori/')
        .then((response) => {
          this.doctori = response.data;
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>