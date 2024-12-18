<template>
   <div class="categories">
      <div class="p-2 d-flex flex-column">
         <div class="p-2 dashboard-margin">
            <DashBoardClients />
         </div>
         <div class="p-2 mx-auto py-4 w-100">
            <div class="well align-self-center">
               <ObjectTicket />
            </div>   
         </div>
      </div>
   </div>
</template>

<script>
   import ObjectTicket from '@/components/objects/ObjectTicket.vue'   
   import DashBoardClients from '@/components/analitics/DashBoardClients.vue'

   export default {
      name: "TicketsDetails",
      components: {
         ObjectTicket,
         DashBoardClients
      },
   };
</script>
