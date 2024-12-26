<template>
   <div class="home ">
      <div class="d-flex justify-content-start ">
         <div class="mx-auto">
            <img
               :src="ev"
               class="img-round-l" 
               alt=""
               />
         </div>
      </div>
      <div class="row">
         <div class="col"></div>
         <div class="col"></div>
         <div class="col"></div>
         <div class="col"></div>
      </div>
   </div>
</template>

<script>

export default {
   name: "HomeDetails",
   data () {
      return {
         ev: require('@/assets/icons/ev-icon.png'),
      }
   },

   components: {
      },
   };
</script>