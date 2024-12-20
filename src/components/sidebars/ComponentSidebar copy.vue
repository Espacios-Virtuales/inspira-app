<template>
   <div class="sidebar">
      <div
            class="
            side-navbar
            active-nav
            d-flex
            justify-content-between
            flex-wrap flex-column"
            id="sidebar"
         >
      <div class="sidebar-container overflow-auto">
         <ul class="nav align-content-center flex-wrap font-color-info">
               <a href="#" class="nav-link h3 my-2">
                  <img
                  :src="restaurante"
                  class="img-fluid"
                  alt=""
                  />
               </a>

            <li >
               <router-link class="nav-link mx-3 h4 text-center text-white" to="/">
                  <div class="row">
                     <div class="col">
                        <i >
                           <font-awesome-icon icon="home" />
                        </i>
                     </div>
                     <div class="col">
                        Inicio
                     </div>
                  </div>
               </router-link>
            </li>

            <div class="icon-container">
               <li class="subcategories" v-if="isAExecutive()">
                  <Accordeon> 
                     <template v-slot:title>
                        <span class="ms-1 d-none d-sm-inline text-white">Stock</span>
                     </template>

                     <template v-slot:content>
                     <ul class="nav flex-column text-white w-100">
                        <li>
                           <router-link class="nav-link py-2 my-4" to="/categoria/productos">
                           <i>
                              <font-awesome-icon :icon="['fa', 'shopping-bag']" /> 
                           </i>
                           <span class="ms-1 d-none d-sm-inline"
                              >Productos</span
                           >
                           </router-link>
                        </li>
                        <li>
                           <router-link class="nav-link py-2 my-4" to="/categoria/ingredientes">
                           <i>
                              <font-awesome-icon :icon="['fa', 'carrot']" /> 
                           </i>
                           <span class="ms-1 d-none d-sm-inline"
                              >Ingredientes</span
                           >
                           </router-link>
                        </li>
                     </ul>
                     </template>
                  </Accordeon>
               </li>
               <li class="subcategories py-2" v-if="isAExecutive()">
                  <Accordeon> 
                     <template v-slot:title>
                        <span class="ms-1 d-none d-sm-inline text-white">Tickets</span>
                        </template>
                     <template v-slot:content>
                        <ul class="nav flex-column text-white w-100">
                           <li>
                              <button @click="ticketRender(false)" class="nav-link py-2 my-4 button-nav"> 
                              <i>
                                 <font-awesome-icon icon="spinner" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline"
                                 >En Curso</span
                              >
                              </button>
                           </li>
                           <li>
                              <button @click="ticketRender(true)" class="nav-link py-2 my-4 button-nav"> 
                              <i>
                                 <font-awesome-icon icon="check" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline"
                                 >Pagados</span
                              >
                              </button>
                           </li>
                        </ul>
                     </template>
                  </Accordeon>
               </li>
               <li class="subcategories py-2" v-if="isACook()">
                  <Accordeon> 
                     <template v-slot:title>
                        <span class="ms-1 d-none d-sm-inline text-white">Cocina</span>
                     </template>
                     <template v-slot:content>
                        <ul class="nav flex-column text-white w-100">
                           <li>
                              <button @click="cookRender(0)" class="nav-link py-2 my-4 button-nav"> 
                                 <i >
                                    <font-awesome-icon :icon="['fa', 'list']" /> 
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >En Lista</span
                                 >
                              </button>
                           </li>
                           <li>
                              <button @click="cookRender(1)" class="nav-link py-2 my-4 button-nav"> 
                                 <i>
                                    <font-awesome-icon :icon="['fa', 'spinner']" /> 
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >En Curso</span
                                 >
                              </button>
                           </li>
                           <li>
                              <button @click="cookRender(2)" class="nav-link py-2 my-4 button-nav"> 
                                 <i >
                                    <font-awesome-icon icon="check" />
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >Completos</span
                                 >
                              </button>
                           </li>
                        </ul>
                     </template>
                  </Accordeon>
               </li>
               <li class="subcategories py-2" v-if="isAShipping()">
                  <Accordeon> 
                     <template v-slot:title>
                        <span class="ms-1 d-none d-sm-inline text-white">Deliveries</span>
                        </template>
                     <template v-slot:content>
                        <ul class="nav flex-column text-white w-100">
                           <li>
                              <button @click="deliveryRender(1)" class="nav-link py-2 my-4 button-nav"> 
                                 <i>
                                    <font-awesome-icon :icon="['fa', 'spinner']" /> 
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >Para Repartir</span
                                 >
                              </button>
                           </li>
                           <li>
                              <button @click="deliveryRender(2)" class="nav-link py-2 my-4 button-nav"> 
                                 <i >
                                    <font-awesome-icon :icon="['fa', 'truck']" /> 
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >En Reparto</span
                                 >
                              </button>
                           </li>
                           <li>
                              <button @click="deliveryRender(3)" class="nav-link py-2 my-4 button-nav">
                                 <i>
                                    <font-awesome-icon :icon="['fa', 'check']" /> 
                                 </i>
                                 <span class="ms-1 d-none d-sm-inline"
                                    >Entregados</span
                                 >
                              </button>
                           </li>
                        </ul>
                     </template>
                  </Accordeon>
               </li>
               <li class="subcategories py-2" v-if="isAExecutive()">
                  <button @click="portalRender" class="btn btn-dark btn-w-acordeon text-center "> 
                     Portal Web
                  </button>
               </li>
               <li class="subcategories py-2" v-if="isAExecutive()">
                  <button @click="clientRender" class="btn btn-dark btn-w-acordeon text-center "> 
                     Usuarios
                  </button>
               </li>
            </div>
         </ul>
      </div>
      </div>
   </div>   
