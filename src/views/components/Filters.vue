<template>
    <div class="mb-8">
      <v-row>
        <v-col cols="3">
          <v-row>
            <v-col cols="6">
              <div class="show">
                <select name="show" id="">
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                </select>
              </div>
            </v-col>
            <v-col cols="6">
              <select name="status">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
            </select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
         <input type="search" placeholder="Search doctors by name or title">
        </v-col>
        <v-col cols="3">
          <div class="d-flex">
            <v-btn
            color="primary"
            class="rounded-0 rounded-s-xl"
            elevation="0"
            >
            All
          </v-btn>
          <v-btn 
            secondary
            class="rounded-0"
            elevation="0"
          >
            Man
          </v-btn>
          <v-btn
            secondary
            class="rounded-0 rounded-e-xl"
            elevation="0"
          >
            Woman
          </v-btn>
          </div>
          
        </v-col>
      </v-row>
    </div>
</template>
<style scoped>
  button{
    border: 1px solid #EDEDED !important;
    height: 40px !important;
    font-size: 14px !important;
    min-width: 80px;
  }
  input[type=search]{
    width: 100%;
    height: 40px;
    border-radius: 7px;
    border: 1px solid #EDEDED;
    padding: 0 20px;
    outline: 0;
    font-size: 14px;
  }
  select{
    width: 100%;
    height: 40px;
    border-radius: 7px;
    border: 1px solid #EDEDED;
    padding: 0 20px;
    outline: 0;
    font-size: 14px;
  }
</style>