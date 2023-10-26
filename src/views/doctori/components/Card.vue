<template>
  <div>
    <div class="card">
      <div class="options">
        <v-menu>
          <template v-slot:activator="{props}">
            <v-btn 
            v-bind="props"
            icon elevation="0">
              <i class="fas fa-ellipsis-h"></i>
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="c-pointer">
              <v-list-item-title>
                Editeaza
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="c-pointer" @click="dialog=true">
              <v-list-item-title>
                Sterge
            </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
  <v-dialog
      v-model="dialog"
      width="600"
    >
    <v-card class="pa-5" >
      <v-card-title class="d-flex justify-space-between">
        <h2>Sterge doctor</h2>
        <v-icon icon="fas fa-times" @click="dialog=false"></v-icon>
      </v-card-title>
        <v-card-text>
          <p>Esti sigur ca vrei sa stergi doctorul {{nume}} {{prenume}} ?</p>
          <v-row class="mt-6">
            <v-col cols="6">
              <v-btn class="btn-primary" elevation="0" rounded="0" block @click="dialog = false">Nu</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="primary" rounded="0" elevation="0" @click="delete">Da</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'Card',
    props: ['nume', 'prenume', 'id'],
    data() {
      return{
        dialog: false,
      }
    },
    methods:{
      delete(){
        this.dialog = false;
        this.$emit('refresh');
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
  }
  .btn-primary{
    border: 1px solid rgba(0, 0, 0, .3);
  }
</style>