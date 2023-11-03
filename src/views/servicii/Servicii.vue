<template>
    <sidebar />
    <section class="container-hero">
        <navbar />
        <v-row>
        <v-col v-for='notifcare in notificari' cols="6">
          <card :title="notifcare.location" :content="notifcare.content" :date="notifcare.created_at" :id="notifcare.id" @refresh="getData"/>
        </v-col>
      </v-row> 
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Card from './components/Card.vue';
export default{
    name: 'Servicii',
    components: {
        Sidebar,
        Navbar,
        Card
    },
    data(){
    return{
      notificari: [],
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