<template>
    <div>
       <div class="card">
        <div class="card-title">
          <div></div>
          <h4>Card</h4>
        </div>
        <div class="card-content my-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="card-footer">
          <v-row class="align-center">
            <v-col cols="6">
              <p>Data</p>
            </v-col>
            <v-col class="text-right" cols="6">
              <v-btn color="primary" rounded="0" elevation="0">Sterge</v-btn>
            </v-col>
          </v-row>
        </div>
       </div>
    </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: all .3s ease-in-out;
      padding: 20px;
    &:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,.1);
    }
    .card-title {
      display: flex;
      align-items: center;
      div{
        width: 8px;
        height: 8px;
        background-color: #F17422;
        border-radius: 50%;
        margin-right: 10px;
      }
      h4 {
        margin: 0;
        font-size: 22px;
        font-weight: 500;
      }
    }
    .card-content {
      p {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
    }
    .card-footer {
      p {
        margin: 0;
        font-size: 12px;
        color: #666;
      }
    }
  }
</style>

