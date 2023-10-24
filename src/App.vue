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
      }
    }
  }
</script>

<style>
  body{
    font-family: 'Poppins', sans-serif;
  }
  .container-hero{
    margin: 10px;
    width: calc(100% - 310px);
    margin-left: auto;
  }

  .text-normal {
    text-transform: unset !important;
  }
</style>