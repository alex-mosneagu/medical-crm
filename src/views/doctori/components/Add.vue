<template>
  <div>
    <v-btn color="primary" class="text-normal rounded-pill" elevation="0" @click="dialog = true">Adauga</v-btn>
    <v-dialog v-model="dialog" max-width="640px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Adauga doctor</span>
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
                  v-model="payload.prenume"
                  label="Prenume"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.specializare"
                  label="Specializare"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.adresa"
                  label="Adresa"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.telefon"
                  label="Telefon"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.email"
                  label="Email"
                  required
                ></v-text-field>
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
          prenume: null,
          specializare: null,
          adresa: null,
          telefon: null,
          email: null,
        },
      }
    },
    methods: {
      save() {
        axios.post('https://psyhelp-api.oldstudioconcept.ro/', this.payload)
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