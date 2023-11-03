<template>
  <sidebar />
    <section class="container-hero">
      <navbar />
      <filters />
      <v-row>
        <v-col v-for='notifcare in notificari' cols="6">
          <card :title="notifcare.location" :content="notifcare.content" :date="notifcare.created_at" :id="notifcare.id" @refresh="getData"/>
        </v-col>
      </v-row> 
    </section>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Filters from '../components/Filters.vue';
import Card from './components/Card.vue';

export default{
  components: {
    Sidebar,
    Navbar,
    Filters,
    Card,
  },
  data(){
    return{
      notificari: [],
      take: 8,
      page: 1,
      pagination: null,
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      axios.get('https://psyhelp-api.oldstudioconcept.ro/',
      {
        params: {
          skip: (this.page - 1) * this.take,
          take: this.take,
        }     
      })
      .then((response)=>{
        this.notificari = response.data.paginatedResults
        this.pagination = Math.ceil(response.data.total / this.take)
      })
    }
  },
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