<template>
    <div>
       <div class="card">
        <div class="card-title">
          <div></div>
          <h4>{{ title }}</h4>
        </div>
        <div class="card-content my-4">
          <p>{{ content }}</p>
        </div>
        <div class="card-footer">
          <v-row class="align-center">
            <v-col cols="6">
              <p>{{ date }}</p>
            </v-col>
            <v-col class="text-right" cols="6">
              <v-btn color="primary" rounded="0" elevation="0" @click="deleteDialog=true">Sterge</v-btn>
            </v-col>
          </v-row>
        </div>
       </div>
       <v-dialog
       v-model="deleteDialog"
       width="600"
       >
        <v-card class="pa-5" >
          <v-card-title class="d-flex justify-space-between">
            <h2>Sterge notificare</h2>
            <v-icon icon="fas fa-times" @click="deleteDialog=false"></v-icon>
          </v-card-title>
            <v-card-text>
              <p>Esti sigur ca vrei sa stergi notificare?</p>
              <v-row class="mt-6">
                <v-col cols="6">
                  <v-btn class="btn-primary" elevation="0" rounded="0" block @click="deleteDialog = false">Nu</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block color="primary" rounded="0" elevation="0" @click="deleteNotification">Da</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
       </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
  export default{
    name: 'Card',
    props: ['title', 'content', 'date', 'id'],
    emits: ['refresh'],
    data(){
      return{
        deleteDialog: false,
      }
    },
    methods:{
      deleteNotification() {
        axios.delete('http://psyhelp-api.oldstudioconcept.ro/notificari/', {
            params: {
              id: this.id
            }
      }).then(() => {
          this.deleteDialog = false;
          this.$emit('refresh');
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: all .3s ease-in-out;
      padding: 20px;
    &:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,.1);
    }
    .card-title {
      display: flex;
      align-items: center;
      div{
        width: 8px;
        height: 8px;
        background-color: #F17422;
        border-radius: 50%;
        margin-right: 10px;
      }
      h4 {
        margin: 0;
        font-size: 22px;
        font-weight: 500;
      }
    }
    .card-content {
      p {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
    }
    .card-footer {
      p {
        margin: 0;
        font-size: 12px;
        color: #666;
      }
    }
  }
</style>

