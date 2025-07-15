<template>
<transition name="sidebar-modern">
   <aside
         v-if="isSidebarOpen"
         id="sidebar-wrapper"
      >
         <nav class="sidebar__nav">
            <ul class="sidebar__list">
               <!-- Ajustes -->
               <li class="sidebar__item">
                  <router-link to="/admin/ajustes" class="nav-link">
                     <i class="bi bi-tools"></i> Ajustes
                  </router-link>
               </li>
               <!-- Descarga Masiva -->
               <li class="sidebar__item">
                  <button
                     class="nav-link"
                     data-bs-toggle="modal"
                     data-bs-target="#viewDetailsModal"
                     title="Descarga Masiva"
                  >
                     <i class="bi bi-book"></i> Descarga Masiva
                  </button>
               </li>
               <!-- Dashboard Admin -->
               <li v-if="isAdmin" class="sidebar__item">
                  <router-link to="/admin/usuarios" class="nav-link">
                     <i class="bi bi-people"></i> Gestión de Usuarios
                  </router-link>
               </li>
               <li v-if="isAdmin" class="sidebar__item">
                  <router-link to="/admin/analitica" class="nav-link">
                     <i class="bi bi-bar-chart"></i> Analítica
                  </router-link>
               </li>
               <!-- Dashboard Usuario -->
               <li v-if="isUser" class="sidebar__item">
                  <router-link to="/user/perfil" class="nav-link">
                     <i class="bi bi-person-circle"></i> Mi Perfil
                  </router-link>
               </li>
               <li v-if="isUser" class="sidebar__item">
                  <router-link to="/user/mis-datos" class="nav-link">
                     <i class="bi bi-folder"></i> Mis Datos
                  </router-link>
               </li>
            </ul>
         </nav>
         <!-- Botón de Cierre -->
         <div class="sidebar__close">
            <button
               class="btn-close-sidebar"
               @click="closeSidebar"
               title="Cerrar Sidebar"
            >
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
