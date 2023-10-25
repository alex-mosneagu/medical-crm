<template>
    <sidebar />
    <section class="container-hero">
      <navbar />
      <v-expansion-panels variant="accordion">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default="{expanded}">
              <h5>Account details</h5>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-form>
              <v-text-field
                label="First name"
                required
                >
            </v-text-field>
            <v-text-field
                label="Last name"
                required
                >
            </v-text-field>
            <v-text-field
                label="Email"
                required
                >
            </v-text-field>
            <v-btn type="submit" class="">Save new changes</v-btn>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
              <template v-slot:default="{expanded}">
                <h5>Security</h5>
              </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                label="Current password"
                type="password"
                required
                >
            </v-text-field>
            <v-text-field
                label="New password"
                type="password"
                required
                >
            </v-text-field>
            <v-text-field
                label="Confirm new password"
                type="password"
                required
                >
            </v-text-field>
            <v-btn type="submit" class="">Save new changes</v-btn>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>
    
</template>

<script>

  import Sidebar from '../components/Sidebar.vue'
  import Navbar from '../components/Navbar.vue'
  export default {
    name: 'Profile',
    components: {
      Sidebar,
      Navbar
    },
    data() {
      return{
          
      }
    }
  }
</script>

<style>

</style>