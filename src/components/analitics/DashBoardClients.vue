<template>
    <div class="dashboard-backoffice">        
        <div class="col-sm-12 mx-auto py-4 ">
            <div class="column-client py-4">        
            <div class="card border-info">
                <div class="row">
                    <div class="col">
                        <h3>10.630</h3>
                        <span class="font-weight-bold">Usuarios <br> activos</span>                        
                    </div>
                    <div class="col size-icon-m">
                        <i> 
                            <font-awesome-icon icon="user" />
                        </i> 
                    </div>
                </div>
                <div class="btn">
                    <a class="btn bg-transparent font-weight-bold"
                        data-mdb-ripple-color="light">
                        Ver más
                    </a>
                </div>
            </div>
            </div>

            <div class="column-client py-4">
            <div class="card border-success">
                <div class="row">
                    <div class="col">
                        <h3>10.630</h3>
                        <span class="font-weight-bold">Usuarios <br> nuevos</span>                        
                    </div>
                    <div class="col size-icon-m">
                        <i> 
                            <font-awesome-icon :icon="['fa', 'plus']" />
                        </i> 
                    </div>
                </div>
                <div class="btn">
                    <a class="btn bg-transparent"
                        data-mdb-ripple-color="light">
                        Ver más
                    </a>
                </div>
            </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {    
    name: "DashBoardClients"
}
</script>

<style >
@import "Dashboard.css";
</style>