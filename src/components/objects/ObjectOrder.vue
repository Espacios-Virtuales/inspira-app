<template>
    <div class="order">  
        
        <div v-if="msg" class="py-4 my-2 alert alert-success text-center">
            {{msg}}
        </div>

        <div v-if="error" class="py-4 my-2 alert alert-danger text-center">
            {{error}}
        </div>           

        <div class="p-4">
            <h3 class="text-center text-bold">Orden Detalle: {{ order.id }} </h3>    
        </div>

       <div class="column-xl">        
            <div class="card ">
            
                <div class="row">
                    <div class="col">
                        <ul class="list-group">
                            <li class="list-group-item">Cantidad de Productos: </li>
                            <li class="list-group-item">Hora de ingreso:</li>
                            <li class="list-group-item">Estado: </li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul class="list-group fst-italic">
                            <li class="list-group-item">{{ entries.length }}</li>
                            <li class="list-group-item">{{ order.timeAt }} </li>
                            <li class="list-group-item">{{ order.status }}</li>
                        </ul>
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
                                    <div class="row">
                                        <div class="col" v-if="td.ingredients.length > 0" >
                                            <ul  v-for="i in td.ingredients" :key="i">
                                                <li> {{ i.name }}</li>
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <button @click="addIngredients(td.id)"  class="btn btn-sm btn-primary btn-block" :disabled="loading">
                                                <font-awesome-icon icon="plus" />  
                                            </button>
                                        </div>
                                    </div>
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
import http from "@/utils/http-common.js";
import authHeader from '@/services/auth-header';
import order from "../../model/order/Order.js";

export default {    
    name: "ObjectOrder",
    data(){
      return {
        columns: [
            {name: 'name', text: 'Nombre'},
            {name: 'quantity', text: 'Cantidad'},
            {name: 'price', text: 'Precio'},
            {name: 'ingredients', text: 'Ingredientes'},
        ],
        entries: [], 
        order
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
        const itemId = computed(() => route.query.itemId);

        const msg = computed(() => route.query.msg);

        return { id, error, msg, total, itemId }
    },

    created(){
        if(this.id != null ){
            this.getData().then(res => {
                this.order = res.data.order
                this.entries = this.order.orderItems
                console.log(this.order)
                this.getotal()
            }).catch((res) => {
            console.log(res)
        });
        }
    },
    methods: {
        async getData(){
            const res = await http.get('/order/show/' + this.id, { headers: authHeader() }) 
            return res
        },
        addIngredients(itemId){
            this.$router.push({ path: '/orden/agregar-ingredientes', query: { itemId: itemId }})
        },
    }
}
</script>

<style >
@import "Objects.css";
</style>