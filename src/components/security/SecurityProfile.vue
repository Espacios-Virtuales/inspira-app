<template>
  <div class="container-1">
    <div class="col-sm-8 mx-auto py-4"> 
      <div class="card"> 
        <div class="card-header">   
          <h3>
            <strong>{{currentUser.username}}</strong> Profile
          </h3>
        </div>
        <div class="card-body ">                
          <div class="row">
            <div class="col">
                <ul class="list-group">
                  <li class="list-group-item">Email: </li>
                  <li class="list-group-item">Habilitado:</li>
                  <li class="list-group-item">Autorizaciones:</li>
                </ul>
            </div>
            <div class="col">
              <ul class="list-group fst-italic">
                <li class="list-group-item"> {{currentUser.user.username}} </li>
                <li class="list-group-item"> 
                  <div >
                    <div class="row">
                      <div class="col">
                          <font-awesome-icon  icon="times" v-if="currentUser.user.enabled == false" />  
                          <font-awesome-icon  icon="check"  v-if="currentUser.user.enabled == true"/>
                      </div>
                    </div>
                  </div>
                </li>
                <ul class="list-group">
                  <li class="list-group-item" v-for="item in currentUser.user.authorities" :key="item">{{item.authority}}</li>          
                </ul>
              </ul>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SecurityProfile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  }
};
</script>