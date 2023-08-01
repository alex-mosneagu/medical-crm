<template>
  <sidebar />

  <section class="container-hero">
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


  export default {
    name: 'Programari',
    components: {
      Sidebar,
      FullCalendar
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
        }
      }
    }
  }
</script>