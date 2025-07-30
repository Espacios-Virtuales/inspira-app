<!-- src/views/home/HomeDashboard.vue -->
<template>
  <div class="container py-4">
    <h2 class="mb-4">Panel</h2>
    <div class="row g-4">
      <DashboardCard
        v-for="item in filteredModules"
        :key="item.title"
        :to="item.to"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardCard from '@/components/objects/DashboardCard.vue'

export default {
  name: 'HomeDashboard',
  components: { DashboardCard },
  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin',
      isUser: 'auth/isUser'
    }),
    filteredModules() {
      const modules = [
        {
          title: 'Recursos',
          to: '/recursos',
          icon: 'bi-box2-heart',
          description: 'Gestión de recursos físicos y digitales.',
          roles: ['USER', 'ADMIN']
        },
        {
          title: 'Proyectos',
          to: '/proyectos',
          icon: 'bi-clipboard-data',
          description: 'Seguimiento de iniciativas territoriales.',
          roles: ['USER', 'ADMIN']
        },
        {
          title: 'Analítica',
          to: '/analitica',
          icon: 'bi-bar-chart-line-fill',
          description: 'Visualización de datos ambientales.',
          roles: ['USER', 'ADMIN']
        },
        {
          title: 'IoT / Sensores',
          to: '/sensores',
          icon: 'bi-broadcast-pin',
          description: 'Monitoreo con sensores físicos.',
          roles: ['USER', 'ADMIN']
        },
        {
          title: 'Educación',
          to: '/educacion',
          icon: 'bi-journal-richtext',
          description: 'Actividades y contenidos educativos.',
          roles: ['USER', 'ADMIN']
        },
        {
          title: 'Usuarios',
          to: '/admin/usuarios',
          icon: 'bi-people-fill',
          description: 'Gestión de usuarios.',
          roles: ['ADMIN']
        },
        {
          title: 'Configuración',
          to: '/admin/configuracion',
          icon: 'bi-gear-fill',
          description: 'Ajustes del sistema.',
          roles: ['ADMIN']
        }
      ];

      return modules.filter(m =>
        (this.isAdmin && m.roles.includes('ADMIN')) ||
        (this.isUser && m.roles.includes('USER'))
      );
    }
  }
};
</script>
