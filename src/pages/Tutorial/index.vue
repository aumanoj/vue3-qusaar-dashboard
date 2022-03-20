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
              <div class="flex flex-row justify-end items-center">
                <div class="flex-1">
                  <div class="q-mr-sm">
                    <q-btn  color="primary" label="Add Tutorial" @click="formModal = true, createOrEdit = true,formReset()"/>
                  </div>
              </div>
        </div>
           </q-form>
         </q-card-section>
     <q-card-section>
        <div class="q-mb-sm" v-if="paginate!=null"><span class=" text-subtitle2">Showing:</span> {{paginate.from}} - {{paginate.to}} <span class=" text-subtitle2">Results:-</span> {{paginate.total}} </div>
    <table class="table">
      <thead>
        <tr>
          <th>S.NO</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Title</th>
          <th>Description</th>
          <th>Seo Url</th>
          <th width="18%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tutorial,key) in tutorials" :key="key">
          <td>{{key + 1}}</td>
          <td><span v-if="tutorial.category!=null">{{tutorial.category.name}}</span></td>
          <td><span v-if="tutorial.sub_category!=null">{{tutorial.sub_category.name}}</span></td>
          <td>{{tutorial.title}}</td>
          <td>{{tutorial.description.substring(0,20)+""}}</td>
          <td>{{tutorial.seo_url}}</td>
          <td>
            <q-btn  size="10px" color="primary" padding="8px" icon="fas fa-edit" class="text-primary" @click="formModal = true , createOrEdit = false, editForm(tutorial.id)" />
            <q-btn size="10px" color="negative" padding="8px" class="q-ml-sm text-negative" icon="fas fa-trash-alt"  @click="deleteId(tutorial.id)"/>
          </td>
        </tr>
      </tbody>
    </table>
    <vue-pagination v-if="paginate!=null" :paginate="paginate" :offset="4"/>
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
                <select v-model="form.category_id" class="form-control">
                  <option disabled value="">Select Category</option>
                    <option v-for="(category,index) in categories" :key="index" :value="category.id" >{{ category.name }}</option>
              </select>
            </div>
            <div class="col-12 q-mb-md">
                <select v-model="form.sub_category_id" class="form-control">
                  <option disabled value="">Select Sub Category</option>
                    <option v-for="(sub_category,index) in sub_categories" :key="index" :value="sub_category.id" >{{ sub_category.name }}</option>
              </select>
            </div>
            <div class="col-12">
              <q-input dense type="text" outlined v-model="form.heading" label="Heading" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
              <q-input dense type="text" outlined v-model="form.title" label="Title" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
             
                 <q-editor placeholder="Enter Something" class="q-mb-md" v-model="form.description" min-height="10rem" lazy-rules :rules="[ val => val && val.length!='' || 'This field is required']"/>
            </div>
            <div class="col-12">
              <q-input dense type="text" outlined v-model="form.seo_title" label="Seo Title" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
              <q-input dense type="text" outlined v-model="form.seo_url" label="Seo Url" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
              <q-input dense type="textarea" outlined v-model="form.description" label="Seo Description" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
            <div class="col-12">
              <q-input dense type="number" outlined v-model.number="form.order_by" label="Order By" lazy-rules :rules="[ val => val && val.length!='' || 'This field is required']"/>
            </div>
            
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
        description: '',
        sub_category_id: '',
        category_id: '',
        order_by: null,
      },
    }
  },
  watch:{
    $route(to,from){
      this.get()
    }
  },
  computed:{
      ...mapGetters({
        tutorials:'tutorial/tutorials',
        sub_categories:'tutorial/sub_categories',
        categories:'tutorial/categories',
        paginate:'tutorial/paginate',
        isLoading:'tutorial/isLoading',
      }),
    },
  mounted(){
    this.get()
  },
  methods: {
    ...mapActions({
      get:'tutorial/get',
      create:'tutorial/create',
      edit:'tutorial/edit',
      update:'tutorial/update',
      delete:'tutorial/delete',
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