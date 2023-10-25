<template>
  <sidebar />
  <section class="container-hero">
    <navbar />
  </section>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import Navbar from './components/Navbar.vue'
  export default {
    name: 'Dashboard',
    components: {
      Sidebar,
      Navbar
    },
    data() {
      return{
          
      }
    }
  }
</script>