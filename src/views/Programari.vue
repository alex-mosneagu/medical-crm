<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <h5 class="text-primary ">Programari</h5>
    <FullCalendar 
    :options='calendarOptions'
    />
  </section>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import listPlugin from '@fullcalendar/list'
  import Navbar from './components/Navbar.vue'


  export default {
    name: 'Programari',
    components: {
      Sidebar,
      FullCalendar,
      Navbar
    },
    data() {
      return{
        calendarOptions: {
          locale: 'ro',
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: '',
            center: 'title',
            right: 'timeGridDay, dayGridWeek, dayGridMonth'
          },
          selectable: true,
          events: [
            { title: 'Progrmare 1', start: new Date() }
          ]
        }
      }
    }
  }
</script>