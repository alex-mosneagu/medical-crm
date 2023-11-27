<template>
    <sidebar />
    <section class="container-hero">
        <navbar />
        <h5 class="text-primary mb-4">Servicii</h5>
        <div class="filters mb-6">
          <add @refresh="getData" />
        </div>
        <v-row>
          <v-col v-for="serviciu in servicii" :key="serviciu.id" cols="6">
            <card :title="serviciu.nume" :content="serviciu.descriere" :date="serviciu.pret" :id="serviciu.id" @refresh="getData"/>
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
  data(){
    return{
      servicii: [],
      pagination: null,
      page: 1,
      take: 8,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changePage(value){
      this.page = value;
      this.getData();
    },
    getData() {
      axios.get('http://psyhelp-api.oldstudioconcept.ro/servicii/',
      {
        params:{
          skip: (this.page - 1) * this.take,
          take: this.take,
        }
      }
      )
      .then((response) => {
        this.servicii = response.data.paginatedResults;
        this.pagination = Math.ceil(response.data.total / this.take);
      }, (error) => {
        console.log(error);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .table{
    border: 1px solid rgba( 0, 0, 0, .1);
    border-radius: 8px;
    table{
      tbody{
        tr{
          td{
            font-size: 14px;
          }
        }
      }
    }
  }
</style>