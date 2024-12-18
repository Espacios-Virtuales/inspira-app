<template>
    <div class="client-form">
        <div class="py-4 margin-form">
            <div class="card">
                <div v-if="error" class="py-4 my-2 alert alert-danger ">
                    {{error}}
                </div>

			    <div class="card-header bg-purple-1 text-white"><h3 class="py-2">Crear Cliente</h3></div>
                
                <Form class="card-body bg-purple-1 text-center text-white py-4" @submit="onSubmit" :validation-schema="schema" 
                    :initial-values="client">

                    <div class="form-group row py-4" v-if="client.id">
                        <Field type="hidden" name="id" class="form-control" :value="client.id" />
                    </div>


                    <div class="form-group row py-4">
                        <label for="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col">
                            <Field type="text" name="email" class="form-control" />
                            <ErrorMessage name="email" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="firstName" class="col-sm-2 col-form-label">Nombre</label>
                        <div class="col">
                            <Field type="text" name="firstName" class="form-control" />
                            <ErrorMessage name="firstName" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="lastName" class="col-sm-2 col-form-label">Apellido</label>
                        <div class="col">
                            <Field type="text" name="lastName" class="form-control" />
                            <ErrorMessage name="lastName" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="phoneNumber" class="col-sm-2 col-form-label">Telefono</label>
                        <div class="col">
                            <Field type="text" name="phoneNumber" class="form-control" />
                            <ErrorMessage name="phoneNumber" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
						<label for="gender" class="col-sm-2 col-form-label">Genero</label>
                        <div class="col">
                            <Field as="select" type="text"  name="gender" class="form-control form-select" >
                                <option value="" disabled>Seleccione un Genero</option>
                                <option :value="'MALE'">Masculino</option>
                                <option :value="'FEMALE'">Femenino</option>
                                <option :value="'OTHER'">Otro</option>
                            </Field>
                            <ErrorMessage name="paidMethod" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>                 


                    <div class="form-group row py-4">
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
                                                        <label class="col m-2" :for="`dpto_${idx}`">Dpto/Casa/Referencia </label>
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

                     <div v-if="id == null" class="form-group row py-4 float-end px-2">
                        <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            Crear
                        </button>
					</div>

                     <div v-if="id" class="form-group row py-4 float-end px-2">
                        <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            Actualizar
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
import http from "@/http-common";
import http2 from "@/http-common2";
import authHeader from '@/services/auth-header';
import client from "../../model/client/Client.js";


export default {
    name: "FormClient",

    components: {
        Form,
        Field,
        ErrorMessage,
        FieldArray
    },

     data(){
            const schema = yup.object().shape({
            email: yup.string().required("Ingrese un email").email("Ingrese un email valido"),
            firstName: yup.string().required("Ingrese Nombre"),
            lastName: yup.string().required("Ingrese Apellido"),
            phoneNumber: yup.string().required("Ingrese numero de telefono"),
            adresses : yup.array().of( 
                yup.object().shape({
                    street : yup.string().required("Ingrese direccion"),
                    number: yup.string().required("Ingrese numeración"),
                    dpto: yup.string().required("Ingrese dpto o casa"),
                    commune : yup.string().required("Seleccione comuna"),
                })
            ),  
        });
        return {
            loading: false,
            message: "",
            schema,
            client,
            error: null
        }
    },

     setup() {
        const route = useRoute();
        const id = computed(() => route.query.id);
        
        const province = ref([]);
        
        onMounted(async () => {
            const res2 = await http2.get('/provinces/show/24');
            province.value = res2.data.province;
            console.log(province.value)
        });

        return {
            id,
            province,
        };
    },

    created(){        
        if(this.id != null ){
            this.getData().then(res => {
            this.client = res.data.client
        }).catch((res) => {
            console.log(res)
        });
      }
    },

    methods: {

        async getData(){
            const res = http.get('/clients/show/' + this.id, { headers: authHeader() }) 
            return res
        },

        async onSubmit(client) {
        this.loading = true;
        http.post('/clients/save', client, { headers: authHeader() })
            .then(res => {
                const data = res.data.msg
                this.$router.push({ path: "/clientes", query: { msg : data } }) 
            })
            .catch(error => {
                this.loading = false;
                this.error = error.message;
            });
        }
    }
}
</script>