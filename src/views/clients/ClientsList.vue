<template>
   <div class="clients">
      <div class="p-2 d-flex flex-column">
         <div class="p-2 dashboard-margin">
            <DashBoardClients />
         </div>
         <div class="p-2 mx-auto py-4 w-100">
            <div class="well align-self-center">
               <DataTableClients />
            </div>   
         </div>
      </div>
   </div>
</template>

<script>
   import DataTableClients from '@/components/tables/DataTableClients.vue'   
   import DashBoardClients from '@/components/analitics/DashBoardClients.vue'

   export default {
      name: "ClientsList",
      components: {
         DataTableClients,
         DashBoardClients
      },
   };
</script>
