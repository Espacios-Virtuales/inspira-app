<template>
    <div class="ticket">  
        
        <div v-if="msg" class="py-4 my-2 alert alert-success text-center">
            {{msg}}
        </div>

        <div v-if="error" class="py-4 my-2 alert alert-danger text-center">
            {{error}}
        </div>           

        <div class="p-4">
            <h3 class="text-center text-bold">Ticket: {{ ticket.id }} </h3>    
        </div>

       <div class="column-xl">        
            <div class="card ">
            
                <div class="row">
                    <div class="col">
                        <ul class="list-group">
                            <li class="list-group-item">Nombre: </li>
                            <li class="list-group-item">Email:</li>
                            <li class="list-group-item">Numero de Ticket:</li>
                            <li class="list-group-item">Estado de Pago:</li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul class="list-group fst-italic">
                            <li class="list-group-item">{{ ticket.client.firstName }} {{ ticket.client.lastName }}</li>
                            <li class="list-group-item">{{ ticket.client.email }} </li>
                            <li class="list-group-item">{{ ticket.id }}</li>
                            <li class="list-group-item"> 
                                <div >
                                    <div class="row">
                                        <div class="col">
                                            <font-awesome-icon  icon="times" v-if="ticket.paidStatus == false" />  
                                            <font-awesome-icon  icon="check" v-if="ticket.paidStatus == true"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>  

       <div class="column-xl">        
            <div class="row">
                <div class="col">
                    <div class="d-grid gap-2">
                        <button @click="orderRender()" class="btn btn-outline-primary btn-lg" tag="button">
                            <font-awesome-icon  icon="eye" /> Orden                
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="column-xl">        
            <div class="card ">
                <div class="row">
                    <div class="col">
                        <h3 class="font-weight-bold">Productos</h3>                        
                    </div>
                </div>
                <div class="table-scrollable overflow-auto my-2">
                    <table class="table table:border secondary-5:border">
                        <thead>
                            <tr class="th-head">
                                <th v-for="th in tableHeader" :key="th" >
                                    <div class="between:flex center:items">
                                        <span class="h6 text-center">{{ th.text }}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody >                                                                                                                                                 
                            <tr v-for="td in tableData" :key="td" class="text-start">
                                <td>{{ td.product.name }}</td>
                                <td>{{ td.quantity }}</td>
                                <td>{{ td.product.price }}</td>
                                <td>
                                    <div class="col">
                                        <p  v-if="td.status == 'PARA_REPARTO'">Para Reparto</p>  
                                        <p  v-if="td.status == 'EN_REPARTO'">En Reparto</p>
                                        <p  v-if="td.status == 'COMPLETADO'">Eentregado</p>
                                    </div>
                                    <button @click="orderRender(td.id, td.status)"  class="btn btn-sm btn-primary btn-block" :disabled="loading">
                                        <font-awesome-icon icon="eye" />               
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="my-4">
                    <div class="alert alert-info alert-dismissible fade show">
                        <div class="row text-end">
                            <div class="col">
                                <ul class="list-group"> 
                                    <li class="list-group-item">Total: </li>
                                </ul>
                            </div>
                            <div class="col">
                                <ul class="list-group fst-italic">
                                    <li class="list-group-item">{{ total }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import http from "@/http-common";
import authHeader from '@/services/auth-header';
import ticket from "../../model/ticket/Ticket.js";

export default {    
    name: "ObjectTicket",
    data(){
      return {
        columns: [
            {name: 'name', text: 'Nombre'},
            {name: 'quantity', text: 'Cantidad'},
            {name: 'price', text: 'Precio'},
            {name: 'order', text: 'Orden'},
        ],
        entries: [], 
        ticket
        }
    },
    computed: {
        tableHeader() { 
            return this.columns
        },
        tableData() {
            return this.entries
        },
    },

    setup() {
        const error = ref(null);
        const total = ref(0);
        const route = useRoute();
  
        const id = computed(() => route.query.id);
        const msg = computed(() => route.query.msg);

        return { id, error, msg, total }
    },

    created(){
        if(this.id != null ){
            this.getData().then(res => {
                this.ticket = res.data.ticket
                this.entries = this.ticket.items
                console.log(this.ticket)
                this.getotal()
            }).catch((res) => {
            console.log(res)
        });
        }
    },
    methods: {
        async getData(){
            const res = await http.get('/tickets/show/' + this.id, { headers: authHeader() }) 
            return res
        },
        getotal(){
            for (let index = 0; index < this.entries.length; index++) {
                this.total += this.entries[index].product.price;
            }
        },
        orderRender(){
            this.$router.push({ path: '/orden-detalle', query: { id: this.ticket.orderId }})
        },
    }
}
</script>

<style >
    @import "Objects.css";
</style>