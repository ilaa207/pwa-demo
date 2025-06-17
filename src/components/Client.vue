<template>
    <Header />
    <div id="display-clients" class="d-flex flex-column">
        <ul class="list-group list-group-flush">
            <li v-for="customer in customers" :key="customer.id" class="client-list list-group-item">
                <a @click="choose(customer)" class="text-decoration-none">
                    {{ customer.company_name }}
                    <i class="bi bi-chevron-right"></i>
                </a>

            </li>
        </ul>
    </div>

</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    name: 'Client',
    data() {
        return {
            customers: [],
        };
    },
    components: {
        Header
    },
    methods: {
        async searchcustomers() {
            let token = localStorage.getItem('token').replace(/"/g, '');
            try {
                const response = await axios.get('http://localhost:3000/client?user=1', {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'accept': 'application/json',
                    },
                });
                console.log(response);
                localStorage.setItem("customers", JSON.stringify(response.data.customers));
                this.customers = response.data.customers;
            } catch (error) {
                console.warn("Error: ", error)
            }
        },
        async choose(customer) {
            localStorage.setItem('selectedCustomer', JSON.stringify({
                id: customer.id,
                name: customer.company_name
            }));
            this.$router.push({ name: 'Home' });
        }
    },
    //controllo che l'utente sia loggato, lo faccio tramite l'id salvato e se non è loggato, rimando alla pagina di login
    mounted() {
        let userId = localStorage.getItem('token');

        if (userId == null) {
            this.$router.push({ name: 'Login' })
        }
        this.searchcustomers();


    }
}
</script>