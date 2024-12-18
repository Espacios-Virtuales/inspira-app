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
            <h3 class="text-center py-4">Tickets</h3>      
         </div>
      </div>
      <div class="col-sm-12 py-4 text-center">
         <div class="well align-self-center">
            <div class="row">
               <div class="col">
                  <button @click="clickCreate()" class="btn btn-outline-primary btn-lg" tag="button">
                     Crear <font-awesome-icon  icon="plus-circle" />               
                  </button>
               </div>
               <div class="col">
                  <button @click="isOpen = true" class="btn btn-outline-primary btn-lg" tag="button">
                     Filtrar Fecha <font-awesome-icon  icon="calendar" />               
                  </button>
               </div>
            </div>
         </div>
      </div>

      <BaseModal :open="isOpen" @close="isOpen = !isOpen">
         <FormCalendar class="my-2" />
      </BaseModal>

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

            <td><input type="search" class="input" placeholder="Filtrar ID " v-model="col.id" @keyup="filterByColumn"></td>

            <td>
               <select class="select" v-model="col.paidMethod" @change="filterBycolumn">
                  <option value="">-- Filtrar Medio de Pago -- </option>
                  <option v-for="cd in uniqColumnData('paidMethod')" :key="cd" :value="cd">{{ cd }}</option>
               </select>
            </td>

            <td>
               <select class="select" v-model="col.paidStatus" @change="filterBycolumn">
                  <option value="">-- Filtrar Estado de Pago -- </option>
                  <option v-for="cd in uniqColumnData('paidStatus')" :key="cd" :value="cd">{{ cd }}</option>
               </select>
            </td>

            <td>
               <select class="select" v-model="col.createAt" @change="filterBycolumn">
                  <option value="">-- Filtrar Fecha -- </option>
                  <option v-for="cd in uniqColumnData('createAt')" :key="cd" :value="cd">{{ cd }}</option>
               </select>
            </td>

         </tr>
      </thead>
      <tbody>
         <tr v-for="td in tableData" :key="td">
        
           <td>   
               <font-awesome-icon  @click="clickDetails(td.id)" icon="eye" />               
            </td>

            <td>{{ td.id }}</td>
            <td>{{ td.paidMethod }}</td>
            <td>
               <div class="row">
                  <div class="col">  
                     <font-awesome-icon  icon="check"  v-if="td.paidStatus == true"/>
                     <font-awesome-icon  icon="times"  v-if="td.paidStatus == false"/>                                
                  </div>
                  <div class="col" v-if="td.paidStatus == false">
                     <button @click="state(td.id, td.paidStatus)"  class="btn btn-sm btn-primary btn-block" :disabled="loading">
                        Confirmar
                     </button>
                  </div>
               </div>
            </td>
                  
            <td>{{ td.createAt }}</td>

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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import * as $ from 'alga-js';
import http from "@/http-common";
import authHeader from '@/services/auth-header';
import BaseModal from '../modal/BaseModal.vue'
import FormCalendar from '../form/FormCalendar.vue'


export default {
   name: 'DataTableTickets',
   components:{
      BaseModal,
      FormCalendar
   },
   data(){
      return {
         columns: [
            {name: 'view', text: 'Ver'},
            {name: 'id', text: 'ID'},
            {name: 'paidMethod', text: 'Medio de Pago'},
            {name: 'paidStatus', text: 'Estado de Pago'},
            {name: 'createAt', text: 'Fecha de Creacion'},
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
            id: '',
            paidMethod: '',
            paidStatus: '',
            createAt: '',
         },
         sortcol: {
            id: '',
            paidMethod: '',
            paidStatus: '',
            createAt: '',
         },
         loading: false,
      }
   },  

   setup() {

      const route = useRoute();
      const paidStatus = computed(() => route.query.paidStatus);
      const msg = computed(() => route.query.msg);
      const isOpen = ref(false);

      return { isOpen, paidStatus, msg };
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
         this.entries = res.data.tickets
         this.paginateData(this.entries)
      }).catch((res) => {
         console.log(res)
      });

   },
   
   methods: {
      async getData(){
         let ticket = {paidStatus: this.paidStatus}
         const res = http.post('/tickets/list/status', ticket, { headers: authHeader() }) 
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
               id: '',
               paidMethod: '',
               paidStatus: '',
               createAt: '',
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
         console.log(filterCol)
         let filterData = this.getCurrentEntries()
         if(Object.entries(filterCol).length >= 1) {
            filterData = $.array.filter(this.getCurrentEntries(), filterCol)
         }
         this.paginateData(filterData)
      },
      
      sortByColumn(column) {
         this.col = {
            id: '',
            paidMethod: '',
            paidStatus: '',
            createAt: '',
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
      clickCreate(){
         this.$router.push({ path: '/cliente/buscar'})
      },
      clickDetails(id){ 
         this.$router.push({ path: '/ticket/detalle', query: { id: id} })      
      },
      async state(id, status){

         this.$swal({
            title: 'Confirmación.',
            text: "¿Quiere confirmar el pago del producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
         }).then((result) => {
            if (result.isConfirmed) {
               
               this.loading = true;
               let ticket = {id: id} 
               http.post('/ticket/state', ticket, { headers: authHeader() }) 
                  .then(res => {
                     const msg = res.data.msg
                     this.$router.push({ path: "/tickets", query: { msg: msg, paidStatus: status } }) 
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
   },

}

</script>

<style >
   @import "TableData.css";
</style>