<template>
    <div class="plate-details">           
        <div v-if="msg" class="py-4 my-2 alert alert-success text-center">
            {{msg}}
        </div>

        <div v-if="error" class="py-4 my-2 alert alert-danger text-center">
            {{error}}
        </div>           

        <div class="column-xl">        
            <div class="card border-info">
                <div class="row">
                    <div class="col">
                        <h3>{{ client.firstName }}</h3>
                    </div>
                    <div v-if="!loading && imageExist ">
                        <img
                            :src="'http://localhost:8080/uploads/products/load/'+id"
                            class="img-round-l" 
                            alt=""
                        />
                    </div>
                    <div v-if="loading">
                        <span class="spinner-border spinner-border-sm"></span>
                    </div>
                    <div v-if="error || imageExist==false" >
                        <div class="alert alert-warning alert-dismissible fade show">
                            No hay imagen Disponible
                        </div>
                    </div>
                </div>
            </div>  

            <div class="col-sm-12 mx-auto py-4 ">
                <div class="row">
                    <div class="col">
                        <ul class="list-group">
                            <li class="list-group-item">Nombre: </li>
                            <li class="list-group-item">Apellido: </li>
                            <li class="list-group-item">Email: </li>
                            <li class="list-group-item">Telefono:</li>
                            <li class="list-group-item">Estatus:</li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul class="list-group fst-italic">
                            <li class="list-group-item"> {{ client.firstName }} </li>
                            <li class="list-group-item"> {{ client.lastName }} </li>
                            <li class="list-group-item">{{ client.email }}</li>
                            <li class="list-group-item">{{ client.phoneNumber }} </li>

                            <li class="list-group-item"> 
                                <div >
                                    <div class="row">
                                        <div class="col">
                                            <font-awesome-icon  icon="times" v-if="client.status == false" />  
                                            <font-awesome-icon  icon="check"  v-if="client.status == true"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>  

            <div class="table-scrollable overflow-auto" >
                <table class="table table:border secondary-5:border m-4" v-if="entries.length">
                    <thead>
                        <tr class="th-head">
                            <th v-for="th in tableHeader" :key="th" >
                                <div class="between:flex center:items">
                                    <span class="h6 text-center">{{ th.text }}</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="td in tableData" :key="td">
                            <td>{{ td.street }}</td>
                            <td>{{ td.number }}</td>
                            <td>{{ td.dpto }}</td>
                            <td>{{ td.commune }}</td>
                            <td>   
                                <font-awesome-icon  @click="clickUpdateAdress(td.id)" icon="pen" />               
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!entries.length" >
                    <div class="alert alert-warning alert-dismissible fade show">
                        No hay direcciones ingresadas
                    </div>
                </div>

                <button class="btn btn-sm btn-primary btn-block m-4 " @click="clickAddAdress">Agregar <font-awesome-icon  icon="plus-circle" /></button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import http from "@/utils/http-common.js";
import authHeader from '@/services/auth-header';
import client from "../../model/client/Client.js";

export default {    
    name: "ObjectClient",
    data(){
      return {
            columns: [
                {name: 'street', text: 'Calle'},
                {name: 'number', text: 'Numero'},
                {name: 'dpto', text: 'Dpto/Casa/Referencia'},
                {name: 'commune', text: 'Comuna'},
                {name: 'edit', text: 'Editar'},
            ],
            entries: [],
            client
        }
    },
    props: {
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
        const imageExist = ref(null);
        const loading = ref(true);
        const error = ref(null);
        const route = useRoute();
  
        const id = computed(() => route.query.id);
        const msg = computed(() => route.query.msg);


         onMounted(async () => {
            loading.value = true;

            await http.get('/uploads/clients/file-exist/'+id.value, { headers: authHeader() })    
                .then(res => {
                    imageExist.value = res.data.exist
                    }).catch((error) => {
                    error.value = error.message
                });
            
            loading.value=false;
        });
    return {
            id,
            imageExist,
            loading,
            error, 
            msg
        }
    },

    created(){        
      if(this.id != null ){
        this.getData().then(res => {
            this.client = res.data.client
            console.log(this.client)
            this.entries = res.data.client.adresses
            console.log(this.entries)
        }).catch((res) => {
            console.log(res)
        });
      }
    },

    methods: {
        async getData(){
            const res = await http.get('/clients/show/' + this.id, { headers: authHeader() }) 
            return res
        },
        clickUpdateAdress(idAdress){
           this.$router.push({ path: '/cliente/adress-form', query: { id: this.id, idAdress: idAdress } })
        
        },
        clickAddAdress(){
           this.$router.push({ path: '/cliente/adress-form', query: { id: this.id }})
        },
    }   
}
</script>

<style >
@import "Objects.css";
</style>