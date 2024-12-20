<template>
  <header id="masthead" class="site-header p-3 text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-between main-navigation"
      >
        <!-- Menú de Navegación -->
        <nav
          id="primary-menu"
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <ul class="nav-item">
            <li>
              <router-link to="/" class="nav-link px-2 rounded-icon">
                <i class="bi bi-house"></i>
              </router-link>
            </li>
            <li v-if="isLogin">
              <router-link to="/perfil" class="nav-link px-2">
                <i class="bi bi-person-circle"></i> Perfil
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Botones Responsive -->
        <div class="responsive-icons d-flex d-lg-none">
          <!-- Menú -->
          <button
            class="btn menu-toggle"
            @click="toggleMenu"
            aria-controls="primary-menu"
            aria-expanded="false"
            title="Toggle Menu"
          >
            <i class="bi bi-list"></i>
          </button>

          <!-- Sidebar -->
          <button
            class="btn sidebar-toggle"
            @click="toggleSidebar"
            :aria-expanded="isSidebarOpen"
          >
            <i class="bi bi-hdd"></i>
          </button>

          <!-- Usuario -->
          <router-link to="/perfil" class="btn user-icon ms-auto">
            <i class="bi bi-person-circle"></i>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ComponentNav",

  computed: {
    isMenuOpen() {
      return this.$store.getters["layout/isMenuOpen"];
    },
    isSidebarOpen() {
      return this.$store.getters["layout/isSidebarOpen"];
    },
  },

  methods: {
    toggleMenu() {
      this.$store.dispatch("layout/toggleMenu");
    },
    toggleSidebar() {
      this.$store.dispatch("layout/toggleSidebar");
    },
  },
};
</script>
