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
  import axios from 'axios'
  import Sidebar from '../components/Sidebar.vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import listPlugin from '@fullcalendar/list'
  import Navbar from '../components/Navbar.vue'


  export default {
    name: 'Programari',
    components: {
      Sidebar,
      FullCalendar,
      Navbar
    },
    data() {
      return{
        events: [
          {
            title: 'All Day Event',
            start: '2023-10-28',
            backgroundColor: '#378006',
            borderColor: '#378006'
          }
        ],
        calendarOptions: {
          locale: 'ro',
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'title',
            right: 'timeGridDay,dayGridWeek,dayGridMonth'
          },
          buttonText: {
            today: 'Astazi',
            day: 'Azi',
            week:'Saptamana',
            month:'Luna'
          },
          selectable: true,
          editable: true,
          events: this.events,
          select: (arg) => {
            const cal = arg.view.calendar
            cal.unselect()
            cal.addEvent({
              title: 'New Event',
              start: arg.start,
              end: arg.end,
              allDay: arg.allDay,
              backgroundColor: '#ccc',
              borderColor: '#ccc'
            })
            this.addEvent(arg)
          },
          eventClick: (arg) => {
            console.log(arg.event)
          },
          eventDrop: (arg) => {
            alert(arg.event.title + " was dropped on " + arg.event.start)
          },
          eventResize: (arg) => {
            alert(arg.event.title + " was resized to " + arg.event.end)
          }
        }
      }
    },
    created(){
      this.getData();
    },
    methods: {
      addEvent(data) {
        console.log(data)
        let payload = {
          title: 'New event',
          start: data.startStr,
          end: data.endStr,
          allDay: data.allDay,
          backgroundColor: '#378006',
          borderColor: '#378006'
        }
        axios.post('http://192.168.1.130/api/evenimente/', payload)
      },
      getData(){
        axios.get('http://192.168.1.130/api/evenimente/')
        .then((response) => {
          this.calendarOptions.events = response.data;
          console.log(this.calendarOptions.events)
        })
      }
    }
  }
</script>


<style lang="scss">
  .fc-daygrid-event-harness a{
    padding: 7px 10px;
    font-size: 12px;
    border-radius: 25px;
  }
  .fc-toolbar-chunk:nth-child(3){
    button{
      border: 1px solid #ccc !important;
      height: 40px !important;
      font-size: 13px !important;
      min-width: 90px;
      padding: 0px 15px;
      background-color: #fff !important;
      color: #000 !important;
      outline: 0 !important;
      min-width: 90px;
      &:first-child{
        border-radius: 15px 0 0 15px !important;
      }
      &:last-child{
        border-radius: 0 15px 15px 0 !important;
      }
      &.fc-button-active{
        background-color: #F17422 !important;
        color: #fff !important;
        border-color: #F17422 !important;
      }
      &:focus{
        box-shadow: none !important;
      }
    }
  }
</style>