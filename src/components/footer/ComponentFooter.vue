<!-- src/components/footer/ComponentFooter.vue -->
<template>
  <footer class="site-footer border-top shadow-lg mt-auto py-4">
    <div class="container">
      <div class="row align-items-center">
        <!-- Logo y nombre -->
        <div class="col d-flex align-items-center gap-3">
            <img :src="logoInspira" alt="Logo Espacios Virtuales" class="logo-footer" />
          <p class="mb-0">
            <strong>Espacios Virtuales</strong> — Tejiendo redes conscientes.
          </p>
        </div>

        <!-- Redes sociales u otros enlaces -->
        <div class="col footer-socials">
          <div class="row">
            <div class="col-auto">
              <a href="mailto:hola@espaciosvirtuales.org" title="Correo">
                <i class="bi bi-envelope-fill"></i>
              </a>
            </div>
            <div class="col-auto">
              <a href="https://espaciosvirtuales.org" target="_blank" rel="noopener" title="Sitio Web">
                <i class="bi bi-globe"></i>
              </a>
            </div>
            <div class="col-auto">
              <a href="https://instagram.com/espaciosvirtuales" target="_blank" rel="noopener" title="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ComponentFooter",
  data() {
    return {
      logoInspira: require("@/assets/icons/inspira-logo.png"),
    };
  }
};
</script>
