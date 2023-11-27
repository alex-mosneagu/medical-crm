<template>
    <sidebar />
    <section class="container-hero">
      <navbar />
      <h5 class="text-primary mb-4">Pachete</h5>
        <div class="filters mb-6">
          <add @refresh="getData" />
        </div>
        <v-row>
          <v-col v-for="pachet in pachete" cols="3">
            <card :nume="pachet.nume" prenume="" :id="pachet.id" :specializare="pachet.pret" email="doctor.email" telefon="doctor.telefon" adresa="doctor.adresa" @refresh="getData"/>
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
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Card from './components/Card.vue';
import Add from './components/Add.vue';
export default{
  name: 'Servicii',
  components: {
      Sidebar,
      Navbar,
      Card,
      Add
  },
  data() {
    return {
      pachete: [],
      pagination: null,
      page: 1,
      take: 8,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('http://psyhelp-api.oldstudioconcept.ro/pachete/',
      {
        params:{
          skip: (this.page - 1) * this.take,
          take: this.take,
        }
      }
      )
      .then((response) => {
        this.pachete = response.data.paginatedResults;
        this.pagination = Math.ceil(response.data.total / this.take);
      }, (error) => {
        console.log(error);
      });
    },
  }
}
</script>