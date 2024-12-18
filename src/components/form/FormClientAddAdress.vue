<template>
    <div class="client-form">
        <div class="py-4 margin-form">
            <div class="card">
                <div v-if="error" class="py-4 my-2 alert alert-danger ">
                    {{error}}
                </div>

			    <div class="card-header bg-purple-1 text-white"><h3 class="py-2">Direccion</h3></div>
                
                <Form class="card-body bg-purple-1 text-center text-white py-4" @submit="onSubmit" :validation-schema="schema" 
                    :initial-values="adress">

                    <div class="form-group row py-4" v-if="idAdress">
                        <Field type="hidden" name="id" class="form-control" :value="adress.id" />
                    </div>

                    <div class="form-group row py-4">
                        <Field type="hidden" name="region" class="form-control" :value="province.region" />
                    </div>

                    <div class="form-group row py-4">
                        <Field type="hidden" name="province" class="form-control" :value="province.name" />
                    </div>
    
                    <div class="form-group row py-4">
                        <label for="street" class="col-sm-2 col-form-label">Calle / Pasaje</label>
                        <div class="col">
                            <Field type="text" name="street" class="form-control" />
                            <ErrorMessage name="street" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="number" class="col-sm-2 col-form-label">Numero</label>
                        <div class="col">
                            <Field type="text" name="number" class="form-control" />
                            <ErrorMessage name="number" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="dpto" class="col-sm-2 col-form-label">Depto / Casa / Referencia</label>
                        <div class="col">
                            <Field type="text" name="dpto" class="form-control" />
                            <ErrorMessage name="dpto" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4">
                        <label for="commune" class="col-sm-2 col-form-label">Comuna</label>
                        <div class="col">
                            <Field  as="select" type="text" class="form-control" name="commune" >
                                <option value="" disabled>Seleccione Comuna</option>
                                <option v-for="c in province.communes" :key="c" :value="c.name">{{c.name}}</option>
                            </Field>
                            <ErrorMessage class="form-control alert alert-primary text-xs py-2 m-2" :name="`adresses[${idx}].commune`" />
                        </div>

                        
                    </div>

                    <div class="form-group row py-4 float-end px-2">
                        <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            Guardar
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
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import http from "@/http-common";
import http2 from "@/http-common2";
import authHeader from '@/services/auth-header';
import client from "../../model/client/Client.js";
import adress from "../../model/client/Adress.js";


export default {
    name: "FormClientAddAdress",

    components: {
        Form,
        Field,
        ErrorMessage,
    },

     data(){
            const schema = yup.object().shape({
            street: yup.string().required("Ingrese calle o pasaje"),
            number: yup.string().required("Ingrese numero"),
            dpto: yup.string().required("Ingrese dpto"),
            commune : yup.string().required("Ingrese una Comuna"), 
        });
        return {
            loading: false,
            message: "",
            schema,
            adress,
            client,
            error: null
        }
    },

     setup() {
        const route = useRoute();
        const id = computed(() => route.query.id);
        const idAdress = computed(() => route.query.idAdress);
        
        const province = ref([]);
        
        onMounted(async () => {
            const res2 = await http2.get('/provinces/show/24');
            province.value = res2.data.province;
        });

        return {
            id,
            province,
            idAdress
        };
    },

    created(){        
        if(this.id != null ){
            this.getData().then(res => {
            this.adress = res.data.adress
        }).catch((res) => {
            console.log(res)
        });
      }
    },

    methods: {

        async getData(){
            const res = http.get('/clients/show/address/' + this.idAdress, { headers: authHeader() }) 
            return res
        },

        onSubmit(adress) {
        this.loading = true;
        http.post('/clients/save/adress/' + this.id , adress, { headers: authHeader() })
            .then(res => {
                const msg = res.data.msg
                console.log(res)
                this.$router.push({ path: "/cliente-detalle", query: { msg : msg, id: this.id } }) 
            })
            .catch(error => {
                this.loading = false;
                this.error = error.message;
            });
        }
    }
}
</script>