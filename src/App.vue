<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main> 
  </v-app>
</template>

<script>
  import { RouterView } from 'vue-router'

  export default {
    name: 'Home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
  body{
    font-family: 'Poppins', sans-serif;
  }
</style>