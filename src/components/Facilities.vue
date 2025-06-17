<template>
    <Header />
    <div class="d-flex flex-column align-items-right">
        <ul class="list-group list-group-flush">
            <li class=" facilities-list list-group-item"><a @click="" class="text-decoration-none"> Impianto 1
        <i class="bi bi-chevron-right"></i>
      </a>
    </li>
    <li class=" facilities-list list-group-item"><a @click="" class="text-decoration-none"> Impianto 2
        <i class="bi bi-chevron-right"></i>
      </a>
    </li>
        </ul>
    </div>

</template>

<script>
import Header from './Header.vue';
import Home from './Home.vue';
export default {
    name: 'Facilities',
    components: {
        Header
    },
    //controllo che l'utente sia loggato, lo faccio tramite l'id salvato e se non è loggato, rimando alla pagina di login
    mounted() {
        let userId = localStorage.getItem('id')
        if (userId == null) {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>