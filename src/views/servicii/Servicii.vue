<template>
    <sidebar />
    <section class="container-hero">
        <navbar />
        <h5 class="text-primary mb-4">Servicii</h5>
        <div class="filters mb-6">
          <add @refresh="getData" />
        </div>
        <v-row>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="2" @refresh="getData"/>
          </v-col>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="3" @refresh="getData"/>
          </v-col>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="3" @refresh="getData"/>
          </v-col>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="3" @refresh="getData"/>
          </v-col>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="3" @refresh="getData"/>
          </v-col>
          <v-col cols="6">
          <card title="Title" content="content" date="07/06/2023" id="3" @refresh="getData"/>
          </v-col>
      </v-row> 
    </section>
</template>

<script>
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