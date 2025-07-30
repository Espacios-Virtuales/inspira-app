<template>
   <transition name="sidebar-modern">
      <aside v-if="isSidebarOpen" id="sidebar-wrapper">
         <nav class="sidebar__nav">
            <ul class="sidebar__list">
               <!-- Inicio -->
               <li class="sidebar__item">
                  <router-link to="/" class="nav-link">
                     <i class="bi bi-house-door-fill"></i> Inicio
                  </router-link>
               </li>

               <!-- Recursos -->
               <li class="sidebar__item">
                  <router-link to="/recursos" class="nav-link">
                     <i class="bi bi-box2-heart"></i> Recursos
                  </router-link>
               </li>

               <!-- Proyectos -->
               <li class="sidebar__item">
                  <router-link to="/proyectos" class="nav-link">
                     <i class="bi bi-clipboard-data"></i> Proyectos
                  </router-link>
               </li>

               <!-- Analítica Ambiental -->
               <li class="sidebar__item">
                  <router-link to="/analitica" class="nav-link">
                     <i class="bi bi-bar-chart-line-fill"></i> Analítica
                  </router-link>
               </li>

               <!-- IoT y Sensores -->
               <li class="sidebar__item">
                  <router-link to="/sensores" class="nav-link">
                     <i class="bi bi-broadcast-pin"></i> IoT / Sensores
                  </router-link>
               </li>

               <!-- Educación y Actividades -->
               <li class="sidebar__item">
                  <router-link to="/educacion" class="nav-link">
                     <i class="bi bi-journal-richtext"></i> Educación
                  </router-link>
               </li>

               <!-- Administración (Solo Admins) -->
               <li v-if="isAdmin" class="sidebar__item">
                  <router-link to="/admin/usuarios" class="nav-link">
                     <i class="bi bi-people-fill"></i> Usuarios
                  </router-link>
               </li>
               <li v-if="isAdmin" class="sidebar__item">
                  <router-link to="/admin/configuracion" class="nav-link">
                     <i class="bi bi-gear-fill"></i> Configuración
                  </router-link>
               </li>
            </ul>

         </nav>
         <!-- Botón de Cierre -->
         <div class="sidebar__close">
            <button class="btn-close-sidebar" @click="closeSidebar" title="Cerrar Sidebar">
               <i class="bi bi-x-lg"></i> Cerrar
            </button>
         </div>
      </aside>
   </transition>
</template>

<script>
export default {
   name: "ComponentSidebar",

   computed: {
      isSidebarOpen() {
         return this.$store.getters["layout/isSidebarOpen"];
      },
      isAdmin() {
         return this.$store.getters["auth/isAdmin"];
      },
      isUser() {
         return this.$store.getters["auth/isUser"];
      },
   },
   methods: {
      closeSidebar() {
         this.$store.dispatch("layout/closeSidebar");
      },
   },
};
</script>
