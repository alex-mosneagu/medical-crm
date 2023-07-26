<template>
    <v-container fluid class="py-5 px-6 h-100 d-flex align-center justify-center" style="background-color: #45BFB3;">
      <v-card class="mx-auto pa-12" elevation="0" width="448" rounded="lg">
        <h1 class="text-center text-h3">
          <img :src="logo" class="w-75" alt="">
          <h6 class="text-h6 text-uppercase font-weight-bold">Login</h6>
        </h1>
      </v-card>
    </v-container>
</template>
  
<script>
  import logo from '../../public/logo.png'
  export default {
    data() {
      return{
        name: 'Hello World',
        logo: logo
      }
    }
  }
</script>

<style>
  .v-field--variant-solo, .v-field--variant-solo-filled{
    box-shadow: none !important;
  }
  .v-field{
    border: 1px solid rgba(0, 0, 0, .2) !important;
  }
  input{
    font-size: 14px !important;
  }
</style>