<template>
  <div class="navbar-component">
    <!-- Barra de anuncios -->
    <ComponentAnnouncement />
    <!-- Barra de navegación principal -->
    <div class="p-2 capa-2">
      <ComponentNav />
    </div>
    <!-- Sidebar -->
    <div class="p-2 capa-3">
      <ComponentSidebar v-if="isSidebarOpen" />
    </div>
  </div>
</template>

<script>
import ComponentSidebar from "@/components/sidebars/ComponentSidebar.vue";
import ComponentAnnouncement from "@/components/navs/ComponentAnnouncement.vue";
import ComponentNav from "@/components/navs/ComponentNav.vue";

export default {
  name: "LayoutNavbar",
  computed: {
    isSidebarOpen() {
      return this.$store.getters["layout/isSidebarOpen"];
    },
  },
  components: {
    ComponentAnnouncement,
    ComponentNav,
    ComponentSidebar,
  },
};
</script>
