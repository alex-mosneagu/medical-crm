<template>
  <sidebar />
    <section class="container-hero">
      <navbar />
      <filters />
      <div class="table">
        <v-table>
        <thead>
          <tr>
            <th><strong>Doctor</strong></th>
            <th><strong>File</strong></th>
            <th><strong>Time</strong></th>
            <th class="text-center"><strong>Action</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><h4>Dr. John Doe</h4></td>
            <td>File.pdf</td>
            <td>12:00</td>
            <td>
              <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
            </td>
          </tr>
          <tr>
            <td><h4>Dr. John Doe</h4></td>
            <td>File.pdf</td>
            <td>12:00</td>
            <td>
              <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
            </td>
          </tr>
          <tr>
            <td><h4>Dr. John Doe</h4></td>
            <td>File.pdf</td>
            <td>12:00</td>
            <td>
              <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      </div>
      
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Filters from '../components/Filters.vue';
export default{
  components: {
    Sidebar,
    Navbar,
    Filters
  }
}
</script>
<style scoped>

</style>