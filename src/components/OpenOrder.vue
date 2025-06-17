<template>
    <Header />
    <div class="d-flex justify-content-start px-4">
        <a href="javascript:history.back()">
            <i class="bi bi-chevron-left fs-3" style="color: #022970"></i>
        </a>
    </div>
    <h1>Order n° {{ this.order.id }}</h1>
    <ul class="list-group list-group-flush">
        <li v-for="item in this.order.items" :key="item.id" class="client-list list-group-item">
            Item ID: {{ item.id }} <br>
            
            &emsp;Client code: {{ item.code_item_client }} <br>
            &emsp;Supplier code: {{ item.code_item_supplier }} <br>
            &emsp;N. containers: {{ item.n_containers }} <br>
            &emsp;Quantity delivered: {{ item.quantity_delivered }} <br>
            &emsp;Shelf: {{ item.shelf }} <br>
            &emsp;Shelving unit: {{ item.shelving_unit }} <br>
            &emsp;Description: {{ item.description }}<br> 
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
