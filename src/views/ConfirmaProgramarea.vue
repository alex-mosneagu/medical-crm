<template>
  <v-container>
    <v-card class="pa-5">
      <h2>Confirma programarea la clinica psyhelp</h2>
      <p>Daca aveti probleme cu confirmarea sau anularea programari ne puteti contacta la numarul <a href="tel:+40 774 027 911">+40 774 027 911</a></p>
      <v-divider class="my-5"></v-divider>
      <h4 class="mb-4"><strong>Data</strong>: 29/06/2024 - <strong>Ora</strong>: 14:00</h4>
      <v-row>
        <v-col cols="6">
          <h4 class="mb-4">Doctor</h4>
          <p class="mb-2"><strong>Nume</strong>: Coman Elemena</p>
          <p class="mb-6"><strong>Serviciul</strong>: Psihologie</p>
          <v-btn color="primary" class="text-normal w-100" elevation="0">Confirma</v-btn>
        </v-col>
        <v-col cols="6">
          <h4 class="mb-4">Pacient</h4>
          <p class="mb-2"><strong>Nume</strong>: Alex Mosneagu</p>
          <p class="mb-6"><strong>Cata Nasteri</strong>: 23/11/1999</p>
          <v-btn color="secondary" class="text-normal w-100" elevation="0">Anuleaza</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>