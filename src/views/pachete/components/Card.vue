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
              <v-list-item class="c-pointer" @click="editDialog=true">
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
        <p class="nume-pacient text-center font-weight-bold text-subtitle-1">{{ nume }}</p>
        <p class="text-center text-primary text-1 text-body-2">{{ pret }} RON</p>
        <v-divider class="my-6 mb-8"></v-divider>
        <v-btn block color="secondary" class="text-white rounded-pill" elevation="0" @click="infoDialog = true">Informatii</v-btn>
      </div>
    </div>
    <v-dialog
        v-model="dialog"
        width="600"
      >
      <v-card class="pa-5" >
        <v-card-title class="d-flex justify-space-between">
          <h2>Sterge pachet</h2>
          <v-icon icon="fas fa-times" @click="dialog=false"></v-icon>
        </v-card-title>
          <v-card-text>
            <p>Esti sigur ca vrei sa stergi pachetul {{nume}} ?</p>
            <v-row class="mt-6">
              <v-col cols="6">
                <v-btn class="btn-primary" elevation="0" rounded="0" block @click="dialog = false">Nu</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="primary" rounded="0" elevation="0" @click="deletePachet">Da</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="editDialog"
        width="600"
      >
      <v-card class="pa-5">
        <v-card-title class="d-flex justify-space-between">
          <h2>Editeaza pachet</h2>
          <v-icon icon="fas fa-times" @click="editDialog=false"></v-icon>
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.nume"
                    label="Denumire"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.pret"
                    label="Pret"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    multiple
                    v-model="payload.servicii"
                    label="servicii"
                    required
                    :items="servicii"
                    item-title="nume"
                    item-value="id"
                    @update:modelValue="sumTotal"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editDialog = false">Anuleaza</v-btn>
          <v-btn color="primary" text @click="edit">Salveaza</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
      <v-dialog
        v-model="infoDialog"
        width="600"
      >
      <v-card class="pa-5">
        <v-card-title class="d-flex justify-space-between">
          <h2>Informatii pachet</h2>
          <div class="c-pointer" @click="infoDialog=false">x</div>
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.nume"
                    label="Denumire"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.pret"
                    label="Pret"
                    readonly
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    multiple
                    v-model="payload.servicii"
                    label="servicii"
                    required
                    :items="servicii"
                    item-title="nume"
                    item-value="id"
                    @update:modelValue="sumTotal"
                    readonly
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
        </v-card-text>
      </v-card>
      </v-dialog>
  </template>
  
  <script>
  import axios from 'axios'
    export default {
      name: 'Card',
      props: ['nume', 'pret', 'serviciiProp', 'id'],
      data() {
        return{
          dialog: false,
          editDialog: false,
          servicii: [],
          infoDialog: false,
          payload: {
            id: this.id,
            nume: this.nume,
            pret: this.pret,
            servicii: this.serviciiProp
          }
        }
      },
      created() {
        this.getServicii()
      },
      methods:{
        edit(){
          axios.put('https://api.clinicapsyhelp.ro/pachete/', {
              id: this.id,
              nume: this.payload.nume,
              pret: this.payload.pret,
              servicii: this.payload.servicii
          }) .then(() => {
            this.editDialog = false;
            this.$emit('refresh');
          })
        },
        deletePachet(){
          axios.delete('https://api.clinicapsyhelp.ro/pachete/', {
            params:{
              id: this.id
            }
          }).then(() => {
            this.dialog = false;
            this.$emit('refresh');
          })
        },
        getServicii() {
          axios.get('https://api.clinicapsyhelp.ro/servicii/no-pagination/')
          .then((response) => {
            this.servicii = response.data;
          }, (error) => {
            console.log(error);
          });
        },
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