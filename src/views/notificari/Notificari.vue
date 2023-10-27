<template>
  <sidebar />
    <section class="container-hero">
      <navbar />
      <filters />
      <div class="table pa-4">
        <v-table>
          <thead>
            <tr>
              <th><strong>Doctor</strong></th>
              <th class="text-center"><strong>File</strong></th>
              <th class="text-center"><strong>Time</strong></th>
              <th class="text-center"><strong>Action</strong></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h4>Dr. John Doe</h4></td>
              <td class="text-center">File.pdf</td>
              <td class="text-center">12:00</td>
              <td>
                <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
              </td>
              <td>
                <v-icon icon="fas fa-bars"></v-icon>
              </td>
            </tr>
            <tr>
              <td><h4>Dr. John Doe</h4></td>
              <td class="text-center">File.pdf</td>
              <td class="text-center">12:00</td>
              <td>
                <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
              </td>
              <td>
                <v-icon icon="fas fa-bars"></v-icon>
              </td>
            </tr>
            <tr>
              <td><h4>Dr. John Doe</h4></td>
              <td class="text-center">File.pdf</td>
              <td class="text-center">12:00</td>
              <td>
                <v-btn class="btn-primary" elevation="0" rounded="0" block>Vezi rezultate</v-btn>
              </td>
              <td>
                <v-icon icon="fas fa-bars"></v-icon>
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
<style lang="scss" scoped>
  .table{
    border: 1px solid rgba( 0, 0, 0, .1);
    border-radius: 8px;
    table{
      thead{
        th{
        }
      }
      tbody{
        tr{
          td{
            font-size: 14px;
          }
        }
      }
    }
  }
</style>