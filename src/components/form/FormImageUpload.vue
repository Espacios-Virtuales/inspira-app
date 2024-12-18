<template>
    <div class="margin-form py-4 ">
      <div class="card">

        <div class="col-sm-12 py-4">
          <div class="well align-self-center">
              <div class="card-header bg-purple-1 text-white"> <h3 class="text-center py-4"> Subir Imagen </h3> </div>    
          </div>
        </div>
        
        <div class="card-body text-center text-white py-4">
        <div v-if="previewImage" >
          <div class="text-center">
            <img class="preview my-3 " :src="previewImage" :style="'width:50%'" alt="" />
          </div>
        </div>

        <div v-if="currentImage" class="progress my-2">
          <div
            class="progress-bar progress-bar-info"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: progress + '%' }"
          >
            {{ progress }}%
          </div>
        </div>
        <div v-if="message" class="alert alert-secondary" role="alert">
          {{ message }}
        </div>

         <div class="row my-4 text-center">
            <div class="col-8">
              <label class="form-label" >
                <input
                  type="file"
                  accept="image/*"
                  ref="file"
                  @change="selectImage"
                />
              </label>
            </div>
          <div class="col-4 my-4">
            <button
              class="btn btn-lg btn-primary float-right"
              :disabled="!currentImage"
              @click="upload"
            >
              Subir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import UploadService from "@/services/upload-files-service.js";

export default {
  name: "FormImageUpload",
  data() {
    return {
        currentImage: undefined,
        previewImage: undefined,
        progress: 0,
        message: "",
        imageInfos: [],
    };
  },
  setup() {
    const route = useRoute();
    const id = computed(() => route.query.id);
    return {
         id
      };
  },

  mounted() {
    UploadService.getFiles().then(response => {
      this.imageInfos= response.data;
    });
  },

  methods: {
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },
    upload() {
      this.progress = 0;
      UploadService.upload(this.id, this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.msg;
          this.$router.push({ path: '/producto/plato-detalle', query: { id: this.id, msg: this.message} })
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "No se pudo subir la imagen! " + err;
          this.currentImage = undefined;
        });
    },
  }
};
</script>