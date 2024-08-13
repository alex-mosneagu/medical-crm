<template>
  <sidebar />

  <section class="container-hero">
    <navbar />
    <div v-if="$vuetify.display.smAndUp" class="d-flex align-center justify-space-between mb-4">  
      <h5 class="text-primary">Programari</h5>
      <div class="filters d-flex">
        <div class="form-element">
          <select v-model="staffFilter" name="staffFilter" id="staffFilter" @change="getEventsFilter">
            <option value="0">Toti din Staff</option>
            <option v-for="item in staffComplet" :value="item.id">{{ item.nume }}</option>
          </select>
        </div>
        <div class="form-element">
          <select v-model="serviciuFilter" name="serviciuFilter" id="serviciuFilter" @change="getEventsFilter">
            <option value="0">Toate Serviciile</option>
            <option v-for="item in servicii" :value="item.id">{{ item.nume }}</option>
          </select>
        </div>
      </div>
    </div>
    <FullCalendar 
    ref="fullCalendar"
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
                <v-select
                  v-model="payload.categorie"
                  label="Categorie"
                  required
                  :items="categorii"
                  item-title="nume"
                  item-value="id"
                  @input="getStaff"
                ></v-select>
                <v-text-field
                  v-if="payload.categorie == 3"
                  v-model="payload.title"
                  label="Title"
                  required
                ></v-text-field>
                <v-select
                  v-if="payload.categorie != 3"
                  v-model="payload.staff"
                  label="Staff"
                  required
                  :items="staff"
                  item-title="nume"
                  item-value="id"
                ></v-select>
                <v-select
                  v-if="payload.categorie != 3"
                  v-model="payload.pacient"
                  label="Pacient"
                  required
                  :items="pacienti"
                  item-title="nume"
                  item-value="id"
                  @input="checkIfAddPacient"
                ></v-select>
                <v-select
                  v-if="payload.categorie != 3 && !payload.pachet"
                  v-model="payload.serviciu"
                  label="Serviciu"
                  required
                  :items="servicii"
                  item-title="nume"
                  item-value="id"
                ></v-select>
                <v-select
                  v-if="payload.categorie != 3 && payload.pachet"
                  v-model="payload.serviciu"
                  label="Pachet"
                  required
                  :items="pachete"
                  item-title="nume"
                  item-value="id"
                ></v-select>
                <v-checkbox v-model="payload.pachet" label="Pachet"></v-checkbox>
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
                <Datepicker v-model="payload.start" @update:modelValue="autoSetEnd" />
              </v-col>
              <v-col v-if="!payload.allDay" cols="6">
                <Datepicker v-model="payload.end"  />
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
      <v-card-title class="d-flex justify-space-between flex-wrap">
        <h2>{{ viewData.title }}</h2>
        <v-icon icon="mdi-close" @click="viewDialog= false"></v-icon>
      </v-card-title>
      <v-card-text>
        <p class="mb-4"><strong>Status</strong>: <span v-if="viewData.isConfirmed == 0" class="text-red">Neconfirmat</span> <span v-else class="text-green">Confirmat</span></p>
        <p class="mb-4"><strong>Informatii Pacient</strong>: <span class="c-pointer link-like" @click="infoPacient">Click Aici</span></p>
        <p><strong>Link Confirmare</strong>: <a :href="'http://localhost:5173/confirma-programarea/' + viewData.id" target="_blank">Click aici</a></p>
      </v-card-text>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn v-if="viewData.isConfirmed == 0" class="btn-primary" elevation="0" rounded="0" block @click="confirmEvent">Confirma</v-btn>
          <v-btn v-else class="btn-primary" elevation="0" rounded="0" block @click="declineEvent">Anuleaza</v-btn>
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
  <v-dialog
      v-model="pacientInfo"
      width="600"
    >
    <v-card class="pa-5" >
      <v-card-title class="d-flex justify-space-between">
        <h2>Infomatii pacient</h2>
        <v-icon icon="mdi-close" @click="pacientInfo=false"></v-icon>
      </v-card-title>
        <v-card-text>
          <p>Nume: {{pacient.nume}} {{ pacient.prenume }}</p>
          <p>Telefon: {{pacient.telefon }}</p>
          <p>Email: {{pacient.email }}</p>
        </v-card-text>
      </v-card>
  </v-dialog>
  </section>
  <add :hideButton="true" :showDialog="addPacientDialog" @refresh="getData"/>
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
  import Add from '../pacienti/components/Add.vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  export default {
    name: 'Programari',
    components: {
      Sidebar,
      FullCalendar,
      Navbar,
      Add,
      Datepicker
    },
    watch: {
      'payload.categorie': {
        handler () {
          this.getStaff()
        },
        deep: true
      },
      'payload.pacient': {
        handler () {
          this.checkIfAddPacient()
        },
        deep: true
      }
    },
    data() {
      return{
        dialog: false,
        pacientInfo: false,
        pacient: null,
        viewDialog: false,
        stergeEvent: false,
        categorii: [],
        pacienti: [],
        staff: [],
        staffComplet: [],
        servicii: [],
        pachete: [],
        staffFilter: 0,
        serviciuFilter: 0,
        addPacientDialog: false,
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
          categorie: null,
          pacient: null,
          pachet: false
        },
        calendarOptions: {
          selectLongPressDelay: 100,
          locale: 'ro',
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
          initialView: window.innerWidth > 768 ? 'dayGridMonth' : 'dayGridMonth',
          weekends: false,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,dayGridWeek,dayGridMonth'
          },
          buttonText: {
            today: 'Astazi',
            day: 'Azi',
            week: 'Saptamana',
            month: 'Luna'
          },
          selectable: true,
          editable: true,
          select: (arg) => {
            const cal = arg.view.calendar;
            if(arg.view.type == 'dayGridMonth'){
              cal.unselect();
              this.changeView(arg);
            }else{
              cal.unselect();
              cal.addEvent({
                title: 'New Event',
                start: arg.start,
                end: arg.end,
                allDay: false,
                backgroundColor: '#ccc',
                borderColor: '#ccc'
              });
              this.addEvent(arg);
            }
          },
          eventClick: (arg) => {
            if(arg.view.type == 'dayGridMonth'){
              // Create a Date object
              let startdate = new Date(arg.event.start);

              // Extract the day, month, and year
              let startday = String(startdate.getDate()).padStart(2, '0');  // Pad with leading zero if needed
              let startmonth = String(startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
              let startyear = startdate.getFullYear();

              // Format as DD-MM-YYYY
              let startStr = `${startyear}-${startmonth}-${startday}`;
              let endStr = `${startyear}-${startmonth}-${startday}`;
              let data = {
                startStr: null,
                endStr: null
              }
              data.startStr = startStr
              data.endStr = endStr
              this.changeView(data);
            }else{
              this.viewEvent(arg);
            }
          },
          eventDrop: (arg) => {
            alert(arg.event.title + " was dropped on " + arg.event.start);
          },
          eventResize: (arg) => {
            alert(arg.event.title + " was resized to " + arg.event.end);
          }
        }
      }
    },
    created(){
      this.getData();
      if(this.$route.query.pacient_id){
        this.dialog = true
        this.payload.pacient = this.$route.query.pacient_id
      }
    },
    methods: {
      save() {
        if(this.payload.title == null){
          let pacientSelectat = this.pacienti.find((item) => item.id == this.payload.pacient)
          let staffSelect = this.staff.find((item) => item.id == this.payload.staff)
          let serviciuSelectat = this.servicii.find((item) => item.id == this.payload.serviciu)
          this.payload.title = pacientSelectat.nume + " - " + staffSelect.nume + " - " + serviciuSelectat.nume
        }
        axios.post('https://psyhelp-api.oldstudioconcept.ro/evenimente/', this.payload)
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
      changeView(data) {
        this.$refs.fullCalendar.getApi().changeView('timeGrid', {
          start: data.startStr,
          end: data.endStr
        });
      },
      addEvent(data) {
        let pacientiTemp = {
          id: 0,
          nume: "Adauga Pacient"
        }
        this.pacienti.unshift(pacientiTemp)
        this.dialog = true
        data.allDay = false
        if(!data.allDay){
          this.payload.start = data.startStr.replace('+03:00', '')
          this.payload.end = data.endStr.replace('+03:00', '')
        }else{
          this.payload.start = data.startStr
          this.payload.end = data.endStr
        }
        this.payload.allDay = false
      },
      infoPacient() {
        const eveniment = this.calendarOptions.events.find((item) => { return item.id == this.viewData.id })
        const pacient = this.pacienti.find((item) => { return item.id == eveniment.pacient })
        this.pacient = pacient
        this.pacientInfo = true
      },
      getData(){
        axios.get('https://psyhelp-api.oldstudioconcept.ro/evenimente/')
        .then((response) => {
          response.data.forEach((item) => {
            if(item.isConfirmed == 0){
              item.backgroundColor = 'red'
              item.borderColor = 'red'
            }
            if(item.allDay == 0){
              item.allDay = false
            }
          })
          this.calendarOptions.events = response.data;
          if(this.$route.query.staff_id){
            this.staffFilter = this.$route.query.staff_id
            this.calendarOptions.events = this.calendarOptions.events.filter((item) => { return item.staff == this.$route.query.staff_id })
          }
        })
        axios.get('https://psyhelp-api.oldstudioconcept.ro/evenimente/categorii/')
        .then((response) =>
        {
          this.categorii = response.data;
        })
        axios.get('https://psyhelp-api.oldstudioconcept.ro/pacienti/',{
          params:{
            skip: 0,
            take: 100,
          }
        })
        .then((response) => {
          this.pacienti = response.data.paginatedResults;
        })
        axios.get('https://psyhelp-api.oldstudioconcept.ro/servicii/',
        {
          params:{
            skip: 0,
            take: 200,
          }
        }
        )
        .then((response) => {
          this.servicii = response.data.paginatedResults;
        }, (error) => {
          console.log(error);
        });
        axios.get('https://psyhelp-api.oldstudioconcept.ro/pachete/',
        {
          params:{
            skip: 0,
            take: 200,
          }
        }
        )
        .then((response) => {
          this.pachete = response.data.paginatedResults;
        }, (error) => {
          console.log(error);
        });
        
        axios.get('https://psyhelp-api.oldstudioconcept.ro/doctori/',
        {
          params:{
            skip: 0,
            take: 200,
          }
        }
        )
        .then((response) => {
          this.staffComplet = response.data.paginatedResults;
        }, (error) => {
          console.log(error);
        });
      },
      confirmEvent() {
        axios.post('https://psyhelp-api.oldstudioconcept.ro/evenimente/confirma/',
        {
            id: this.viewData.id
        }).then(() =>{
          this.viewDialog = false
          this.stergeEvent = false
          this.getData()
        })
      },
      declineEvent() {
        axios.post('https://psyhelp-api.oldstudioconcept.ro/evenimente/anuleaza/',
        {
            id: this.viewData.id
        }).then(() =>{
          this.viewDialog = false
          this.stergeEvent = false
          this.getData()
        })
      },
      viewEvent(data){
        this.viewData.title = data.event.title
        this.viewData.start = data.event.startStr
        this.viewData.end = data.event.endStr
        this.viewData.id = data.event.id
        this.viewData.isConfirmed = data.event.extendedProps.isConfirmed
        this.viewDialog = true
      },
      deleteEvent(){
        axios.delete('https://psyhelp-api.oldstudioconcept.ro/evenimente/',
        {
          params:{
            id: this.viewData.id
          }
        }).then(() =>{
          this.viewDialog = false
          this.stergeEvent = false
          this.getData()
        })
      },
      autoSetEnd() {
        // Convert the start time to a Date object
        let startDate = new Date(this.payload.start);
        
        // Add 30 minutes to the start date
        startDate.setMinutes(startDate.getMinutes() + 30);

        // Function to format the date as YYYY-MM-DDTHH:MM
        function formatDate(date) {
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            let hours = String(date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        // Assign the end time to the payload
        this.payload.end = formatDate(startDate);
      },
      getStaff() {
        this.staff = []
        this.payload.staff = null
        axios.get('https://psyhelp-api.oldstudioconcept.ro/doctori/categorie/', {
          params: {
            categorie: this.payload.categorie
          }
        }).then((response) => {
          this.staff = response.data.paginatedResults
        })
      },
      getEventsFilter() {
        if(this.staffFilter == 0 &&  this.serviciuFilter == 0){
          axios.get('https://psyhelp-api.oldstudioconcept.ro/evenimente/')
          .then((response) => {
            response.data.forEach((item) => {
              if(item.isConfirmed == 0){
                item.backgroundColor = 'red'
                item.borderColor = 'red'
              }
            })
            this.calendarOptions.events = response.data;
          })
        }else{
          axios.get('https://psyhelp-api.oldstudioconcept.ro/evenimente/filtre/',{
            params: {
              staff: this.staffFilter,
              serviciu: this.serviciuFilter
            }
          })
          .then((response) => {
            if(response.data.message == 'No data found'){
              return false;
            }
            response.data.forEach((item) => {
              if(item.isConfirmed == 0){
                item.backgroundColor = 'red'
                item.borderColor = 'red'
              }
            })
            this.calendarOptions.events = response.data;
          })
        }
      },
      checkIfAddPacient(){
        if(this.payload.pacient == 0){
          this.addPacientDialog = true
          this.payload.pacient = null
        }
      }
    }
  }
</script>


<style lang="scss">
  @media all and (max-width: 780px){
    .fc-toolbar{
      display: block !important;
      text-align: center;
      .fc-toolbar-title{
        margin: 10px 0px;
      }
    }
    .fc .fc-view-harness{
      height: 400px !important;
    }
  }
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
  .fc-toolbar-chunk:nth-child(1){
    display: flex;
    align-items: center;
    justify-content: center;
    button{
      border: 1px solid #ccc !important;
      height: 40px !important;
      font-size: 13px !important;
      min-width: 50px;
      padding: 0px 15px;
      background-color: #fff !important;
      color: #000 !important;
      outline: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: flex;
        align-items: center;
        justify-content: center;
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
    button[title="This Luna"]{
      background-color: #F17422 !important;
      color: #fff !important;
      border-color: #F17422 !important;
    }
  }
  .filters{
    gap: 10px;
    .form-element{
      label{
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
        margin-left: 10px;
      }
      select{
        border: 1px solid silver;
        padding-left: 15px;
        min-width: 150px;
        height: 40px;
        font-size: 14px;
        border-radius: 25px;
      }
      input{
        border: 1px solid silver;
        padding: 0px 15px;
        min-width: 180px;
        height: 40px;
        font-size: 14px;
        border-radius: 25px;
      }
    }
  }

  a{
    color: #F17422
  }
  .link-like{
    color: #F17422
  }
</style>