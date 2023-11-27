<template>
    <div>
      <v-btn color="primary" class="text-normal rounded-pill" elevation="0" @click="dialog = true">Adauga</v-btn>
      <v-dialog v-model="dialog" max-width="640px">
        <v-card>
          <v-card-title class="d-flex justify-space-between ma-4">
            <span class="text-h4">Adauga serviciu</span>
            <v-icon icon="mdi-close"></v-icon>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payload.nume"
                    label="Nume"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    type="number"
                    v-model="payload.pret"
                    label="Pret"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea 
                    v-model="payload.descriere"
                    label="Descriere"
                    required
                  ></v-textarea>
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
          payload: {
            nume: null,
            descriere: null,
            pret: null
          },
        }
      },
      methods: {
        save() {
          axios.post('https://psyhelp-api.oldstudioconcept.ro/servicii/', this.payload)
          .then((response) => {
            this.dialog = false;
            this.$emit('refresh')
          }, (error) => {
            console.log(error);
          });
        },
        close() {
          this.dialog = false;
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
    
  
  </style>