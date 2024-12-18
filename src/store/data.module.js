export const data = {

    namespaced: true,
    
    state: () => ({
        date: '',
        id: null
    }),

    mutations: {
        setDate(state, date){
            state.date = date;
        },
        setID(state, id){
            state.id = id;
        }
    },

    actions: {
        
        setDate({ commit }, date){
            commit('setDate', date);
        },
        setId({ commit }, id){
            commit('setId', id);
        },
    },
    
    

}
