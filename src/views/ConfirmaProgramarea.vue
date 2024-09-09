<template>
  <v-container>
    <v-card class="pa-5">
      <h2>Confirma programarea la clinica psyhelp</h2>
      <p>Daca aveti probleme cu confirmarea sau anularea programari ne puteti contacta la numarul <a href="tel:+40 774 027 911">+40 774 027 911</a></p>
      <v-divider class="my-5"></v-divider>
      <h4 class="mb-4"><strong>Data</strong>: {{ formattedDate }} - <strong>Ora</strong>: {{ formattedTime }}</h4>
      <v-row>
        <v-col cols="6">
          <h4 class="mb-4">Doctor</h4>
          <p class="mb-2"><strong>Nume</strong>: {{ payload?.doctor_name }}</p>
          <v-btn v-if="payload?.isConfirmed == 0" @click="confirmDialog = true" color="primary" class="text-normal w-100" elevation="0">Confirma</v-btn>
        </v-col>
        <v-col cols="6">
          <h4 class="mb-4">Pacient</h4>
          <p class="mb-2"><strong>Nume</strong>: {{ payload?.pacient_name }}</p>
          <v-btn v-if="payload?.isConfirmed == 0" @click="anuleazaDialog = true" color="secondary" class="text-normal w-100" elevation="0">Anuleaza</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-dialog
  v-model="confirmDialog"
  width="600"
  >
  <v-card class="pa-5" >
    <v-card-title class="d-flex justify-space-between">
      <h2>Confirma programarea</h2>
      <v-icon icon="fas fa-times" @click="confirmDialog=false"></v-icon>
    </v-card-title>
      <v-card-text>
        <p>Confirma programarea la clinica Psyhelp</p>
        <v-row class="mt-6">
          <v-col cols="6">
            <v-btn class="btn-primary" elevation="0" rounded="0" block @click="confirmDialog = false">Nu</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="primary" rounded="0" elevation="0" @click="confirmaEveniment">Da</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
  v-model="anuleazaDialog"
  width="600"
  >
  <v-card class="pa-5" >
    <v-card-title class="d-flex justify-space-between">
      <h2>Anuleaza programarea</h2>
      <v-icon icon="fas fa-times" @click="anuleazaDialog=false"></v-icon>
    </v-card-title>
      <v-card-text>
        <p>Anuleaza programarea la clinica Psyhelp</p>
        <v-row class="mt-6">
          <v-col cols="6">
            <v-btn class="btn-primary" elevation="0" rounded="0" block @click="anuleazaDialog = false">Nu</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="primary" rounded="0" elevation="0" @click="anuleazaEveniment">Da</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      payload: null,
      confirmDialog: false,
      anuleazaDialog: false
    }
  },
  created(){
    this.getData();
  },
  computed: {
    formattedDate() {
      const date = new Date(this.payload?.start);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    formattedTime() {
      const date = new Date(this.payload?.start);

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    }
  },
  methods: {
    getData() {
      axios.get('https://api.clinicapsyhelp.ro//evenimente/single/', {
        params: {
          id: this.$route.params.id
        }
      }).then((response) => {
        this.payload = response.data
      })
    },
    confirmaEveniment() {
      axios.post('https://api.clinicapsyhelp.ro//evenimente/confirma/', {
          id: this.$route.params.id
      }).then(() => {
        this.getData();
        this.confirmDialog = false
      })
    },
    anuleazaEveniment() {
      axios.post('https://api.clinicapsyhelp.ro//evenimente/anuleaza/', {
          id: this.$route.params.id
      }).then(() => {
        this.getData();
        this.anuleazaDialog = false
      })
    }
  }
}
</script>