import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Order from "./components/Order.vue";
import Accept from "./components/Accept.vue";
import Client from "./components/Client.vue";
import Facilities from "./components/Facilities.vue";
import OpenOrder from "./components/OpenOrder.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/', // Questa è la prima pagina che si apre
        redirect: '/login' // Reindirizza automaticamente alla pagina di Login
      },
    {
        name: "Login",
        component: Login,
        path: "/login",
    },
    {
        name: "Home",
        component: Home,
        path: "/home",
    },
    {
        name: "Order",
        component: Order,
        path: "/order",
    },
    {
        name: "Accept",
        component: Accept,
        path: "/accept",
    },
    {
        name: "Client",
        component: Client,
        path: "/client",
    },
    {
        name: "Facilities",
        component: Facilities,
        path: "/facilities",
    },
    {
        name: "OpenOrder",
        component: OpenOrder,
        path: "/open_order"
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;