<template>
    <Header />
    <div class="d-flex justify-content-start px-4">
        <a href="javascript:history.back()">
            <i class="bi bi-chevron-left fs-3" style="color: #022970"></i>
        </a>
    </div>
    <div class="container align-items-center my-3" style="max-width: 900px;">
        <div class="text-center mb-4">
            <Modal ref="orderModal" modalId="orderModal" :title="modalTitle">
                <p>{{ modalMessage }}</p>
            </Modal>
            <h2 class="fw-bold">New order</h2>
            <p class="fs-5">Place a new order for: {{this.customer.name}}</p>
        </div>
        <ul class="list-unstyled mb-4">
            <li>&bull; Connect the barcode reader to your device via Bluetooth.</li>
            <li>&bull; Position yourself in the text box below to start inserting the barcodes.</li>
            <li>&bull; Read barcodes with the connected device (they will be automatically inserted into the text box).</li>
            <li>&bull; Once you have finished entering the codes click on <strong>'Send'</strong> to send your order!</li>
        </ul>
        <div class="mb-4">
            <textarea class="form-control" rows="10" v-model="textContent" placeholder="Write here..."></textarea>
        </div>
        <div class="d-flex justify-content-center gap-3" style="height: 10%;">
            <button id="send" class="btn btn-primary px-4 w-50 fs-3 mb-3" @click="sendOrder">Send</button>
            <button id="reset" class="btn btn-primary px-4 w-50 fs-3 mb-3"
                @click="this.textContent = ''" title="Cancella tutti i codici inseriti">Delete all</button>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import Modal from './Modal.vue';
import axios from 'axios';
export default {
    name: 'Order',
    data() {
        return {
            textContent: '', // Contenuto del file di testo
            //currentDate: new Date().toLocaleDateString() // Formatta la data
            modalMessage: "", // Stato per il messaggio del Modale
            modalTitle: "",
            customer: [],
        };
    },
    components: {
        Header,
        Modal
    },
    methods: {
        async sendOrder() {
            if (this.textContent.trim() === '') {
            this.modalTitle = "Error!";
            this.modalMessage = "The area cannot be empty, please enter your barcodes.";
            this.$refs.orderModal.openModal();
            return; // Esci dalla funzione se la textarea è vuota
            }
            let token = localStorage.getItem('token').replace(/"/g, ''); // Rimuovo le virgolette
            // Crea un blob con i dati
            const blob = new Blob([this.textContent], { type: 'text/plain' });
            // Crea un oggetto File
            const file = new File([blob], `test.dat`, { type: 'text/plain' }); //Ordine${this.currentDate}
            const formData = new FormData();
            formData.append('file', file); // Aggiungi il file direttamente
            try {
                let response = await axios.get('http://localhost:3000/order_sent');
                this.textContent = '';
                console.log(response);
                this.modalTitle = "Order sent!";
                this.modalMessage = "Your order has been sent!";
                
            } catch (error) {
                console.error("Sending failed, error:", error);
                console.log(this.customer.id);
                this.modalTitle = "Order not sent!";
                this.modalMessage = "Errore: " + error.message;
            }
            this.$refs.orderModal.openModal();
        }
    },
    //controllo che l'utente sia loggato, lo faccio tramite l'id salvato e se non è loggato, rimando alla pagina di login
    mounted() {
        this.customer = JSON.parse(localStorage.getItem('selectedCustomer'));
        let userId = localStorage.getItem('id')
        if (userId == null) {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
