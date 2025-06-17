<template>
  <router-view/>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    async online() {
            try {
                let response = await axios.get(`http://localhost:3000/online`, {});
                console.log("Pong", response);
            } catch (error) {
                console.warn("Not online", error)
            }
        },
  },
  mounted (){
    this.online();
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', sans-serif; /* Aggiungi sans-serif come fallback */
  font-weight: normal; /* Peso predefinito */
  font-style: normal; /* Stile predefinito */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
html{
  padding: 0px;
  margin: 0px;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
}
body{
  font-family: 'Helvetica Neue';
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
}
header {
  background-color: #022970;
}
#btnLogin{
  background-color: #022970 !important;
  border-color: #022970 !important;
}
#home, #logout, #client, #openOrders, #facilities {
    color: #ffffff;
    cursor: pointer;
}
#home:hover, #logout:hover, #client:hover, #openOrders:hover, #facilities:hover {
    background-color: #083280;
    transition: 0.2s ease-in;
}
h1, h2, h3{
  color: #022970 !important;
}
#actions{
  color:#022970;
  background-color: #f1f1f1;
  border-color: #f1f1f1;
  height: 15%;
}
#actions:hover{
  background-color: #f9f9f9 !important;
  border-color: #f9f9f9;
  transition: 0.2s ease-in;
  
}
#send, #accept{
  background-color: #022970 !important;
  border-color: #022970 !important;
}
#send:hover, #accept:hover{
  background-color: #083280 !important;
  transition: 0.2s ease-in;
}
#reset{
  background-color: #525252 !important;
  border-color: #525252 !important;
}
#reset:hover{
  background-color: #454545 !important;
  transition: 0.2s ease-in;
}
li{
  width:100%;
  padding-left: 5px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 1.3em;
}
.login button:hover{
  transition: 0.2s ease-in;
  background-color: #011963;
  border-color: #011963;
}
.login button{
  border: #022970;
  background: #022970;
  cursor: pointer;
}
.input{
  padding: 20px;  
}
textarea{
  font-size: 1.3em !important;
}
a{
  cursor: pointer; 
}
.client-list a, .facilities-list a{
  color:#022970 !important;
}
.client-list:hover, .facilities-list:hover{
  background-color: #f9f9f9;
}
</style>
