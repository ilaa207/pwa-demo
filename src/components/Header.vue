<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #022970;">
        <div class="container-fluid">
            <!-- Toggler per dispositivi mobili -->
            <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarTogglerDemo03"
                :aria-expanded="isNavbarOpen ? 'true' : 'false'" aria-label="Toggle navigation"
                style="color: #ffffff; background-color: #022970; border-color: #ffffff; filter: opacity(50%);">
                <!--Ho dovuto gestire la chiusura con isNavbarOpen perchè bootstrap entrava in conflitto con vuejs e il menù una volta aperto non si chiudeva-->
                <span class="navbar-toggler-icon" style="filter: invert(100%);"></span>
            </button>
            <!-- Navbar Menu -->
            <div class="navbar-collapse" :class="{ 'collapse': !isNavbarOpen, 'show': isNavbarOpen }"
                id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-3" style="width: 90%">
                    <li class="nav-item">
                        <a id="client" class="nav-link active bi bi-person rounded-1 mb-2" aria-current="page"
                            @click="this.$router.push({ name: 'Client' });" style="color: #ffffff;">&nbsp;Clients</a>
                    </li>
                    <li class="nav-item">
                        <a id="openOrders" class="nav-link active bi bi-box-seam rounded-1 mb-2" aria-current="page"
                            href="/home#ordini-aperti" style="color: #ffffff;">&nbsp;Open orders</a>
                    </li>
                    <!--<li class="nav-item">
                        <a id="facilities" class="nav-link active bi bi-kanban rounded-1 mb-2" aria-current="page"
                            @click="this.$router.push({ name: 'Facilities' });" style="color: #ffffff;">&nbsp;Stato
                            impianti</a>
                    </li>-->
                    <li class="nav-item">
                        <a id="logout" class="nav-link bi bi-box-arrow-right rounded-1 mb-2" @click="logout"
                            style="color: #ffffff;">&nbsp;Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="card profile-card">
        <div class="profile-header">&nbsp;</div>
        <div class="profile-body">
            <div class="image-area">
                <img :src="logo" alt="Logo" height="100" width="100" />
            </div>
            <div class="content-area">
                <h3 class="my-2">{{ contact_name }}</h3>
                <p class="my-1">{{ company_name }}</p>
                <p>{{ email }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import imageCompression from 'browser-image-compression';
export default {
    name: 'Header',
    data() {
        return {
            // Flag per determinare se la navbar è aperta o chiusa
            isNavbarOpen: false,
            email: '',
            company_name: '',
            contact_name: '',
            logo: ""
        };
    },
    methods: {
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen;
        },
        goHome() {
            this.$router.push('/');
        },
        async logout() {
            try {

                let token = localStorage.getItem('token').replace(/"/g, ''); // Rimuovo le virgolette, /g fa la ricerca su tutta la stringa
                console.log(token)
                const response = await axios.get('http://localhost:3000/logout', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response);

                if (response.status == 200) {
                    localStorage.clear();
                    this.$router.push({ name: 'Login' });
                } else {
                    console.warn("Logout non riuscito.");
                }
            } catch (error) {
                console.error("Errore durante il logout:", error);
            }
        }
    },

    mounted() {
        this.email = localStorage.getItem('email').replace(/"/g, '');
        this.company_name = localStorage.getItem('company_name').replace(/"/g, '');
        this.contact_name = localStorage.getItem('contact_name').replace(/"/g, '');
        this.logo = 'data:image/png;base64,' + localStorage.getItem('logo').replace(/"/g, '') || "";
    }
}
</script>
<style>
.card {
    background: #fff;
    min-height: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    margin-bottom: 20px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    border: none !important;
}

.profile-card .profile-header {
    background-color: #022970;
    padding: 42px 0;
}

.profile-card .profile-body .image-area {
    text-align: center;
    margin-top: -64px;
}

.profile-card .profile-body .image-area img {
    border: 2px solid #022970;
    padding: 2px;
    margin: 2px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    border-radius: 50%;
}
</style>