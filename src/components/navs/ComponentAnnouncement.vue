<template>
  <div class="announcement-bar text-white">
    <div class="container d-flex justify-content-between align-items-center">
      <button
        class="sidebar-toggle d-none d-lg-block"
        @click="toggleSidebar"
        :aria-expanded="isSidebarOpen"
      >
        <i class="bi bi-list"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentAnnouncement",

  computed: {
    announcementMessage() {
      return this.$store.getters["layout/announcementMessage"];
    },
  },

  methods: {
    toggleSidebar() {
      this.$store.dispatch("layout/toggleSidebar");
    },
  },
};
</script>


