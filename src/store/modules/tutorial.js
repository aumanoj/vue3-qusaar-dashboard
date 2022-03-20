import axios from 'axios'
export default {
  namespaced:true,
  state:{
    sub_categories:null,
    categories:null,
    tutorials:null,
    response:null,
    paginate:null,
    isLoading: true,
  },
  mutations:{
  	SET_TUTORIALS(state,data){
      state.tutorials = data
    },
    SET_SUB_CATEGORIES(state,data){
      state.sub_categories = data
    },
    SET_PAGINATE(state,data){
      state.paginate = data
    },
    SET_CATEGORIES(state,data){
      state.categories = data
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
    paginate (state) {
      return state.paginate 
    },
    categories (state) {
      return state.categories 
    },
    tutorials (state) {
      return state.tutorials 
    },
    isLoading (state){
      return state.isLoading
    },
    response(state){
      return state.response
    },
  },
  actions:{
    async get({dispatch,commit}){
      commit('IS_LOADING', true)
      let response = await axios.get('tutorials');
      if(response.data.success){
        console.log(response.data)
        commit('SET_TUTORIALS', response.data.data)
        commit('SET_SUB_CATEGORIES', response.data.sub_categories)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
        commit('IS_LOADING', false)
      }
      return response.data
    },
    async create({dispatch,commit},data){
      let response = await axios.post('tutorial/store',data);
      dispatch('get');
      return response.data;
    },
    async edit({dispatch,commit},ID){
      //console.log(ID)
      let response = await axios.get('tutorial/edit/'+ID);
      return response.data
    },
    async update({dispatch,commit},data){
      let response = await axios.post('tutorial/update',data);
      dispatch('get');
      return response.data;
    },
    
    async delete({dispatch,commit},data){
      let response = await axios.post('tutorial/delete', data);
      dispatch('get');
      return response.data
    },
  },
}
