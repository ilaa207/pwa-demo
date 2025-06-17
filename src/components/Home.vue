<template>
  <Header />
  <div class="d-flex justify-content-start px-4">
    <a href="javascript:history.back()">
      <i class="bi bi-chevron-left fs-3" style="color: #022970"></i>
    </a>
  </div>
  <div class="d-flex flex-column align-items-center px-5 px-ms-4">
    <div class="d-flex justify-content-center align-items-center">
      <h1 class="fw-bold mb-4 mt-4">Welcome back!</h1>

    </div>
    <h2 class=" mb-4 mt-4">Client: {{ this.customer.name }}</h2>
    <button id="actions"
      class="btn btn-primary py-5 w-100 mb-3 fs-3 fs-sm-1 d-flex justify-content-center align-items-center shadow-lg"
      @click="this.$router.push({ name: 'Order' })">New order</button>
    <button id="actions"
      class="btn btn-primary py-5 w-100 mb-3 fs-3 fs-sm-1 d-flex justify-content-center align-items-center shadow-lg"
      @click="this.$router.push({ name: 'Accept' })">Accept an order</button>
  </div>

  <div id="ordini-aperti" data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example my-5">
    <h1 class="fw-bold mb-4 mt-4">Open orders</h1>
    <ul v-if="orders.length > 0" class="list-group">
      <li v-for="order in orders" :key="order.id" class="list-group-item">
        <a @click="selectedOrder(order)">
          <h2>{{ order.id }}</h2>
        </a>
      </li>
    </ul>
    <p v-else>No open order.</p>
  </div>

</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      customer: [], // cliente selezionato
      orders: [], // Lista degli ordini aperti
    };
  },
  components: {
    Header
  },
  methods: {
    async openOrders() {
      let token = localStorage.getItem('token').replace(/"/g, '');
      try {
        const response = await axios.get('http://localhost:3000/open_orders', {
          headers: {
            'authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        console.log(response);
        this.orders = response.data.orders;
      } catch (error) {
        console.warn("Error: ", error)
      }
    },
    selectedOrder(order) {
      localStorage.setItem('selectedOrder', JSON.stringify({
        id: order.id,
        items: order.items
      }));
      this.$router.push({ name: 'OpenOrder' });
    }
  },



  //controllo che l'utente sia loggato, lo faccio tramite l'id salvato e se non è loggato, rimando alla pagina di login
  mounted() {
    let userId = localStorage.getItem('id');
    console.log(localStorage.getItem('id'));

    if (userId == null) {
      this.$router.push({ name: 'Login' })
    }
    // Recupera il cliente da localStorage
    this.customer = JSON.parse(localStorage.getItem('selectedCustomer'));
    // Recupera gli ordini aperti
    if (this.customer.id) {
      this.openOrders();
    }
  },
};
</script>