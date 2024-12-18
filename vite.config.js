import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const algacss = require('alga-css')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), algacss({
    extract: ['./src/**/*.vue', './src/**/*.html', './src/**/*.svelte', './src/**/*.astro']
  })]
})
