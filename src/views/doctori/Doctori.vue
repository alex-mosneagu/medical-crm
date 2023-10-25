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
    <v-pagination
      v-model="page"
      :length="pagination"
      rounded="circle"
      color="primary"
      @update:modelValue="getData"
    ></v-pagination>
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
        doctori: [],
        pagination: null,
        page: 1,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get('http://192.168.1.130/api/doctori/',
        {
          params:{
            skip: (this.page - 1) * 8,
            take: 8,
          }
        }
        )
        .then((response) => {
          this.doctori = response.data.paginatedResults;
          this.pagination = Math.ceil(response.data.total / 8);
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>