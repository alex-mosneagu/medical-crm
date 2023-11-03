<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <filters @refresh="changeColumns"/>
    <h5 class="text-primary mb-4">Doctori</h5>
    <div class="filters mb-6">
      <add @refresh="getData" />
    </div>
    <v-row>
      <v-col v-for="doctor in doctori" cols="3">
        <card :nume="doctor.nume" :prenume="doctor.prenume" :id="doctor.id" :specializare="doctor.specializare" :email="doctor.email" :telefon="doctor.telefon" :adresa="doctor.adresa" @refresh="getData"/>
        
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="pagination"
      rounded="circle"
      color="primary"
      @update:modelValue="changePage"
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
    emits: ['refresh'],
    data() {
      return{
        doctori: [],
        pagination: null,
        page: 1,
        take: 8,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      changePage(value){
        this.page = value;
        this.getData();
      },
      changeColumns(value){
        this.page = 1;
        this.take = value;
        this.getData();
      },
      getData(value) {
        axios.get('https://psyhelp-api.oldstudioconcept.ro/',
        {
          params:{
            skip: (this.page - 1) * this.take,
            take: this.take,
          }
        }
        )
        .then((response) => {
          this.doctori = response.data.paginatedResults;
          this.pagination = Math.ceil(response.data.total / this.take);
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>