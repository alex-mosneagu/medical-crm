<template>
  <div>
    <v-btn color="primary" class="text-normal rounded-pill" elevation="0">Adauga</v-btn>
    <v-dialog v-model="dialog" max-width="640px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Adauga pacient</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="nume"
                  label="Nume"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="prenume"
                  label="Prenume"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="prenume"
                  label="Prenume"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="telefon"
                  label="Telefon"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="email"
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
  export default {
    name: 'Add',
    data() {
      return{
        dialog: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  

</style>