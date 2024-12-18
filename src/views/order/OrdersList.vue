<template>
   <div class="categories">
         <div class="row">                        
            <div class="dashboard-margin">
               <DashBoardOrders  />
            </div>
            
            <div class="col-sm-12 mx-2 py-4">
               <div class="well align-self-center">
                  <DataTableOrders />
               </div>   
            </div>
         </div>
   </div>
</template>

<script>
   import DataTableOrders from '@/components/tables/DataTableOrders.vue'   
   import DashBoardOrders from '@/components/analitics/DashBoardOrders.vue'

   export default {
      name: "OrdersList",
      components: {
         DataTableOrders,
         DashBoardOrders 
      },
   };
</script>
