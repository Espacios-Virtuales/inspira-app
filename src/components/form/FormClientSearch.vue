<template>
    <div class="search-client">
        <div class="margin-form py-4 ">
            <div class="card">

                <div v-if="error" class="py-4 my-2 alert alert-danger ">
                    {{error}}
                </div>

			    <div class="card-header bg-purple-1 text-white"><h3 class="py-2">Buscar Cliente</h3></div>
                
                <Form class="card-body bg-purple-1 text-center text-white py-4" @submit="onSubmit" :validation-schema="schema">

                    <div class="form-group row py-4">
                        <label for="email" class="col-sm-2 col-form-label">Ingrese Email</label>
                        <div class="col">
                            <Field type="text" name="email" class="form-control" />
                            <ErrorMessage name="email" class="form-control alert alert-primary text-xs py-2 my-2" />
                        </div>
                    </div>

                    <div class="form-group row py-4 float-end px-2">
                        <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            Buscar
                        </button>
					</div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import http from "@/http-common";
import authHeader from '@/services/auth-header';

export default {
    name: "FormClientSearch",

    components: {
        Form,
        Field,
        ErrorMessage,
    },

     data(){
            const schema = yup.object().shape({
            email: yup.string().required("Ingrese un email").email("Ingrese un email valido")
        });
        return {
            loading: false,
            message: "",
            schema,
            error: null
        }
    },
    
    methods: {
        onSubmit(client) {
        this.loading = true;
        http.post('/clients/show/email', client, { headers: authHeader() })
            .then(res => {
                const data = res.data.client.id
                console.log(data)
                this.$router.push({ path: "/ticket/form", query: { id : data } }) 
            })
            .catch(error => {
                this.loading = false;
                this.error = error.message;
            });
        }
    }
}
</script>