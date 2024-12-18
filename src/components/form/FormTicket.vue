<template>
    <div class="ticket">
        <div class="margin-form py-4 ">
            <div class="card">

                <div v-if="error" class="py-4 my-2 alert alert-danger ">
                    {{error}}
                </div>

			    <div class="card-header bg-purple-1 text-white">
                    <h3 class="py-2">Crear Ticket</h3> 
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-outline-light" style="width: 200px" @click="activateSelectAdress()">
                                    Seleccionar Direccion Existente
                                </button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-outline-light" style="width: 200px"  @click="activateNewAdress()">
                                    Agregar nueva <br> direccion
                                </button>
                            </div>
                            
                        </div>
                </div>

                <Form class="card-body bg-purple-1 text-white py-4" @submit="onSubmit" :validation-schema="schema"
                    :initial-values="ticket">

                    <div class="form-group row py-4">
						<label for="description" class="col-sm-2 col-form-label">Descripcion</label>
                        <div class="col">
                            <Field type="text"  name="description" class="form-control" />
                            <ErrorMessage name="description" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
						<label for="observation" class="col-sm-2 col-form-label">Observacion</label>
                        <div class="col">
                            <Field type="text"  name="observation" class="form-control" />
                            <ErrorMessage name="observation" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
						<label for="paidMethod" class="col-sm-2 col-form-label">Medio de Pago</label>
                        <div class="col">
                            <Field as="select" type="text"  name="paidMethod" class="form-control form-select" >
                                <option value="" disabled>Seleccione un Medio de Pago</option>
                                <option :value="'TRANSFERENCIA'">Transferencia</option>
                                <option :value="'EFECTIVO'">Efectivo</option>
                                <option :value="'TRANSBANK'">Transbank</option>
                            </Field>
                            <ErrorMessage name="paidMethod" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>   

                    <div class="form-group row py-4">
						<label for="delivery" class="col-sm-2 col-form-label">Delivery</label>
                        <div class="col">
                            <Field as="select" type="text"  name="delivery" class="form-control form-select" >
                                <option value="" disabled>Seleccione una Opcion</option>
                                <option :value="true">Si</option>
                                <option :value="false">No</option>>
                            </Field>
                            <ErrorMessage name="delivery" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>                 
              
                    <div class="form-group row py-4">
						<label for="paidStatus" class="col-sm-2 col-form-label">Estado de Pago</label>
                        <div class="col">
                            <Field as="select" type="text"  name="paidStatus" class="form-control form-select" >
                                <option value="" disabled>Seleccione una Opcion</option>
                                <option :value="true">Si</option>
                                <option :value="false">No</option>>
                            </Field>
                            <ErrorMessage name="paidStatus" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>                 


                   <div class="form-group row py-4" v-if="newAdress">
                        <FieldArray name="adresses" v-slot="{ fields, push, remove }">
                           <div class="form-group row py-4">
                           
                           <div class="d-flex justify-content-lg-center mx-3" >
                                <button type="button" class="btn btn-outline-light" style="width: 200px" @click="push({street: '', number: '', dpto: '', region: '', province: '', commune: '' })">
                                    Agregar Direccion +
                                </button>
                           </div>

                            <fieldset v-for="(field, idx) in fields" :key="field.key" >
                                <div class="form-group row my-4 ">
                                    <legend class="col-sm-2 col-form-label fw-bold">Direccion #{{ idx + 1  }}</legend>
                                    <div class="col">
                                        <div class="row">

                                            <div class="form-group row py-4">
                                                <Field type="hidden" name="region" class="form-control" :value="province.region" />
                                            </div>

                                            <div class="form-group row py-4">
                                                <Field type="hidden" name="province" class="form-control" :value="province.name" />
                                            </div>

                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`street_${idx}`">Direccion </label>
                                                    </div>
                                                    <Field  class="col m-2 form-control" :id="`street_${idx}`" :name="`adresses[${idx}].street`" />
                                                    <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`adresses[${idx}].street`" />
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`number_${idx}`">Numero </label>
                                                    </div>
                                                    <Field  class="col m-2 form-control" :id="`number_${idx}`" :name="`adresses[${idx}].number`" />
                                                    <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`adresses[${idx}].number`" />
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`dpto_${idx}`">Dpto/Casa/Referencia</label>
                                                    </div>
                                                    <Field  class="col m-2 form-control" :id="`dpto_${idx}`" :name="`adresses[${idx}].dpto`" />
                                                    <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`adresses[${idx}].dpto`" />
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`commune_${idx}`">Commune</label>
                                                    </div>
                                                    <Field  as="select" type="text" class="col-4 m-2 form-control" :id="`commune_${idx}`" 
                                                        :name="`adresses[${idx}].commune`" >
                                                        <option value="" disabled>Seleccione Comuna</option>
                                                        <option v-for="c in province.communes" :key="c" :value="c.name">{{c.name}}</option>
                                                    </Field>
                                                    <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`adresses[${idx}].commune`" />
                                                </div>
                                            </div>

                                            <div class="col-1">
                                                <font-awesome-icon type="button" class="my-3" @click="remove(idx)" :icon="['fa', 'trash']" />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </fieldset>
                            </div>
                        </FieldArray>
                    </div>

                    <div class="form-group row py-4" v-if="selectAdress">
						<label for="adress" class="col-sm-2 col-form-label">Direcciones Disponibles</label>
                        <div class="col">
                            <Field as="select" type="text"  name="adress" class="form-control form-select" >
                                <option value="" disabled>Seleccione una direccion</option>
                                <option v-for="adress in client.adresses" :key="adress" :value="adress.id">{{adress.street}} {{adress.number }} / {{adress.dpto }} / {{adress.commune}}</option>
                            </Field>
                            <ErrorMessage name="adress" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <FieldArray name="items" v-slot="{ fields, push, remove }">
                           <div class="form-group row py-4">
                           
                           <div class="d-flex justify-content-lg-center mx-3">
                                <button type="button" class="btn btn-outline-light" style="width: 200px" @click="push({ productID: null, quantity: null, msg: '', quantityIngredients: null, })">
                                    Agregar Producto +
                                </button>
                           </div>

                            <fieldset v-for="(field, idx) in fields" :key="field.key">
                                <div class="form-group row my-4 ">
                                    <legend class="col-sm-2 col-form-label fw-bold">Producto #{{ idx + 1  }}</legend>
                                    <div class="col">
                                        <div class="row">
                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`productID_${idx}`">Producto</label>
                                                    </div>
                                                    <Field  as="select" type="text" class="col-4 m-2 form-control" :id="`productID_${idx}`" 
                                                        :name="`items[${idx}].productID`" >
                                                        <option value="" disabled>Seleccione un Producto</option>
                                                        <option v-for="p in products" :key="p" :value="p.id">{{p.name }} - {{ p.subcategory }} </option>
                                                    </Field>
                                                    <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`items[${idx}].productID`" />
                                                </div>
                                            </div>

                                            <Field type="hidden" class="col-4 m-2 form-control" :id="`quantity_${idx}`" 
                                                :name="`items[${idx}].quantity`"  :value="1"/>

                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`quantityIngredients_${idx}`" >Cantidad de ingredientes</label>
                                                    </div>
                                                    <Field as="select" type="text"  :name="`items[${idx}].quantityIngredients`" class="col-4 m-2 form-control" :id="`quantityIngredients_${idx}`" >
                                                        <option value="" disabled>Seleccione una cantidad</option>
                                                        <option v-for="n in listNum" :key="n" :value="n">{{ n }}</option>
                                                    </Field>
                                                    <ErrorMessage :name="`items[${idx}].quantityIngredients`" class="form-control alert alert-primary text-xs py-2 my-2" />
                                                </div>
                                            </div>

                                            <div class="col">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col m-2" :for="`msg_${idx}`">Comentario</label>
                                                    </div>
                                                     <Field  type="text" class="col-4 m-2 form-control" :id="`msg_${idx}`" 
                                                            :name="`items[${idx}].msg`" />
                                                </div>
                                            </div>

                                            <div class="col-1">
                                                <font-awesome-icon type="button" class="my-3" @click="remove(idx)" :icon="['fa', 'trash']" />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </fieldset>
                            </div>
                        </FieldArray>
                    </div>  
                    
                    <div class="form-group row py-4 float-end px-2">
                        <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            Crear
                        </button>
					</div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Form, Field, ErrorMessage, FieldArray} from "vee-validate";
