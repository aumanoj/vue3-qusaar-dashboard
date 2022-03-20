import axios from 'axios'
export default {
  namespaced:true,
  state:{
    categories:null,
    side_menus:null,
    response:null,
    paginate:null,
    isLoading: true,
  },
  mutations:{
  	SET_SIDE_MENUS(state,data){
      state.side_menus = data
    },
    /*SET_SUB_CATEGORIES(state,data){
      state.sub_categories = data
    },*/
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
    // sub_categories (state) {
    //   return state.sub_categories 
    // },
    paginate (state) {
      return state.paginate 
    },
    categories (state) {
      return state.categories 
    },
    side_menus (state) {
      return state.side_menus 
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
      let response = await axios.get('new-side-menus',{params:query});
      if(response.data.success){
        console.log(response.data)
        commit('SET_SIDE_MENUS', response.data.data)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
        commit('IS_LOADING', false)
      } else {
        commit('SET_SIDE_MENUS', response.data.data)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
        commit('IS_LOADING', false)
      }
      return response.data
    },
    async create({dispatch,commit},data){
      let response = await axios.post('new-side-menu/store',data);
      dispatch('get');
      return response.data;
    },
    async edit({dispatch,commit},ID){
      //console.log(ID)
      let response = await axios.get('new-side-menu/edit/'+ID);
      return response.data
    },
    async update({dispatch,commit},data){
      let response = await axios.post('new-side-menu/update',data);
      dispatch('get');
      return response.data;
    },
    
    async delete({dispatch,commit},data){
      let response = await axios.post('new-side-menu/delete', data);
      dispatch('get');
      return response.data
    },
  },
}
