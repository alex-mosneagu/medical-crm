<template>
    <sidebar />
    <section class="container-hero">
        <navbar />
        
    </section>
</template>
<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

export default{
    name: 'Servicii',
    components: {
        Sidebar,
        Navbar
    }
}</script>