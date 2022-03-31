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
                    <q-btn  color="primary" label="Add" @click="formModal = true, createOrEdit = true,formReset()"/>
                  </div>
              </div>
        </div>
        <div class="flex flex-row justify-start items-center q-mt-sm">
                <div class="flex-1">
                  <div class="q-mr-sm">
                    <q-input type="search" autocomplete="off" label="Search Post..." outlined dense standout name="keyword" v-model="searchForm.keyword" @keyup="querySearch($event)" />
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
          <th>Slug</th>
          <th>Description</th>
          <th width="18%">Action</th>
        </tr>
      </thead>
      <tbody v-if="blogs!=null">

        <tr v-for="(blog,key) in blogs" :key="key">
          <td>{{key + 1}}</td>
          <td><span v-if="blog.blog_cat!=null">{{blog.blog_cat.name}}</span></td>
          <td><span v-if="blog.blog_subcat!=null">{{blog.blog_subcat.name}}</span></td>
          <td>{{blog.title}}</td>
          <td>{{blog.post_name}}</td>
          <td>{{ blog.description.substring(0,75)+"" }}</td>
          <td>
            <q-btn  size="10px" color="primary" padding="8px" icon="fas fa-edit" class="text-primary" @click="formModal = true , createOrEdit = false, editForm(blog.id)" />
            <q-btn size="10px" color="negative" padding="8px" class="q-ml-sm text-negative" icon="fas fa-trash-alt"  @click="deleteId(blog.id)"/>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7"><div class="text-h6 text-center">No Record Found</div></td>
        </tr>
      </tbody>
    </table>
    <vue-pagination v-if="paginate!=null" :paginate="paginate" :offset="4"/>
    </q-card-section>
</q-card>
<q-dialog v-model="formModal" persistent>
      <q-card style="min-width: 1000px">
        <q-form 
        autocorrect="on"
        autocapitalize="on"
        autocomplete="on"
        spellcheck="true"
        @submit="createOrEdit ? createdForm() : updateForm()">
        <q-card-section>
           <div class="flex flex-row justify-between items-center">
                <div class="flex-1">
                  <div class="q-mr-sm">
                      <div class="text-h6 text-weight-bold">{{createOrEdit ? 'Create' : 'Update'}}</div>
                  </div>
              </div>
               <div class="flex-1">
                  <div class="q-mr-sm">
                    <q-card-actions align="right" class="text-primary q-mr-sm">
          <q-btn color="primary" type="submit" label="Submit"/>
          <q-btn color="secondary" label="Cancel" v-close-popup />
        </q-card-actions>
                  </div>
              </div>
        </div>
        
        </q-card-section>
        
         
        <q-card-section class="q-pt-none">
          <!-- <div class="row">
            <div class="col-12 q-mb-md">
                <select v-model="form.blog_cat" class="form-control">
                  <option disabled value="">Select Category</option>
                    <option v-for="(category,index) in categories" :key="index" :value="category.id" >{{ category.name }}</option>
              </select>
            </div>
          </div> -->
          <div class="row q-mb-lg">
            <div class="col-12 ">
                <!-- <select v-model="form.blog_subcat" class="form-control" @change="selectItemShow($event)">
                  <option disabled value="">Select Tutorial</option>
                    <option v-for="(sub_category,index) in sub_categories" :key="index" :value="sub_category.id" >{{ sub_category.name }}</option>
                    <option  value="newCat">Enter New Category</option>
              </select> -->
               <select-with-search  v-model="form.blog_subcat" :stringOptions="sub_categories" />
              
            </div>
          </div>
           <div class="row"  v-if="seen">
            <div class="col-12 q-mb-md">
               <!-- <q-input dense type="text" outlined v-model="form.category_name" label="Category Name" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/> -->
                <select v-model="form.tutorial" class="form-control">
                  <option disabled value="">Select Tutorial</option>
                    <option v-for="(sub_category,index) in sub_categories" :key="index" :value="sub_category.id" >{{ sub_category.name }}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-input dense type="text" outlined v-model="form.title" label="Title" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
          </div>

          <div class="row">
            <div class="col-12 q-mb-md">
              <!-- <QuillEditor v-model="form.description" :modules="modules" toolbar="full" />
              <ckeditor :editor="editor" v-model="form.text" :config="editorConfig"></ckeditor> -->
          
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="form.description"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
    </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 q-mb-md">
               <q-input dense type="text" outlined v-model="form.post_name" label="Url" lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required']"/>
            </div>
          </div> 
           
          <!-- <div class="row">
            <div class="col-12 q-mb-md">
               <QuillEditor v-model="form.description" :toolbar="[['bold', 'italic', 'underline', 'strike'],['blockquote', 'code-block'],[{ 'header': 1 }, { 'header': 2 }],[{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'script': 'sub'}, { 'script': 'super' }],[{ 'indent': '-1'}, { 'indent': '+1' }],[{ 'direction': 'rtl' }],[{ 'size': ['small', false, 'large', 'huge'] }],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],[{ 'color': [] }, { 'background': [] }],[{ 'font': [] }],[{ 'align': [] }],['clean'],['link', 'image']]" theme="snow" />
            </div>
          </div> -->
          <!-- <div class="row">
            <div class="col-12 q-mb-md">
               <q-editor
      v-model="form.description"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
            </div>
          </div> -->
          
         <!--  <div class="row">
            <div class="col-12 q-mb-md">
             
               <q-select
                  dense outlined
                  v-model="form.post_author"
                  :options="options"
                  label="Posted By"
                  emit-value
                />
            </div>
          </div> -->

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
 import {mapActions,mapGetters,useStore} from 'vuex'
