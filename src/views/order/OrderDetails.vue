<template>
   <div class="order-detail">
        <div class="row">
            <div class="col-sm-12 my-auto mx-2 py-4">
               <DashBoardOrders />
            </div>

            <div class="col-sm-12 my-4 mx-auto py-4">
               <div class="well align-self-center">
                    <ObjectOrder />
               </div>   
            </div>
        </div>
   </div>
</template>

<script>
   import DashBoardOrders from '@/components/analitics/DashBoardOrders.vue'
   import ObjectOrder from '@/components/objects/ObjectOrder.vue'   

   export default {
      name: "OrderDetails",
      components: {
        DashBoardOrders,
        ObjectOrder,
      },
   };
</script>