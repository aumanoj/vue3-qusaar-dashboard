<template>
<div class="layout-padding">
  <div class="flex flex-center" v-if="isLoading">
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </div>
   <q-card  v-else>
       <q-card-section class="pb-0">
            <q-form id="form">
              <div class="flex flex-row justify-start items-center">
                <div class="flex-1">
                  <div class="q-mr-sm">
                    <div class="text-h6 text-weight-bold">{{$route.meta.headerTitle}}</div>
                  </div>
              </div>
                <!-- <div class="flex-1">
                  <div class="q-mr-sm">
                    <q-btn  color="primary" label="Add sidemenu" @click="formModal = true, createOrEdit = true,formReset()"/>
                  </div>
              </div> -->
        </div>
           </q-form>
         </q-card-section>
     <q-card-section>
        <div class="q-mb-sm" v-if="paginate!=null"><span class=" text-subtitle2">Showing:</span> {{paginate.from}} - {{paginate.to}} <span class=" text-subtitle2">Results:-</span> {{paginate.total}} </div>
    <table class="table">
      <thead>
        <tr>
          <th width="10%">S.NO</th>
          <th>Category</th>
          <th>Menu List</th>
          <th width="18%">Action</th>
        </tr>
      </thead>
      <tbody v-if="side_menus!=null">
        <tr v-for="(sidemenu,key) in side_menus" :key="key">
          <td>{{key + 1}}</td>
          <td>{{sidemenu.category.name}}</td>
          <td><span v-html="sidemenu.menu_list"></span></td>
          <td>
            <q-btn size="10px" color="primary" padding="8px" icon="fas fa-edit" class="text-primary" @click="formModal = true , createOrEdit = false, editForm(sidemenu.id)" />
            <q-btn size="10px" color="negative" padding="8px" class="q-ml-sm text-negative" icon="fas fa-trash-alt"  @click="deleteId(sidemenu.id)"/>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7"><div class="text-h6 text-weight-bold">No Record Found.</div></td>
        </tr>
      </tbody>
    </table>
    <vue-pagination v-if="paginate!=null" :paginate="paginate" :offset="15"/>
    </q-card-section>
</q-card>
  <q-dialog v-model="formModal" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">{{createOrEdit ? 'Create' : 'Update'}}</div>
        </q-card-section>
        <q-form @submit="createOrEdit ? createdForm() : updateForm()">
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-12 q-mb-md">
                <select v-model="form.category_id" class="form-control" @click="getTutorial()">
                  <option disabled value="">Select Category</option>
                    <option v-for="(category,index) in categories" :key="index" :value="category.id" >{{ category.name }}</option>
              </select>
            </div>
            <!-- <div class="col-12 q-mb-md">
                <select v-model="form.sub_category_id" class="form-control">
                  <option disabled value="">Select Sub Category</option>
                    <option v-for="(sub_category,index) in sub_categories" :key="index" :value="sub_category.id" >{{ sub_category.name }}</option>
              </select>
            </div> -->
            <!-- <div class="col-12">
              <q-input dense type="text" outlined v-model="form.title" label="Heading" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div> -->
            <!-- <div class="col-12">
              <q-input dense type="text" outlined v-model="form.title" label="Title" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
             
                 <q-input dense type="text" outlined v-model="form.url" label="Url" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div> -->
            <!-- <div class="col-12">
              <q-input dense type="text" outlined v-model="form.seo_title" label="Seo Title" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div> -->
            <div class="col-12">
             <!--  <q-input dense type="text" outlined v-model="form.url" label="Url" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/> -->
              <!--  <select v-model="form.url" class="form-control">
                  <option disabled value="">Select Url</option>
                    <option v-for="(url,index) in urls" :key="index" :value="url.id" >{{ url.title }}</option>
              </select> -->
            </div>
            <div class="col-12">
              <q-input dense type="textarea" outlined v-model="form.menu_list" label="List Menu" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <!-- <div class="col-12">
              <q-input dense type="number" outlined v-model.number="form.order_by" label="Order By" lazy-rules :rules="[ val => val && val.length!='' || 'This field is required']"/>
            </div> -->
            
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary q-mr-sm">
          <q-btn color="primary" type="submit" label="Submit"/>
          <q-btn color="secondary" label="Cancel" v-close-popup />
        </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
</div>
</template>
<script>
 import VuePagination from '../../components/vue-pagination'
 import {mapActions,mapGetters} from 'vuex'
export default {
  components: {
    VuePagination
  },
  data () {
    return {
      model: null,
      formModal: false,
      createOrEdit: true,
      form: {
        category_id: '',
        order_by: null,
        menu_list:null
      },
    }
  },
  computed:{
      ...mapGetters({
        side_menus:'newsidemenu/side_menus',
        sub_categories:'newsidemenu/sub_categories',
        categories:'newsidemenu/categories',
        paginate:'newsidemenu/paginate',
        isLoading:'newsidemenu/isLoading',
      }),
    },
  mounted(){
    this.get(this.$route.query)
  },
  watch:{
    $route(to,from){
      this.get(this.$route.query)
    }
  },
  methods: {
    ...mapActions({
      get:'newsidemenu/get',
      create:'newsidemenu/create',
      edit:'newsidemenu/edit',
      update:'newsidemenu/update',
      delete:'newsidemenu/delete',
    }),
    formReset(){
        const form = this.form
        for (const [key, value] of Object.entries(form)) {
           form[key]=''
        }
      },
    createdForm () {
      //console.log(this.form)
      this.$q.loading.show()
          this.create(this.form)
      .then(response => {
        if (response.success) {
          this.formModal = false
          this.$q.loading.hide()
          this.$q.notify({
            message: response.message,
          })
        }
        
      }).finally(() => {
            this.$q.loading.hide()
          });
    },
    editForm(Id){
      this.$q.loading.show()
      this.edit(Id)
      .then(response => {
        if (response.success) {
          this.$q.loading.hide()
          this.form = response.data
          console.log(this.form)
        }
      })
    },
    updateForm () {
      //console.log(this.form)
      this.$q.loading.show()
          this.update(this.form)
      .then(response => {
        if (response.success) {
          this.formModal = false
          this.$q.loading.hide()
          this.$q.notify({
            message: response.message,
          })
        }
        
      }).finally(() => {
            this.$q.loading.hide()
          });
    },
    deleteId(Id){
      if(confirm("Do you really want to delete?")){
      this.delete({Id:Id})
        .then(response => {
          if (response.success) {
            this.formModal = false
            this.$q.notify({
            message: response.message,
            color: ''
            })
          }
        }).finally(() => {
            this.$q.loading.hide()
          });
    }
  }
  }
}
</script>
<style>
</style>