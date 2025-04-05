<template>
  <div id="app">
    <LayoutNavbar></LayoutNavbar>
    <div class="container-fluid">
      <router-view/>
    </div>
    <ComponentFooter />

  </div>
</template>

<script>
import LayoutNavbar from "./views/layout/LayoutNavbar.vue";
import ComponentFooter from "@/components/footer/ComponentFooter.vue";
 
export default {
  name: "App",
  components: {
    LayoutNavbar,
    ComponentFooter

  },
 
 data(){
    return {
      shouldStick: false
    }
  },

  methods: {
    onStick(data) {
      console.log(data);
    },
  },
};   
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/sourcesanspro/v18/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNa7lqDY.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
</style>
