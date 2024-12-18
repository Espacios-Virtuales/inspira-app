<template>
   <div>
      <button
         @click="toggleAccordion()"
         class="btn btn-light w-100"
         :aria-expanded="isOpen"
         :aria-controls="`collapse${_uid}`"
      >
      <slot name="title" />
   </button>
   
   <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
   </div>
</div>
</template>

<script>
export default {
   data() {
      return {
      isOpen: false,
      };
   },

   methods: {
      toggleAccordion() {
         this.isOpen = !this.isOpen;
      },
   },
};
</script>

<style>
   @import "Accordeon.css"
</style>