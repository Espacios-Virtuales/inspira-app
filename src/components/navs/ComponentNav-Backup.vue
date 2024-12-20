<template>
   <nav class="navbar navbar-light sm-light">
      <div class="navbar-nav" v-if="isLogin">
         <ul class="nav justify-content-start">
            <li class="nav-item mx-auto">
               <router-link class="button-white button5" to="/">
                  <i class="isDisabled text-dark">
                     <font-awesome-icon icon="home" />
                  </i>
               </router-link>
            </li>
         </ul>
      </div>

      <div class="navbar-nav justify-content-end" v-if="isLogin">
         <ul class="nav justify-content-end">
            <li class="nav-item mx-auto">
               <router-link class="button-purple button5" to="/perfil">
                  <i class="isDisabled">
                     <font-awesome-icon icon="user" />
                  </i>
               </router-link>
            </li>
            <li class="nav-item mx-auto">
               <a class="button-red button5" @click.prevent="logOut">
                  <font-awesome-icon icon="door-open" />
               </a>
            </li>
         </ul>
      </div>
   </nav>
</template>

<script>
export default {
   name: "ComponentNav",

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
      logOut() {
         this.$store.dispatch('auth/logout');
         this.$router.push('/login');
      },
   }
}
</script>

<style>
   @import "Nav.css";
</style>