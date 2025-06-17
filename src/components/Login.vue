<template>
    <div class="full d-flex justify-content-center min-vh-100">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <!--<div class="text-center mb-3" style="width:100%">
                LOGO
            </div>-->
            <div class="login card shadow-lg mx-3 my-5">
                <div class="card-body p-4">
                    <h2 class="text-center fw-bold">Login</h2>
                    <form @submit.prevent="login"> <!-- Form che gestisce l'invio -->
                        <div class="input align-items-center">
                            <input type="email" v-model="email" placeholder="email@esempio.com" autocomplete="email"
                                class="form-control mx-1 mb-3" required />
                            <input id="password" type="password" v-model="password" placeholder="password" autocomplete="password"
                                class="form-control mx-1 mb-3" required />
                            <input type="checkbox" class="mx-2" @click="showPassword()">Mostra Password</input>
                            <p class="text-danger mt-2" v-if="errorMessage" style="color: red;">
                                {{ errorMessage }}
                            </p>
                        </div>
                        <button type="submit" class="btn btn-primary mb-2 w-50">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../routers';

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        }
    },

    methods: {
        showPassword() {
            var pw = document.getElementById("password");
            if (pw.type === "password") {
                pw.type = "text";
            } else {
                pw.type = "password";
            }
        },
        async login() {
            try {
                // Rimuoviamo la parte di hashing e compariamo la password in chiaro
                let response = await axios.get('http://localhost:3000/users'); // Ottieni tutti gli utenti

                console.log(response);

                if (response.status == 200 && Array.isArray(response.data)) { // Controlla se la risposta è un array
                    // Cerca l'utente corrispondente nell'array
                    const user = response.data.find(users => users.email === this.email && users.password === this.password);

                    if (user) {
                        // Login successful
                        localStorage.setItem("token", JSON.stringify(user.token));
                        localStorage.setItem("id", JSON.stringify(user.id));
                        localStorage.setItem("nome_azienda", JSON.stringify(user.nome_azienda));
                        localStorage.setItem("nome_referente", JSON.stringify(user.nome_referente));
                        localStorage.setItem("email", JSON.stringify(user.email));
                        localStorage.setItem("logo", JSON.stringify(user.logo));

                        this.$router.push({ name: 'Client' });
                    } else {
                        // Login failed
                        this.errorMessage = 'E-mail o password errati.';
                        console.warn("Login failed, invalid credentials.");
                    }
                } else {
                    this.errorMessage = 'Errore durante il recupero degli utenti.';
                    console.warn("Login failed, invalid data format.");
                }

            } catch (error) {
                this.errorMessage = 'Errore durante il login.';
                console.error("Error while logging in:", error);
            }
        }
    },

    mounted() {
        let userId = localStorage.getItem('id')
        if (userId) {
            this.$router.push({ name: 'Client' })
        }
    }
}
</script>
