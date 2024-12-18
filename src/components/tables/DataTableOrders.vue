<template>
   <div class="DataBaseProducts">

      <div v-if="msg" class="py-4 my-2 alert alert-success text-center">
         {{msg}}
      </div>

      <div v-if="error" class="py-4 my-2 alert alert-danger text-center">
         {{error}}
      </div>

      <div class="col-sm-12 py-4">
         <div class="well align-self-center">
            <h3 class="text-center py-4">Listado de {{productCat.name}}</h3>      
         </div>
         <span v-show="loading" class="spinner-border spinner-border-sm" ></span>
      </div>

      <div class="col-sm-12 py-4">
         <div class="row">
            <div class="col" v-if="productCat.type == 'PLATE'">
               <div class="d-grid gap-2">
                  <button @click="clickCreate(productCat.type)" class="btn btn-outline-primary btn-lg" tag="button">
                     Crear <font-awesome-icon  icon="plus-circle" />               
                  </button>
               </div>
            </div>
            <div class="col" v-if="productCat.type == 'DRINK'">
               <div class="d-grid gap-2">
                  <button @click="clickCreate(productCat.type)" class="btn btn-outline-primary btn-lg" tag="button">
                     Crear <font-awesome-icon  icon="plus-circle" />
                  </button>
               </div>
            </div>
         </div>
      </div>
      
      <div class="between:flex bottom:margin-3">
         <div class="center:flex-items">
            <span class="right:margin-1">Show</span>
            <select v-model="currentEntries" class="select" @change="paginateEntries">
               <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
            </select>
            <span class="left:margin-1">entries</span>
         </div>
         <div class="end:flex">
            <input type="search" class="input px:width-25" placeholder="Search here..." v-model="searchInput" @keyup="searchEvent">
         </div>
      </div>

      <div class="table-scrollable overflow-auto"> 
         <table class="table table:border secondary-5:border">
            <thead>
               <tr class="th-head">
                  <th v-for="th in tableHeader" :key="th" >
                     <div class="between:flex center:items">
                        <span class="h6 text-center">{{ th.text }}</span>
                        <span @click.prevent="sortByColumn(th.name)">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter none:event" viewBox="0 0 16 16">
                              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                           </svg>
                        </span>
                     </div>
                  </th>
               </tr>
               <tr>
                  <td>#</td>
                  <td><input type="search" class="input" placeholder="Filtrar nombre ..." v-model="col.name" @keyup="filterByColumn"></td>
                  <td>
                     <select class="select" v-model="col.subcategory" @change="filterBycolumn">
                        <option value="">-- Filtrar subcategoria -- </option>
                        <option v-for="cd in uniqColumnData('subcategory')" :key="cd" :value="cd">{{ cd }}</option>
                     </select>
                  </td>
                  
                  <td><input type="search" class="input" placeholder="Filtrar precio ..." v-model="col.price" @keyup="filterByColumn"></td>

                  <td>
                     <select class="select" v-model="col.availability" @change="filterBycolumn">
                        <option value="">-- Filtrar disponibilidad -- </option>
                        <option v-for="cd in uniqColumnData('availability')" :key="cd" :value="cd">{{ cd }}</option>
                     </select>
                  </td>

                  <td>#</td>
                  <td>#</td>
               </tr>
            </thead>
            <tbody>
               <tr v-for="td in tableData" :key="td">
                  <td>   
                     <font-awesome-icon  @click="clickDetails(td.id, td.type)" icon="eye" />               
                  </td>
                  <td>{{ td.name }}</td>
                  <td>{{ td.subcategory }}</td>
                  <td>{{ td.price }}</td>
                  <td>
                     <div class="row">
                        <div class="col">  
                           <font-awesome-icon  icon="check"  v-if="td.availability == true"/>
                           <font-awesome-icon  icon="times"  v-if="td.availability == false"/>                            
                        </div>
                        <div class="col">
                           <button @click="state(td.id)"  class="btn btn-sm btn-primary btn-block" :disabled="loading">
                              Cambiar
                           </button>
                        </div>
                     </div>
                  </td>
                  <td>   
                     <font-awesome-icon  @click="clickUpdate(td.id, td.type)" icon="pen" />               
                  </td>
                  <td>
                     <button @click="deleteProduct(td.id)" type="button" name="eliminar"><font-awesome-icon icon="trash" /></button>
                  </td>
               </tr>
            </tbody> 
         </table>
      </div>
      
      <div class="between:flex y:margin-3">
         <div class="start:flex-items">Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }} entries</div>
         <div class="end:flex">
            <ul class="pagination:nav">
               <li :class="['nav-item', {'disable': currentPage === 1}]">
                  <a href="#" class="nav-link" @click.prevent="currentPage = 1">Primera </a>
               </li>
               <li :class="['nav-item', {'disable': currentPage === 1}]">
                  <a href="#" class="nav-link" @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 
                  1, paginateEntries()">Prev</a>
               </li>
               <li v-for="pagi in showPagination" :key="pagi" :class="['nav-item', {'elipsis': pagi === '...', 'active': pagi === currentPage}]">
                  <a href="#" class="nav-link" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>                  
               </li>
               <li :class="['nav-item', { 'disabled': currentPage === allPages }]">
                  <a href="#" class="nav-link" @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 
                     1, paginateEntries()">Next</a>
               </li>
               <li :class="['nav-item', { 'disabled': currentPage === allPages }]">
                  <a href="#" class="nav-link" @click.prevent="currentPage = allPages, paginateEntries()">Ultima</a>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script>
