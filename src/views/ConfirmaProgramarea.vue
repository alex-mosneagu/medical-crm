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
          <v-btn v-if="payload?.isConfirmed == 0" @click="confirmaEveniment" color="primary" class="text-normal w-100" elevation="0">Confirma</v-btn>
        </v-col>
        <v-col cols="6">
          <h4 class="mb-4">Pacient</h4>
          <p class="mb-2"><strong>Nume</strong>: {{ payload?.pacient_name }}</p>
          <v-btn v-if="payload?.isConfirmed == 0" @click="anuleazaEveniment" color="secondary" class="text-normal w-100" elevation="0">Anuleaza</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      payload: null
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
      axios.get('https://psyhelp-api.oldstudioconcept.ro/evenimente/single/', {
        params: {
          id: this.$route.params.id
        }
      }).then((response) => {
        this.payload = response.data
      })
    },
    confirmaEveniment() {
      axios.post('https://psyhelp-api.oldstudioconcept.ro/evenimente/confirma/', {
          id: this.$route.params.id
      }).then(() => {
        this.getData();
      })
    },
    anuleazaEveniment() {
      axios.post('https://psyhelp-api.oldstudioconcept.ro/evenimente/anuleaza/', {
          id: this.$route.params.id
      }).then(() => {
        this.getData();
      })
    }
  }
}
</script>