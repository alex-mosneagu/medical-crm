<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Închide
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { RouterView } from 'vue-router'

  export default {
    name: 'Home',
    data() {
      return {
        snackbar: {
          show: false,
          message: '',
          color: 'success',
          timeout: 3000
        }
      }
    },
    mounted() {
      // In Vue 3, we need to use the mitt instance methods directly
      // The $root.$on was configured in main.js to use emitter.on
      if (this.$root && this.$root.$on) {
        this.$root.$on('notify', (data) => {
          this.snackbar.message = data.message;
          this.snackbar.color = data.type === 'error' ? 'error' : 'success';
          this.snackbar.show = true;
        });
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