<template>
    <nav class="mb-10">
      <div class="w-75">
        <input type="search" placeholder="Search doctors by name or title">
      </div>
      <div class="notificari ml-6">
        <div class="bubble">
          <img src="../../images/icons/notificari.png" alt="">
          <span v-if="notificari > 0" class="notify-bubble">{{ notificari }}</span>
        </div>
      </div>
      <div class="split mx-8"></div>
      <div class="profile">
        <img src="https://placehold.co/600x400/EEE/31343C" alt="">
        <div class="content">
          <router-link to="/profilul-meu">
            <h5>David</h5>
            <p>test</p>
          </router-link>
        </div>
      </div>
    </nav>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'Navbar',
    data() {
      return {
        notificari: null
      }
    },
    created() {
      this.getData();
    },
    methods:{
      getData(){
        axios.get('http://192.168.1.130/api/notificari/total/')
        .then(response => {
          this.notificari = response.data;
        })  
      }
    }
  }
</script>
<style scoped>
  nav{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #F7F7F7;
  }
  .notificari{
    position: relative;
  }
  .notificari img{
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-top: 20px;
  }
  .notificari .bubble .notify-bubble{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #45BFB3;
    color: white;
    font-size: 11px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    right: 5px;
  }
  .profile{
    display: flex;
    align-items: center;
  }
.profile .content{
  margin-top: 20px;

}
  .profile img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
    margin-top: 20px;
  }
  .profile .content p{
    color: #45BFB3;
  }
  .split{
    height: 40px;
    width: 1px;
    background-color: #E0E0E0;
    margin-top: 20px;
  }
  input[type=search]{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 0 20px;
    outline: 0;
    margin-top: 20px;
  }
</style>