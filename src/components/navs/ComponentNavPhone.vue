<template>
   <div class="navbar-nav" v-if="isLogin">
      <ul class="nav justify-content-center">
         <li class="nav-item w-100">
            <AccordeonNav>
               <template v-slot:title>
                  <i class="text-white">
                     <font-awesome-icon icon="list" />
                  </i>
                  <span class="ms-1 d-none d-sm-inline text-white">Menu</span>
               </template>
               <template v-slot:content>
                  <div class="container-3 overflow-auto">
                  <ul class="nav flex-column text-black w-100">
                     <li class="nav-item w-100">
                        <AccordeonItem>
                           <template v-slot:title>
                              <i>
                                 <font-awesome-icon icon="cubes" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline text-center">Stock</span>
                           </template>
                           <template v-slot:content>
                              <ul class="nav flex-row text-black justify-content-center">
                                 <li>
                                    <router-link class="nav-link button-white p-2 m-auto" to="/categoria/productos">
                                    <i class="text-black">
                                       <font-awesome-icon :icon="['fa', 'shopping-bag']" /> 
                                    </i>
                                    <span class="ms-1 d-none d-sm-inline text-black"
                                       >Productos</span
                                    >
                                    </router-link>
                                 </li>
                                 <li>
                                    <router-link class="nav-link button-white p-2 m-auto" to="/categoria/ingredientes">
                                    <i class="text-black">
                                       <font-awesome-icon :icon="['fa', 'carrot']" /> 
                                    </i>
                                    <span class="ms-1 d-none d-sm-inline text-black"
                                       >Ingredientes</span
                                    >
                                    </router-link>
                                 </li>
                              </ul>
                           </template>
                        </AccordeonItem>
                     </li>
                     <li class="nav-item w-100">
                        <AccordeonItem>
                           <template v-slot:title>
                              <i>
                                 <font-awesome-icon icon="ticket-alt" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline">Tickets</span>
                              </template>
                           <template v-slot:content>
                              <ul class="nav flex-row justify-content-center">
                                 <li>
                                    <button @click="ticketRender(false)" class="nav-link button-white p-2 m-auto"> 
                                    <i class="text-black">
                                       <font-awesome-icon icon="spinner" />
                                    </i>
                                    <span class="ms-1 d-none d-sm-inline text-black"
                                       >En Curso</span
                                    >
                                    </button>
                                 </li>
                                 <li>
                                    <button @click="ticketRender(true)" class="nav-link button-white p-2 m-auto"> 
                                    <i class="text-black">
                                       <font-awesome-icon icon="check" />
                                    </i>
                                    <span class="ms-1 d-none d-sm-inline text-black"
                                       >Pagados</span
                                    >
                                    </button>
                                 </li>
                              </ul>
                           </template>
                        </AccordeonItem>
                     </li>
                     <li class="nav-item w-100">
                        <AccordeonItem>
                           <template v-slot:title>
                              <i>
                                 <font-awesome-icon icon="clipboard" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline">Cocina</span>
                           </template>
                           <template v-slot:content>
                              <ul class="nav flex-row justify-content-center">
                                 <li>
                                    <button @click="cookRender(0)" class="nav-link button-white p-2 m-auto"> 
                                       <i class="text-black">
                                          <font-awesome-icon :icon="['fa', 'cubes']" /> 
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >En Lista</span
                                       >
                                    </button>
                                 </li>
                                 <li>
                                    <button @click="cookRender(1)" class="nav-link button-white p-2 m-auto"> 
                                       <i class="text-black">
                                          <font-awesome-icon :icon="['fa', 'spinner']" /> 
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >En Curso</span
                                       >
                                    </button>
                                 </li>
                                 <li>
                                    <button @click="cookRender(2)" class="nav-link button-white p-2 m-auto"> 
                                       <i class="text-black">
                                          <font-awesome-icon icon="check" />
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >Completos</span
                                       >
                                    </button>
                                 </li>
                              </ul>
                           </template>
                        </AccordeonItem>
                     </li>
                     <li class="nav-item w-100">
                        <AccordeonItem>
                           <template v-slot:title>
                              <i>
                                 <font-awesome-icon icon="truck" />
                              </i>
                              <span class="ms-1 d-none d-sm-inline">Delivery</span>
                           </template>
                           <template v-slot:content>
                              <ul class="nav flex-row justify-content-center">
                                 <li>
                                    <button @click="deliveryRender(1)" class="nav-link button-white p-2 m-auto"> 
                                       <i class="text-black">
                                          <font-awesome-icon :icon="['fa', 'truck']" /> 
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >Para Reparto</span
                                       >
                                    </button>
                                 </li>
                                 <li>
                                    <button @click="deliveryRender(2)" class="nav-link button-white p-2 m-auto"> 
                                       <i class="text-black">
                                          <font-awesome-icon :icon="['fa', 'spinner']" /> 
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >En Reparto</span
                                       >
                                    </button>
                                 </li>
                                 <li>
                                    <button @click="deliveryRender(3)" class="nav-link button-white p-2 m-auto">
                                       <i class="text-black">
                                          <font-awesome-icon :icon="['fa', 'check']" /> 
                                       </i>
                                       <span class="ms-1 d-none d-sm-inline text-black"
                                          >Entregados</span
                                       >
                                    </button>
                                 </li>
                              </ul>
                           </template>
                        </AccordeonItem>
                     </li>
                      <li class="nav-item w-100" >
                        <button @click="clientRender" class="btn btn-light w-100 text-center "> 
                           <i>
                              <font-awesome-icon icon="user" />
                           </i> Portal Web
                        </button>
                     </li>
                      <li class="nav-item w-100" >
                        <button @click="clientRender" class="btn btn-light w-100 text-center "> 
                           <i>
                              <font-awesome-icon icon="user" />
                           </i> Usuarios
                        </button>
                     </li>
                  </ul>
               </div>
               </template>
            </AccordeonNav>
         </li>
      </ul>
   </div>
</template>

<script>
import * as $ from 'alga-js';
import AccordeonNav from "../buttons/AccordeonNav.vue";
import AccordeonItem from "../buttons/AccordeonItem.vue";


export default {
   name: "ComponentNavPhone",

   components: {
      AccordeonNav, AccordeonItem
   },

   data: function () {
      return {
         isShow: true,
      };
   },
   
 

   computed: {
      isLogin () {
         return this.$store.getters['auth/getLogin']
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
      }
     
   }
}
</script>

<style>
   @import "Nav.css";
</style>