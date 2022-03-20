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
              <div class="flex flex-row justify-between items-center">
                <div class="flex-1">
                  <div class="q-mr-sm">
                    <div class="text-h6 text-weight-bold">{{$route.meta.headerTitle}}</div>
                  </div>
              </div>
                <div class="flex-1">
                  <div class="q-mr-sm">
                    <q-btn  color="primary" label="Add Category" @click="formModal = true, createOrEdit = true,formReset()"/>
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
          <th>Category title</th>
          <th>Status</th>
          <th width="18%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category,key) in categories" :key="key">
          <td>{{key + 1}}</td>
          <td>{{category.name}}</td>
          <td>
            <q-btn  size="10px" color="primary" padding="8px" icon="fas fa-edit" class="text-primary" @click="formModal = true , createOrEdit = false, editForm(category.id)" />
            <q-btn size="10px" color="negative" padding="8px" class="q-ml-sm text-negative" icon="fas fa-trash-alt"  @click="deleteId(category.id)"/>
          </td>
          <td>{{category.status==1 ? "Active" : "Inactive"  }}</td>
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
        <q-form @submit="createOrEdit ? createdForm() : updateForm(form.id)">
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-input dense type="text" outlined v-model="form.name" label="Category Title" lazy-rules :rules="[ val => val && val.length > 0 || 'Enter Catefory Title']"/>
            </div>
            <div class="col-12 q-mb-md">
            <q-select
              dense
              outlined
              emit-value
              map-options
              v-model="form.status" :options="options" label="Standard"
            />
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
      options: [
        {
          label: 'Active',
          value: '1',
        },
        {
          label: 'Inactive',
          value: '0',
        },
      ],
      form: {
        'name':null
      },
    }
  },
  computed:{
      ...mapGetters({
        categories:'category/categories',
        isLoading:'category/isLoading',
        paginate:'category/paginate',
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
      get:'category/get',
      create:'category/create',
      edit:'category/edit',
      update:'category/update',
      delete:'category/delete',
    }),
    formReset(){
        const form = this.form
        for (const [key, value] of Object.entries(form)) {
           form[key]=''
        }
      },
    createdForm () {
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
    updateForm (Id) {
      this.$q.loading.show()
          this.update({form:this.form,ID:Id})
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