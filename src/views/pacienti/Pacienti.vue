<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <filters @refresh="changeColumns"/>
    <h5 class="text-primary mb-4">Pacienti</h5>
    <div class="filters mb-6">
      <add @refresh="getData"/>
    </div>
    <v-row>
      <v-col v-for="pacient in pacienti" cols="3">
        <card :nume="pacient.nume" :prenume="pacient.prenume" :id="pacient.id" :adresa="pacient.adresa" :telefon="pacient.telefon" :email="pacient.email" @refresh="getData" />
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
  import axios from 'axios'
  import Sidebar from '../components/Sidebar.vue'
  import Card from './components/Card.vue';
  import Add from './components/Add.vue';
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
        pacienti: [],
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
      getData(value){
        axios.get('http://psyhelp-api.oldstudioconcept.ro/pacienti/',{
          params:{
            skip: (this.page - 1) * this.take,
            take: this.take,
          }
        })
        .then((response) => {
          this.pacienti = response.data.paginatedResults;
          this.pagination = Math.ceil(response.data.total / this.take);
        })
      }
    },
  }
</script>