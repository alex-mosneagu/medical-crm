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
      <p class="nume-pacient text-center font-weight-bold text-subtitle-1">{{ nume }} {{ prenume }}</p>
      <p class="text-center text-primary text-1 text-body-2">
        <span v-if="specializare == 1">
          Psiholog
        </span>
        <span v-else>
          Psihiatru
        </span>
      </p>
      <v-divider class="my-6 mb-8"></v-divider>
      <v-btn block class="mb-4 rounded-pill btn-primary" elevation="0">Programari</v-btn>
      <v-btn :to="'/staff/' + id" block color="secondary" class="text-white rounded-pill" elevation="0">Istoric</v-btn>
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
              <v-btn block color="primary" rounded="0" elevation="0" @click="deleteDoctor">Da</v-btn>
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
        <h2>Editeaza staff</h2>
        <v-icon icon="fas fa-times" @click="editDialog=false"></v-icon>
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
          <v-row>
            <v-col cols="6">
              <v-btn class="btn-primary" elevation="0" rounded="0" block @click="editDialog = false">Anuleaza</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="primary" rounded="0" elevation="0" @click="editDoctor">Salveaza</v-btn>
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
    props: ['nume', 'prenume', 'id', 'specializare', 'adresa', 'telefon', 'email'],
    data() {
      return{
        dialog: false,
        editDialog: false,
        payload: {},
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
    created() {
      console.log(this.specializare)
      this.payload.nume = this.nume
      this.payload.prenume = this.prenume
      this.payload.specializare = parseInt(this.specializare)
      this.payload.adresa = this.adresa
      this.payload.telefon = this.telefon
      this.payload.email = this.email
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
      },
    },
    methods:{
      editDoctor(){
        axios.put('https://psyhelp-api.oldstudioconcept.ro/staff', {
            id: this.id,
            nume: this.payload.nume,
            prenume: this.payload.prenume,
            specializare: this.payload.specializare,
            adresa: this.payload.adresa,
            telefon: this.payload.telefon,
            email: this.payload.email,

        }) .then(() => {
          this.editDialog = false;
          this.$emit('refresh');
        })
      },
      deleteDoctor(){
        axios.delete('https://psyhelp-api.oldstudioconcept.ro/staff', {
          params:{
            id: this.id
          }
        }).then(() => {
          this.dialog = false;
          this.$emit('refresh');
        })
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