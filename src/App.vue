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
  a{
    text-decoration: none !important;
  }
  .container-hero{
    margin: 10px;
    width: calc(100% - 310px);
    margin-left: auto;
  }
  @media all and (max-width: 780px){
    .container-hero{
      width: 100%;
      padding: 20px;
      padding-top: 110px;
    }
  }
  .c-pointer{
    cursor: pointer;
  }
  .text-normal {
    text-transform: unset !important;
  }
</style>