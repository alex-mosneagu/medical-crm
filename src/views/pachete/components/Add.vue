<template>
    <div>
      <v-btn color="primary" class="text-normal rounded-pill" elevation="0" @click="dialog = true">Adauga</v-btn>
      <v-dialog v-model="dialog" max-width="640px">
        <v-card class="">
          <v-card-title class="d-flex justify-space-between ma-4">
            <span class="text-h4">Adauga pachet</span>
            <v-icon icon="mdi-close"></v-icon>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.denumire"
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
            <v-btn color="primary" text @click="close">Anuleaza</v-btn>
            <v-btn color="primary" text @click="save">Salveaza</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    export default {
      name: 'Add',
      data() {
        return{
          dialog: false,
          servicii: [],
          payload: {
            denumire: null,
            pret: null,
            servicii: null,
          },
        }
      },
      created(){
        this.getServicii()
      },
      methods: {
        save() {
          axios.post('http://psyhelp-api.oldstudioconcept.ro/pachete/', this.payload)
          .then(() => {
            this.dialog = false;
            this.$emit('refresh')
          }, (error) => {
            console.log(error);
          });
        },
        getServicii() {
          axios.get('http://psyhelp-api.oldstudioconcept.ro/servicii/no-pagination/')
          .then((response) => {
            this.servicii = response.data;
          }, (error) => {
            console.log(error);
          });
        },
        close() {
          this.dialog = false;
        },
        sumTotal(value){
          var total = 0
          if(value.length > 0){
            value.map((x) => {
              let item = this.servicii.find((y) => {
                return x === y.id
              })
              total += parseInt(item.pret)
            })
          }
          this.payload.pret = total
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
    
  
  </style>