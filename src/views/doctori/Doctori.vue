<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <filters />
    <h5 class="text-primary mb-4">Doctori</h5>
    <div class="filters mb-6">
      <add @refresh="getData" />
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
  import Navbar from '../components/Navbar.vue'
  import Filters from '../components/Filters.vue';
  export default {
    name: 'Programari',
    components: {
      Sidebar,
      Card,
      Add,
      Navbar,
      Filters
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
        axios.get('http://192.168.1.130/api/doctori/')
        .then((response) => {
          this.doctori = response.data;
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>