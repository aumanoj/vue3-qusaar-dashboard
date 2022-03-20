<template>
 
  <div class="q-py-sm">
    <div class="row q-col-gutter-sm q-px-sm">
      <div class="col-lg-4 col-md-4 col-xs-6 col-sm-12">
       <div class="text-h6">Dashboard</div>
      </div>
    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="col-md-5">
    <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);text-align:center">
      <q-card-section>
        <div class="text-h6">Category</div>
        <div class="text-subtitle2">{{paginateCategory.total}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      </q-card-section>
    </q-card>
    </div>

     <div class="col-md-5">
    <q-card dark bordered class="bg-grey-9 my-card" style="text-align:center">
      <q-card-section>
        <div class="text-h6">Post</div>
        <div class="text-subtitle2">{{paginatePost.total}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      </q-card-section>
    </q-card>
  </div>
   <div class="col-md-5">
    <q-card dark bordered class="bg-grey-9 my-card" style="text-align:center">
      <q-card-section>
        <div class="text-h6">Menu</div>
        <div class="text-subtitle2">{{paginateMenu.total}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      </q-card-section>
    </q-card>
    </div>
 
    <div class="col-md-5">
    <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);text-align:center">
      <q-card-section>
        <div class="text-h6">Side Menu</div>
        <div class="text-subtitle2">{{paginateSideMenu.total}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      </q-card-section>
    </q-card>
    </div>
   
    

  </div>
</template>


<script>
   import { api } from 'boot/axios'
   import {mapActions,mapGetters} from 'vuex'
    export default {
        data() {
            return {
        }
      },
      mounted(){
        //this.getCoupons()
      },
      created(){
         /*this.user= JSON.parse(localStorage.getItem('user'));
         console.log(this.user)*/  
      },
      computed:{
      /*...mapGetters({
        isLoading:'dashboard/isLoading',
      }),*/

       ...mapGetters({
        paginateMenu:'category/paginate',
        paginateSideMenu:'sidemenu/paginate',
        paginatePost:'blog/paginate',
        paginateCategory:'subCategory/paginate',
      }),
    },
      methods: {
          
        }
    }
</script>

<style scoped>
</style>

