<template>
  <div class="container-1">
      <div class="col-sm-8 mx-auto py-4">        
        <div class="card text-center">
          <div class="card-header"><h1>Las Delicias</h1></div>
          <div class="card-body">
          <img
          id="profile-img"
          :src="userIcon"
          class="profile-img-card"
          />
          
          <Form @submit="handleLogin" :validation-schema="schema">
              <div v-if="!successful">
                <div class="form-group col py-2">
                  <Field type="email" name="email" class="form-control" placeholder="Email"/>
                </div>
                <div class="form-group col py-2 my-4">
                  <ErrorMessage name="email" class="alert alert-primary my-4" />
                </div>
                <div class="form-group col py-2">
                  <Field type="password" name="password" class="form-control"
                    placeholder="Contraseña" />
                </div>
                <div class="form-group col py-2 my-4">
                  <ErrorMessage name="password" class="alert alert-primary my-4" />
                </div>
                <div class="form-group py-4">
                  <br>
                  <button class="btn btn-lg btn-primary  btn-block" :disabled="loading">
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Ingresar
                  </button>
                </div>
              </div>
            </Form>
            <div
                  v-if="message"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                {{ message }}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "SecurityLogin",
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Ingrese email"),
      password: yup.string().required("Ingrese contraseña"),
    });

    return {
      loading: false,
      message: "",
      schema,
      userIcon: require('@/assets/icons/user.png'),
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/perfil");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/perfil");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>