</template>

<script>
import * as $ from 'alga-js';
import Accordeon from "../buttons/ButtonAccordeon.vue";

export default {
   name: "ComponentSidebar.vue",

   components: {
      Accordeon
   },
   
   data () {
      return {
      restaurante: require('@/assets/icons/food-truck.png'),
      id: null

      }
   },
   
   mounted () {
    this.id = this._uid
   },

   computed: {
      currentUser() {
         return this.$store.state.auth.user;
      }
   },

   methods: {

      getRole(){
         let authorities;
         let authority;
         
         if(this.currentUser){
            authorities = this.currentUser.user.authorities;
         }
         if(authorities){
            authority = $.array.search(authorities, 'ROLE')
         }
         return authority
      },

      isAExecutive(){
         let authority;  
         if(this.getRole()){
            authority = $.array.search(this.getRole(), 'ROLE_ADMIN', 'ROLE_BACKOFFICE');
         }
         if(authority){
            return true
         }             
      },
      isACook(){
         let authority;  
         if(this.getRole()){
            authority = $.array.search(this.getRole(), 'ROLE_COOK', 'ROLE_BACKOFFICE');
         }
         if(authority){
            return true
         }             
      },
      isAShipping(){
         let authority;  
         if(this.getRole()){
            authority = $.array.search(this.getRole(), 'ROLE_COOK', 'ROLE_BACKOFFICE');
         }
         if(authority){
            return true
         }             
      },
      ticketRender(status){
         this.$router.push({ path: '/tickets', query: { paidStatus: status }})
      },
      cookRender(status){
         this.$router.push({ path: '/cocina/ordenes', query: { status: status }})
      },
      deliveryRender(status){
         this.$router.push({ path: '/deliveries/ordenes', query: { status: status }})
      },
      clientRender(){
         this.$router.push({ path: '/clientes'})
      },
      portalRender(){
         this.$router.push({ path: '/portal'})
      }
   },
   };
</script>

<style>
   @import "Sidebar.css";
</style>
