<template>
  <div>
    <div class="card">
      <div class="options">
        <v-btn icon elevation="0">
          <i class="fas fa-ellipsis-h"></i>
        </v-btn>
      </div>
      <div class="image mb-4">
        <img src="https://via.placeholder.com/150" alt="">
      </div>
      <p class="nume-pacient text-center font-weight-bold text-subtitle-1">{{ nume }} {{ prenume }}</p>
      <v-divider class="my-6 mb-8"></v-divider>
      <v-btn block class="mb-4 rounded-pill btn-primary" elevation="0">Programari</v-btn>
      <v-btn block color="secondary" class="text-white rounded-pill" elevation="0">Informatii</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['nume', 'prenume', 'id'],
    data() {
      return{
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-white{
    color: white !important;
  }

  .card{
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 20px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 20px;
    .options{
      position: absolute;
      right: 20px;
      top: 10px;
    }
    .image{
      text-align: center;
      img{
        border-radius: 50%;
        border: 2px solid silver;
      }
    }
    .btn-primary{
      border: 1px solid rgba(0, 0, 0, .3);
    }
  }
</style>