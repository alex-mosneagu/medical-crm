<template>
    <section>
      <div class="aside-top">
        <div class="logo">
          <img :src="logo" alt="">
        </div>
        <div class="expand">
          <img :src="expandIcon" alt="">
        </div>
      </div>
      <div class="menu">
        <div class="item">
          <router-link to="/">
            <div class="icon">
              <img :src="acasaIcon" alt="">
            </div>
            <div class="text">Acasa</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/programari">
            <div class="icon">
              <img :src="programariIcon" alt="">
            </div>
            <div class="text">Programari</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/doctori">
            <div class="icon">
              <img :src="pacientiIcon" alt="">
            </div>
            <div class="text">Doctori</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/pacienti">
            <div class="icon">
              <img :src="pacientiIcon" alt="">
            </div>
            <div class="text">Pacienti</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/servicii">
            <div class="icon">
              <img :src="sedinteIcon" alt="">
            </div>
            <div class="text">Servicii</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/pachete">
            <div class="icon">
              <img :src="sedinteIcon" alt="">
            </div>
            <div class="text">Pachete</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/notificari">
            <div class="icon">
              <img :src="notificariIcon" alt="">
            </div>
            <div class="text">Notificari</div>
          </router-link>
        </div>
      </div>
    </section>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import logo from '../../images/logo.png'
  import acasaIcon from '../../images/icons/acasa.png'
  import programariIcon from '../../images/icons/programari.png'
  import pacientiIcon from '../../images/icons/pacienti.png'
  import sedinteIcon from '../../images/icons/sedinte.png'
  import notificariIcon from '../../images/icons/notificari.png'
  import expandIcon from '../../images/icons/expand.png'

  export default {
    name: 'Sidebar',
    data(){
      return {
        logo: logo,
        acasaIcon: acasaIcon,
        programariIcon: programariIcon,
        pacientiIcon: pacientiIcon,
        sedinteIcon: sedinteIcon,
        notificariIcon: notificariIcon,
        expandIcon: expandIcon
      }
    }
  }
</script>

<style lang="scss" scoped>
  section{
    background-color: #F7F7F7;
    position: absolute;
    width: 270px;
    left: 10px;
    top: 10px;
    bottom: 10px;
    border-radius: 8px;
    .aside-top{
      padding: 20px;
      border-bottom: 1px solid #D3D3D3;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo{
        img{
          width: 60%;
        }
      }
      .expand{
        cursor: pointer;
      }
    }
    .menu{
      .item{
        a{
          padding: 15px 20px;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all .3s ease-out;
          .icon{
            display: flex;
            align-items: center;
            width: 40px;
          }
          .text{
            color: #323232;
            font-size: 14px;
          }
          &:hover{
            background-color: #DFE0E2;
          }
        }
      }
    }
  }
  
</style>