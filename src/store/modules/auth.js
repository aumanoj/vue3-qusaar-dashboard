import axios from 'axios'
export default {
  namespaced:true,
  state:{
    token:null,
    user:null,
    role:null,
    isLoading: true,
    response:null,
    error:false, 
  },
  mutations:{
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_USER(state,data){
      state.user = data
    },
    IS_LOADING (state, payload) {
      state.isLoading = payload;
    },
    /*RESPONSE (state, response) {
      state.response = response;
    },*/
    ERROR (state, error) {
      state.error = error;
    }
  },
  getters:{
    authenticated(state){
      return state.token || state.user
    },
    user (state) {
      return state.user 
    },
    isLoading (state){
      return state.isLoading
    },
    error(state){
      return state.error
    }
  },
  actions:{
    async signIn({dispatch,commit},credentials){
      //commit('IS_LOADING', true)
      commit('ERROR', false)
      let response = await axios.post('login',credentials).finally(() => commit('IS_LOADING', false));
      if(response.data.success){
        //console.log(response.data.token)
        //console.log(response.data.data.token)
        localStorage.setItem('token',response.data.data.token)
        return dispatch('attempt',response.data.data.token)
      } else{
        commit('ERROR', true)
      }
      return response.data;
    },
    async attempt({commit,state},token) {
      if(token){
       //console.log(token)
       commit('SET_TOKEN',token);
      }
      if(!state.token){
        return
      }
      try {
       let response = await axios.get('me',{
         headers:{
           'Authorization':'Bearer'+token
         }
        }).finally(commit('IS_LOADING', false));
       if(response.data.success){
        commit('SET_USER',response.data.data);
        //commit('SET_ROLE',response.data.data.role);
        return response.data;
       }else{
        localStorage.setItem('token',null)
        commit('SET_USER',null)
        commit('SET_TOKEN',null)   
       }
      } catch (error) {
      localStorage.setItem('token',null)
      commit('SET_USER',null)
      commit('SET_TOKEN',null)
      }
    },
    logout({commit}){
      commit('SET_USER',null)
      commit('SET_TOKEN',null)
      localStorage.setItem('token',null)
      window.location.assign('/login')
    },
  },
}