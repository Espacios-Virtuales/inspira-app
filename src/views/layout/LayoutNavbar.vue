<template>
  <div class="navbar-component">
    <div class="d-flex flex-column">
      <div class="p-2 capa-3"><ComponentNav /></div>
      <div class="p-2 my-4 nav-show" ><ComponentNavPhone /></div>
      <div class="p-2 capa-3"><ComponentSidebar v-if="isShow"/></div>
    </div>
  </div>
</template>

<script>
import ComponentSidebar from "@/components/sidebars/ComponentSidebar.vue";
import ComponentNav from '@/components/navs/ComponentNav.vue';
import ComponentNavPhone from '@/components/navs/ComponentNavPhone.vue';

export default {
  name: "LayoutNavbar",
  data: function () {
      return {
        isShow: true,
      };
    },
  components: {
    ComponentNav, ComponentNavPhone, ComponentSidebar
  },
};
</script>

<style >
@import "Navbar.css";
</style>