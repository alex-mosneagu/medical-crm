<template>
    <sidebar />
    <section class="container-hero">
      <navbar />
      <h5 class="text-primary mb-4">Pachete</h5>
        <div class="filters mb-6">
          <add @refresh="getData" />
        </div>
        <v-row>
          <v-col v-for="doctor in doctori" cols="3">
            <card :nume="doctor.nume" :prenume="doctor.prenume" :id="doctor.id" :specializare="doctor.specializare" :email="doctor.email" :telefon="doctor.telefon" :adresa="doctor.adresa" @refresh="getData"/>
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
    }
}</script>