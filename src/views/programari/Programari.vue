<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <h5 class="text-primary ">Programari</h5>
    <FullCalendar 
    :options='calendarOptions'
    />
    <v-dialog
    v-model="dialog"
    width="600"
    @update:modelValue="close"
    >
    <v-card class="pa-5">
      <v-card-title class="d-flex justify-space-between">
        <h2>Adauga eveniment</h2>
        <v-icon icon="mdi-close" @click="close"></v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="payload.title"
                  label="Title"
                  required
                ></v-text-field>
                <v-select
                  v-model="payload.categorie"
                  label="Categorie"
                  required
                  :items="categorii"
                  item-title="nume"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col v-if="payload.allDay" cols="6">
                <v-text-field
                  v-model="payload.start"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
              <v-col v-if="payload.allDay" cols="6">
                <v-text-field
                  v-model="payload.end"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
              <v-col v-if="!payload.allDay" cols="6">
                <v-text-field
                  v-model="payload.start"
                  type="datetime-local"
                  required
                ></v-text-field>
              </v-col>
              <v-col v-if="!payload.allDay" cols="6">
                <v-text-field
                  v-model="payload.end"
                  type="datetime-local"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="payload.allDay" label="All day"></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn class="btn-primary" elevation="0" rounded="0" block @click="close">Anuleaza</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" elevation="0" rounded="0" block @click="save">Salveaza</v-btn>
              </v-col>
            </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
    <v-dialog 
      width="600"
      v-model="viewDialog"
    >
    <v-card class="pa-5">
      <v-card-title class="d-flex justify-space-between">
        <h2>{{ viewData.title }}</h2>
        <v-icon icon="mdi-close" @click="viewDialog= false"></v-icon>
      </v-card-title>
      <v-card-text>
        <p>{{ viewData.start }} - {{ viewData.end }}</p>
      </v-card-text>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn class="btn-primary" elevation="0" rounded="0" block @click="close">Editeaza</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" elevation="0" rounded="0" block @click="stergeEvent= true">Sterge</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="stergeEvent"
      width="600"
    >
    <v-card class="pa-5" >
      <v-card-title class="d-flex justify-space-between">
        <h2>Sterge eveniment</h2>
        <v-icon icon="fas fa-times" @click="stergeEvent=false"></v-icon>
      </v-card-title>
        <v-card-text>
          <p>Esti sigur ca vrei sa stergi evenimentul {{viewData.title}} ?</p>
          <v-row class="mt-6">
            <v-col cols="6">
              <v-btn class="btn-primary" elevation="0" rounded="0" block @click="stergeEvent = false">Nu</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="primary" rounded="0" elevation="0" @click="deleteEvent">Da</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        dialog: false,
        viewDialog: false,
        stergeEvent: false,
        categorii: [],
        viewData: {
          id: null,
          title: null,
          start: null,
          end: null,
        
        },
        payload: {
          title: null,
          start: null,
          end: null,
          allDay: false,
          categorie: null
        },
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
            this.viewEvent(arg)
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
      save() {
        axios.post('http://psyhelp-api.oldstudioconcept.ro/evenimente/', this.payload)
        .then((response) =>{
          this.dialog= false
          this.getData();
          this.payload.title = null
        })
      },
      close() {
        this.dialog= false
        this.getData();
      },  
      addEvent(data) {
        this.dialog = true
        if(!data.allDay){
          this.payload.start = data.startStr.replace('+03:00', '')
          this.payload.end = data.endStr.replace('+03:00', '')
        }else{
          this.payload.start = data.startStr
          this.payload.end = data.endStr
        }
        this.payload.allDay = data.allDay
      },
      getData(){
        axios.get('http://psyhelp-api.oldstudioconcept.ro/evenimente/')
        .then((response) => {
          this.calendarOptions.events = response.data;
        })
        axios.get('http://psyhelp-api.oldstudioconcept.ro/evenimente/categorii/')
        .then((response) =>
        {
          this.categorii = response.data;
        })
      },
      viewEvent(data){
        this.viewData.title = data.event.title
        this.viewData.start = data.event.startStr
        this.viewData.end = data.event.endStr
        this.viewData.id = data.event.id
        this.viewDialog = true
      },
      deleteEvent(){
        axios.delete('http://psyhelp-api.oldstudioconcept.ro/evenimente/',
        {
          params:{
            id: this.viewData.id
          }
        }).then(() =>{
          this.viewDialog = false
          this.stergeEvent = false
          this.getData()
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