//  import { QuillEditor } from '@vueup/vue-quill'
 import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
// import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SelectWithSearch from '../../components/SelectWithSearch.vue'
import { computed} from 'vue'


export default {
  components: {
    VuePagination,
    SelectWithSearch
    // QuillEditor,
    // ckeditor: CKEditor.component,
  
  },

  data () {
    return {
      model: null,
      formModal: false,
      createOrEdit: true,
      newCategory: 'newCat',
      seen: false,
      modules:{
         name: 'blotFormatter',  
      module: BlotFormatter, 
      options: {/* options */}
      },
      form: {
        tutorial: '',
        text: null,
        title:'',
        description:'',
        blog_subcat:'',
        blog_cat:'',
        post_name:'',
        posted_by:'',
      },
      searchForm:{
        keyword: ""
      },
      options:[
        {
          label: 'Admin',
          value: '1',
        },
        {
          label: 'Other',
          value: '2',
        },
        ],
      pagination: {},
       editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }

                
    }
  },
  mounted(){
      this.get(this.$route.query)
    },
   watch:{
     $route(to,from){
       this.get(this.$route.query)
     }
   },
  computed:{
      ...mapGetters({
        blogs:'blog/blogs',
        categories:'blog/categories',
        sub_categories:'blog/sub_categories',
        paginate:'blog/paginate',
        isLoading:'blog/isLoading',
      }),
    },
  methods: {
    ...mapActions({
      get:'blog/get',
      create:'blog/create',
      edit:'blog/edit',
      update:'blog/update',
      delete:'blog/delete',
      searchQueryId:'blog/searchQueryId',

    }),
    selectItemShow(event){
      if(this.newCategory == event.target.value) {
        this.seen = true
      } else {
        this.seen = false
      }
      //this.seen = true
    },
    formReset(){
        const form = this.form
        for (const [key, value] of Object.entries(form)) {
           form[key]=''
        }
      },
    createdForm () {
      console.log(this.form);
      // this.$q.loading.show()
      //     this.create(this.form)
      // .then(response => {
      //   if (response.success) {
      //     this.formModal = false
      //     this.$q.loading.hide()
      //     this.$q.notify({
      //       message: response.message,
      //     })
      //   }
        this.get(this.$route.query)
      // }).finally(() => {
      //       this.$q.loading.hide()
      //     });
    },
    querySearch(event){
      this.searchQueryId(event.target.value)
      this.searchForm.keyword = event.target.value
    },
    editForm(Id){
      this.$q.loading.show()
      this.seen = false
      this.edit(Id)
      .then(response => {
        if (response.success) {
          this.$q.loading.hide()
          this.form = response.data
          //console.log(this.form.id)
        }
      })
    },
    updateForm () {
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
        this.get(this.$route.query)
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
          this.get(this.$route.query)
        }).finally(() => {
            this.$q.loading.hide()
          });
    }
  }
  }
}
</script>
<style>
  .pb-0{
    padding-bottom: 0px;
  }
  .pt-0{
    padding-top: 0px;
  }
</style>