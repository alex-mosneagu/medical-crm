<template>
    <v-container fluid class="py-5 px-6 h-100 d-flex align-center justify-center" style="background-color: #45BFB3;">
      <v-card class="mx-auto pa-12" elevation="0" width="448" rounded="lg">
        <div class="text-center">
          <img :src="logo" class="w-75" alt="">
          <h6 class="text-h6 mt-5 text-uppercase font-weight-bold">LOGIN</h6>
        </div>
        <form class="mt-10" ref="form" @submit.prevent="login()">
          <v-text-field
            v-model="username"
            name="username"
            label="Username"
            type="text"
            placeholder="username"
            required
            rounded="pill"
            variant="solo"
          ></v-text-field>
        
          <v-text-field
            v-model="password"
            name="password"
            label="Password"
            type="password"
            placeholder="password"
            required
            rounded="pill"
            variant="solo"
          ></v-text-field>
          <v-btn type="submit" block class="mt-4" elevation="0" rounded="pill" style="height: 45px" color="primary" value="log in">Login</v-btn>
        </form>
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