<template>
    <Header />
    <div class="d-flex justify-content-start px-4">
        <a href="javascript:history.back()">
            <i class="bi bi-chevron-left fs-3" style="color: #022970"></i>
        </a>
    </div>
    <h1>Ordine n° {{ this.order.id }}</h1>
    <ul class="list-group list-group-flush">
        <li v-for="item in this.order.items" :key="item.id" class="client-list list-group-item">
            ID articolo: {{ item.id }} <br>
            
            &emsp;Codice cliente: {{ item.cod_articolo_cliente }} <br>
            &emsp;Codice fornitore: {{ item.cod_articolo_fornitore }} <br>
            &emsp;N. vaschette: {{ item.n_vaschette }} <br>
            &emsp;Qta. evasa: {{ item.qta_evasa }} <br>
            &emsp;Ripiano: {{ item.ripiano }} <br>
            &emsp;Scaffale: {{ item.scaffale }} <br>
            &emsp;Descrizione: {{ item.descrizione }}<br> 
        </li>
    </ul>
</template>

<script>
import Header from './Header.vue';
export default {
    name: 'OpenOrder',
    data() {
        return {
            order: [],
        };
    },
    components: {
        Header,
    },
    methods: {
        
    },
    //controllo che l'utente sia loggato, lo faccio tramite l'id salvato e se non è loggato, rimando alla pagina di login
    mounted() {
        this.order = JSON.parse(localStorage.getItem('selectedOrder'));
        
        let userId = localStorage.getItem('id')
        if (userId == null) {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
