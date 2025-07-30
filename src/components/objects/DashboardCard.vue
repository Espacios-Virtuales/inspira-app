<!-- src/components/DashboardCard.vue -->
<template>
    <div class="col-md-6 col-lg-4">
      <router-link :to="to" class="text-decoration-none">
        <div class="card shadow-sm h-100 hover-card text-center p-4">
          <i :class="`bi ${icon} display-4 text-primary mb-3`"></i>
          <h5 class="text-dark">{{ title }}</h5>
          <p class="text-muted small">{{ description }}</p>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardCard',
    props: {
      to: String,
      icon: String,
      title: String,
      description: String
    }
  };
  </script>
  
  <style scoped>
  .hover-card:hover {
    transform: scale(1.03);
    transition: 0.3s ease;
    cursor: pointer;
  }
  </style>
  