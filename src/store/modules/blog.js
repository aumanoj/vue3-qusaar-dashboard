import axios from 'axios'
export default {
  namespaced:true,
  state:{
    blogs:null,
    response:null,
    paginate:null,
    isLoading: true,
  },
  mutations:{
    SET_BLOGS(state,data){
      state.blogs = data
    },
    RESPONSE (state, response) {
      state.response = response;
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
     IS_LOADING(state,data){
      state.isLoading = data
    },
  },
  getters:{
    blogs (state) {
      return state.blogs 
    },
    sub_categories (state) {
      return state.sub_categories 
    },
    paginate (state) {
      return state.paginate 
    },
    categories (state) {
      return state.categories 
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
      let response = await axios.get('blogs',{params:query});
      if(response.data.success){
        //console.log(response.data.data)
        commit('IS_LOADING', false)
        commit('SET_BLOGS', response.data.data)
        commit('SET_SUB_CATEGORIES', response.data.sub_categories)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
      } else {
        commit('IS_LOADING', false)
        commit('SET_BLOGS', response.data.data)
        commit('SET_SUB_CATEGORIES', response.data.sub_categories)
        commit('SET_CATEGORIES', response.data.categories)
        commit('SET_PAGINATE', response.data.paginate)
      }
      return response.data
    },
    async create({dispatch,commit},data){
      let response = await axios.post('blog/store',data);
      return response.data;
    },
    async edit({dispatch,commit},ID){
      let response = await axios.get('blog/edit/'+ID);
      return response.data
    },
    async update({dispatch,commit},data){
      let response = await axios.post('blog/update',data);
      return response.data;
    },
    
    async delete({dispatch,commit},data){
      let response = await axios.post('blog/delete', data);
      return response.data
    },

    async searchQueryId({dispatch,commit},ID){
      let response = await axios.get('blog/search/'+ID);
      if(response.data.success){
        console.log(response.data)
         commit('SET_BLOGS', response.data.data)
          commit('SET_PAGINATE', response.data.paginate)
      }
      return response.dat
    },
  },
}