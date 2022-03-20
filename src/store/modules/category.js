import axios from 'axios'
export default {
  namespaced:true,
  state:{
    categories:null,
    response:null,
    paginate:null,
    isLoading: true,
  },
  mutations:{
    SET_CATEGORIES(state,data){
      state.categories = data
    },
    RESPONSE (state, response) {
      state.response = response;
    },
    SET_PAGINATE(state,data){
      state.paginate = data
    },
     IS_LOADING(state,data){
      state.isLoading = data
    },
  },
  getters:{
    categories (state) {
      return state.categories 
    },
    paginate (state) {
      return state.paginate 
    },
    isLoading (state){
      return state.isLoading
    },
     response(state){
      return state.response
    },
  },
  actions:{
    async get({dispatch,commit},query){
      commit('IS_LOADING', true)
      let response = await axios.get('categories',{params:query});
      if(response.data.success){
        commit('IS_LOADING', false)
        commit('SET_CATEGORIES', response.data.data)
        commit('SET_PAGINATE', response.data.paginate)
      }
      return response.data
    },
    async create({dispatch,commit},data){
      let response = await axios.post('category/store',data);
      dispatch('get');
      return response.data;
    },
    async edit({dispatch,commit},ID){
      //console.log(ID)
      let response = await axios.get('category/edit/'+ID);
      return response.data
    },
    async update({dispatch,commit},data){
      let response = await axios.post('category/update',data.form);
      if(response.data.success){
        //commit('SET_USER', response.data.data)
      }
      dispatch('get');
      return response.data;
    },
    
    async delete({dispatch,commit},data){
      //console.log(data)
      let response = await axios.post('category/delete', data);
      dispatch('get');
      return response.data
    },
  },
}