import * as yup from "yup";
import http from "@/utils/http-common.js";
import authHeader from '@/services/auth-header';
import ticket from "../../model/ticket/Ticket.js";

export default {
    name: "FormTicket",

    components: {
        Form,
        Field,
        ErrorMessage,
        FieldArray
    },

    data(){
        // Validation Schema
        const schema = yup.object().shape({
            items: yup.array().of( 
                yup.object().shape({
                    productID: yup.number().typeError("Seleccione producto").integer().nullable(false),
                    quantityIngredients: yup.number().typeError("Seleccione una cantidad").integer().nullable(false),
                })
            ),  
            adresses : yup.array().of( 
                yup.object().shape({
                    street : yup.string().required("Ingrese una direccion"),
                    number: yup.string().required("Ingrese numeración"),
                    dpto: yup.string().required("Ingrese dpto"),
                    commune : yup.string().required("Seleccione comuna"),
                })
            ),  
            description: yup.string().required("Ingrese descripcion"),
            paidMethod: yup.string().required("Seleccione un medio de pago"),
            adress: yup.number().typeError("Seleccione direccion").integer().nullable(false),
            delivery: yup.bool().required().typeError("Seleccione opcion"),
            paidStatus: yup.bool().required().typeError("Seleccione opcion"),


        });
        return {

            loading: false,
            ticket,
            message: "",
            schema,
            error: null,
            newAdress : false,
            selectAdress : false,
            listNum: [ 1, 2, 3, 4, 5]
        }
    },

    setup() {
        const route = useRoute();
        const id = computed(() => route.query.id);
        const products = ref([]);
        const client = ref([]);
        const province = ref([]);
        const ingredients = ref([]);      
        
        onMounted(async () => {
            const res0 = await http.get('/clients/show/' + id.value , { headers: authHeader() });
            client.value = res0.data.client;
            console.log(client.value)
            
            const res1 = await http.get('/products/list', { headers: authHeader() });
            products.value = res1.data.products;

            const res2 = await http.get('/provinces/show/24');
            province.value = res2.data.province;

            const res3 = await http.get('/ingredients/list-availability', { headers: authHeader() });
            ingredients.value = res3.data.ingredients;
            
         });
        return {
            id,
            products,
            client,
            province,
            ingredients
        };
    },

    methods: {
      
      activateSelectAdress(){
        this.selectAdress = !this.selectAdress
        this.newAdress = false
        },

      activateNewAdress(){
        this.newAdress = !this.newAdress
        this.selectAdress = false
        },
      
      onSubmit(ticket) {
        
        ticket.client = this.client
        console.log(ticket);

        this.loading = true;
        http.post('/tickets/save', ticket, { headers: authHeader() })
            .then(res => {
                const msg = res.data.msg
                this.$router.push({ path: "/tickets", query: { msg: msg } }) 
            })
            .catch(error => {
                this.loading = false;
                this.error = error.message;
            });
        }
    }
}
</script>