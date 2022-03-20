import axios from 'axios'
export default {
  namespaced:true,
  state:{
    sub_categories:null,
    categories:null,
    paginate:null,
    response:null,
    isLoading: true,
  },
  mutations:{
    SET_SUB_CATEGORIES(state,data){
      state.sub_categories = data
    },
     SET_CATEGORIES(state,data){
      state.categories = data
    },
    SET_PAGINATE(state,data){
      state.paginate = data
    },
    RESPONSE (state, response) {
      state.response = response;
    },
     IS_LOADING(state,data){
      state.isLoading = data
    },
  },
  getters:{
    sub_categories (state) {
      return state.sub_categories 
    },
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
      let response = await axios.get('sub-categories',{params:query});
      if(response.data.success){
        console.log(response.data)
        commit('SET_SUB_CATEGORIES', response.data.data)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
        commit('IS_LOADING', false)
      }
      return response.data
    },
    async create({dispatch,commit},data){
      console.log(data)
      let response = await axios.post('subCat/store',data);
      dispatch('get');
      return response.data;
    },
    async edit({dispatch,commit},ID){
      //console.log(ID)
      let response = await axios.get('subCat/edit/'+ID);
      return response.data
    },
    async update({dispatch,commit},data){
      let response = await axios.post('subCat/update',data);
      dispatch('get');
      return response.data;
    },
    
    async delete({dispatch,commit},data){
      console.log(data)
      let response = await axios.post('subCat/delete', data);
      dispatch('get');
      return response.data
    },
  },
}