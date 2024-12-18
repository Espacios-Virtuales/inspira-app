import DashboardsService from '../services/dashboards-service';

export const dashboards = {

    namespaced: true,
    
    state: () => ({
        product: null,
        ingredient: null,
        salesDay: null
    }),

    mutations: {
        setProduct(state){
            state.product = DashboardsService.productCount;
        },
        setIngredient(state){
            state.ingredient = DashboardsService.ingredientCount;
        },
        setSalesDay(state){
            state.salesDay = DashboardsService.salesDayCount;
        }
    },
    
    actions: {
        
        updateProduct({ commit }){
            commit('setProduct');
        },
        UpdateIngredient({ commit }){
            commit('setIngredient');
        },
        updateSalesDay({ commit }){
            commit('setSalesDay');
        },
    }, 
}
