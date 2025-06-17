<template>
    <Header />
    <div class="d-flex justify-content-start px-4">
        <a href="javascript:history.back()">
            <i class="bi bi-chevron-left fs-3" style="color: #022970"></i>
        </a>
    </div>
    <div class="container my-3" style="max-width: 900px;">
        <div class="text-center mb-4">
            <Modal ref="orderModal" modalId="orderModal" :title="modalTitle">
                <p>{{ modalMessage }}</p>
            </Modal>
            <h2 class="fw-bold">Accetta un ordine</h2>
            <p class="fs-5">Qui puoi accettare l'ordine da {{ this.customer.name }}</p>
        </div>
        <ul class="list-unstyled mb-4">
            <li>&bull; Collega il lettore di barcode al dispositivo tramite Bluetooth.</li>
            <li>&bull; Posizionati nella casella di testo sottostante per cominciare a inserire i barcode degli articoli
                da accettare.</li>
            <li>&bull; Leggi i barcode con il dispositivo collegato (verranno automaticamente inseriti nella casella di
                testo).</li>
            <li>&bull; Una volta terminato l'inserimento dei codici clicca su '<strong>Accetta</strong>' per accettare
                l'ordine!</li>
        </ul>
        <div class="mb-4">
            <textarea class="form-control" rows="10" v-model="textContent" placeholder="Scrivi qui..."></textarea>
        </div>
        <div class="d-flex justify-content-center gap-3" style="height: 10%;">
            <button id="accept" class="btn btn-primary px-4 w-50 fs-3 mb-3" v-on:click="acceptOrder">Accetta</button>
            <button id="reset" class="btn btn-primary px-4 w-50 fs-3 mb-3" v-on:click="this.textContent = ''"
                title="Cancella tutti i codici inseriti">Cancella tutto</button>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import Modal from './Modal.vue';
import axios from 'axios';
export default {
    name: 'Accept',
    data() {
        return {
            textContent: '', // Contenuto del file di testo
            //currentDate: new Date().toLocaleDateString() // Formatta la data
            modalMessage: "", // Stato per il messaggio del Modale
            modalTitle: "",   // Stato per il titolo del Modale
            customer: [],
        };
    },
    components: {
        Header,
        Modal
    },
    methods: {
        async acceptOrder() {
            let token = localStorage.getItem('token').replace(/"/g, ''); // Rimuovo le virgolette

            // Crea un blob con i dati
            const blob = new Blob([this.textContent], { type: 'text/plain' });

            // Crea un oggetto File
            const file = new File([blob], `test.dat`, { type: 'text/plain' }); //Ordine${this.currentDate}

            const formData = new FormData();
            formData.append('file', file); // Aggiungi il file direttamente

            try {
                await axios.get('http://localhost:3000/order_accepted');

                console.log(response);
                this.modalTitle = "Ordine accettato!";
                this.modalMessage = "Il tuo ordine è stato accettato con successo!";

            } catch (error) {
                console.error("Failed acceptance, error:", error);
                this.modalTitle = "Order non accettato!";
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