<template>
  <div>
    <v-btn color="primary" class="text-normal rounded-pill" elevation="0" @click="dialog = true">Adauga</v-btn>
    <v-dialog v-model="dialog" max-width="640px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Adauga Staff</span>
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
                <v-select
                  v-model="payload.specializare"
                  label="Specializare"
                  required
                  :items="specializari"
                  item-title="nume"
                  item-value="id"
                ></v-select>
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
              <v-col cols="12">
                <v-text-field v-model="color" v-mask="mask" hide-details class="ma-0 pa-0" solo>
                  <template v-slot:append>
                    <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                      <template v-slot:activator="{ on }">
                        <div @click="menu = !menu" :style="swatchStyle" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="color" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
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
        color: '#1976D2FF',
        mask: '!#XXXXXXXX',
        menu: false,
        specializari: [
          {
            id: 1,
            nume: "Psiholog"
          },
          {
            id: 2,
            nume: "Psihiatru"
          }
        ]
      }
    },
    computed: {
      swatchStyle() {
        const { color, menu } = this
        return {
          backgroundColor: color,
          cursor: 'pointer',
          height: '30px',
          width: '30px',
          borderRadius: menu ? '50%' : '4px',
          transition: 'border-radius 200ms ease-in-out'
        }
      }
    },
    methods: {
      save() {
        axios.post('https://psyhelp-api.oldstudioconcept.ro/doctori/', this.payload)
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