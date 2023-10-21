<template>
  <sidebar />

  <section class="container-hero">
    <h5 class="text-primary mb-4">Pacienti</h5>
    <div class="filters mb-6">
      <add />
    </div>
    <v-row>
      <v-col cols="3">
        <card />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  import Sidebar from '../components/Sidebar.vue'
  import Card from './components/Card.vue';
  import Add from './components/Add.vue';

  export default {
    name: 'Programari',
    components: {
      Sidebar,
      Card,
      Add
    },
    data() {
      return{
        
      }
    }
  }
</script>