<template>
   <div class="client-detail">
      <div class="p-2 d-flex flex-column">
         <div class="p-2 dashboard-margin">
            <DashBoardClients />
         </div>
         <div class="p-2 mx-auto py-4 w-100">
            <div class="well align-self-center">
               <ObjectClient />
            </div>   
         </div>
      </div>
   </div>
</template>

<script>
   import DashBoardClients from '@/components/analitics/DashBoardClients.vue'
   import ObjectClient from '@/components/objects/ObjectClient.vue'   

   export default {
      name: "ClientList",
      components: {
        DashBoardClients,
        ObjectClient,
      },
   };
</script>