<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <h5 class="text-primary mb-4">Istoric Doctor</h5>
    <div class="filters d-flex">
      <div class="form-element">
        <label for="">De la</label>
        <input type="date">
      </div>
      <div class="form-element">
        <label for="">Pana la</label>
        <input type="date">
      </div>
      <div class="form-element">
        <label for="">Serviciu</label>
        <select v-model="serviciuFilter" name="serviciuFilter" id="serviciuFilter" @change="getEventsFilter">
          <option value="0">Toate Serviciile</option>
          <option v-for="item in servicii" :value="item.id">{{ item.nume }}</option>
        </select>
      </div>
    </div>
    <v-table>
      <thead>
        <tr>
          <th>#</th>
          <th>Pacient</th>
          <th>Serviciu</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mosneagu Alex</td>
          <td>CDP</td>
          <td>29/06/2024 11:00:00</td>
        </tr>
      </tbody>
    </v-table>
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
        servicii: [],
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
        axios.get('https://api.clinicapsyhelp.ro/doctori/',
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
        axios.get('https://api.clinicapsyhelp.ro/servicii/',
        {
          params:{
            skip: 0,
            take: 200,
          }
        }
        )
        .then((response) => {
          this.servicii = response.data.paginatedResults;
        }, (error) => {
          console.log(error);
        });
      },
    }
  }
</script>