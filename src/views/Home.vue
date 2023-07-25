<template>
    <v-container fluid class="py-5 px-6 h-100 d-flex align-center justify-center" style="background-color: #45BFB3;">
      <v-card class="mx-auto pa-12" elevation="0" width="448" rounded="lg">
        <h1 class="text-center text-h3">PsyHelp</h1>
      </v-card>
    </v-container>
</template>
  
<script>
  export default {
    data() {
      return{
        name: 'Hello World'
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