import * as $ from 'alga-js';
import http from "@/http-common";
import authHeader from '@/services/auth-header';
import { computed } from "vue";
import { useRoute } from "vue-router";
import productCat from "../../model/storage/ProductCat.js";


export default {
   name: 'DataTableProducts',
   data(){
      return {
         columns: [
            {name: 'view', text: 'Ver'},
            {name: 'name', text: 'Nombre'},
            {name: 'subcategory', text: 'Subcategoria'},
            {name: 'price', text: 'Precio'},
            {name: 'availability', text: 'Disponibilidad'},
            {name: 'edit', text: 'Editar'},
            {name: 'delete', text: 'Eliminar'},
         ],
         entries: [], 
         currentEntries: 10,
         filteredEntries: [],
         showEntries: [5, 10, 15, 25, 50, 72, 100],
         currentPage: 1,
         allPages: 1,
         searchInput: '',
         searchEntries: [],
         col: {
            name: '',
            subcategory: '',
            price: '',
            availability: '',
         },
         sortcol: {
            name: '',
            subcategory: '',
            price: '',
            availability: '',
         },
         productCat,
         loading: false,
         error: null

      }
   },  
   
   setup() {
      const route = useRoute();
      const msg = computed(() => route.query.msg);
      const idCat = computed(() => route.params.id);
      
      return {
         idCat,
         msg
      };
   },

   computed: {
      
      showInfo() {
         return $.array.show(this.getCurrentEntries(), this.currentPage, this.currentEntries)
      },
      
      showPagination(){
         return $.array.pagination(this.allPages, this.currentPage, 3)
      },  
      
      tableHeader() { 
         return this.columns
      },
      
      tableData() { 
         return this.filteredEntries
      }, 
   },

   created(){
      this.getData().then(res => {
         this.entries = res.data.category.items
         this.productCat = res.data.category
         this.paginateData(this.entries)
         
      }).catch((res) => {
         console.log(res)
      });
   },
   
   methods: {
      async getData(){
         const res = await http.get('/products/category/show/' + this.idCat, { headers: authHeader() }) 
         return res
      },

      paginateEntries(){
         if(this.searchInput.length >= 3){
            this.searchEntries = $.array.search(this.entries, this.searchInput)
            this.paginateData(this.searchEntries)
         }else{
            this.searchEntries = []
            this.paginateData(this.entries)
            this.col = {
               name: '',
               subcategory: '',
               price: '',
               availability: '',
            }  
         }
      },
      
      paginateEvent(page){
         this.currentPage = page
         this.paginateEntries()
      },
      
      searchEvent(){
         this.currentPage = 1
         this.paginateEntries()
      },
      
      paginateData(data) {
         this.filteredEntries = $.array.paginate(data, this.currentPage, this.currentEntries)
         this.allPages = $.array.pages(data, this.currentEntries)
      },
      
      getCurrentEntries(){
         return (this.searchEntries.length == 0) ? this.entries : this.searchEntries 
      },
      
      uniqColumnData(column){
         return $.array.unique(this.getCurrentEntries(), column)
      },
      
      filterBycolumn(){
         const filterCol = $.object.removeBy(this.col, '')
         let filterData = this.getCurrentEntries()
         if(Object.entries(filterCol).length >= 1) {
            filterData = $.array.filter(this.getCurrentEntries(), filterCol)
         }
         this.paginateData(filterData)
      },
      
      sortByColumn(column) {
         this.col = {
               name: '',
               subcategory: '',
               price: '',
               availability: '',
         }
         let sortedEntries = this.getCurrentEntries()
         const sortedColumn = this.sortcol[column]
         if(sortedColumn === '') {
            this.sortcol[column] = 'asc'
            sortedEntries = $.array.sortBy(this.getCurrentEntries(), column, 'asc')
         } else if(sortedColumn === 'asc') {
            this.sortcol[column] = 'desc'
            sortedEntries = $.array.sortBy(this.getCurrentEntries(), column, 'desc')
         } else if(sortedColumn === 'desc') {
            this.sortcol[column] = ''
         }
         this.paginateData(sortedEntries)
      },
      
      clickDetails(id, type){ 
         if(type == 'PLATE'){
            this.$router.push({ path: '/producto/plato-detalle', query: { id: id, idCat: this.idCat } })
         }
         if(type == 'DRINK'){
            this.$router.push({ path: '/producto/bebida-detalle', query: { id: id, idCat: this.idCat } })
         }
      
      },

      clickCreate(type){
         if(type == 'PLATE'){
            this.$router.push({ path: '/producto/plate/form', query: { idCat: this.idCat } })
         }
         if(type == 'DRINK'){
            this.$router.push({ path: '/producto/drink/form', query: { idCat: this.idCat } })
         }
      },

      clickUpdate(id, type){
         if(type == 'PLATE'){
            this.$router.push({ path: '/producto/plate/form', query: { id: id, idCat: this.idCat } })
         }
         if(type == 'DRINK'){
            this.$router.push({ path: '/producto/drink/form', query: { id: id, idCat: this.idCat } })
         }
      },
      async state(id){

         this.$swal({
            title: 'Confirmación.',
            text: "¿Quiere cambiar el estado del producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
         }).then((result) => {
            if (result.isConfirmed) {
               
               this.loading = true;
               let product = {id: id} 
               http.post('/products/state', product, { headers: authHeader() }) 
                  .then(res => {
                     const msg = res.data.msg
                     this.$router.push({ path: "/categoria/productos/" + this.idCat, query: { msg: msg } }) 
                     this.loading = false;
                     window.location.reload();
                  })
               .catch(error => {
                  this.$swal({
                     icon: 'error',
                     title: 'Hubo un error',
                     text: 'No se pudo cambiar el estado' 
                  })
                  this.loading = false;
                  this.error = error.message;
               });       
            }
         })
      },

      async deleteProduct(id){
         this.$swal({
            title: 'Confirmación.',
            text: "Una producto eliminado no se puede recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: "Cancelar"
         }).then((result) => {
            if (result.isConfirmed) {
               
               this.loading = true;
               let item = {id: id} 
               http.post('/products/delete', item,  { headers: authHeader() }) 
               .then(res => {
                  const msg = res.data.msg
                  this.$router.push({ path: "/categoria/productos/" + this.idCat, query: { msg: msg } }) 
                  this.loading = false;
                  window.location.reload();
               })
               .catch(error => {
                  this.$swal({
                     icon: 'error',
                     title: 'Hubo un error',
                     text: 'No se pudo eliminar el producto' 
                  })
                  this.loading = false;
                  this.error = error.message;
               });       
            }
         })
      },

   }
}
</script>

<style >
   @import "TableData.css";
</style>