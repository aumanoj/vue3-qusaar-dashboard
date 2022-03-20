<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header 
    elevated
    class="bg-white text-black"
    >
      <q-toolbar>
        
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Tutorial Example
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat class="q-mr-sm">
            <q-avatar size="26px">
              <img src="img/logo.jpg">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu
          anchor="bottom left"
          self="top left"
        >
          <q-list style="min-width: 100px" class="menu-items">
            <q-item clickable v-close-popup>
              <q-item-section ><a href="/account/profile" class="text-black"><i class="q-mr-sm fas fa-user-circle"></i><span>Profile</span></a></q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section><a href="/settings" class="text-black"><i class="q-mr-sm fas fa-cog"></i><span>Setting</span></a></q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logOut()">
              <q-item-section><!-- <a href="/signout" class="text-black"> --><i class="q-mr-sm fas fa-sign-out-alt"></i><span>Logout</span><!-- </a> --></q-item-section>
            </q-item>
          </q-list>
        </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white text-black" 
    >
    <div class="sidebar-brand bg-primary">
     <div class="row">
       <div class="col-3">
         <div class="q-py-md q-ml-md">
            <q-avatar size="50px" class="q-mr-sm">
                <img src="img/logo.jpg" class="pr-info-img">
            </q-avatar>
         </div>
       </div>
       <div class="col-9">
         <div class="q-py-lg q-ml-md">
         <div class="text-subtitle1 text-capitalize text-white">Tutorial Example</div>
         <!-- <div class=""><router-link to="/profile" class="text-caption text-white">My Account</router-link></div> -->
       </div>
       </div>
     </div>
    </div>
      <q-separator color="white"/>
      <q-list>
        <q-item to="/dashboard" >
          <q-item-section avatar>
            <q-icon name="dashboard" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/posts" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Post</q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item to="/menus" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/sub-categories" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Category</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item to="/tutorials" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Tutorials</q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
      <q-separator />
       <q-item to="/side-menu" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Side Menu</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/new-side-menu" >
          <q-item-section avatar>
            <q-icon name="fa fa-file" class="text-grey"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>New Side Menu</q-item-label>
          </q-item-section>
        </q-item>
    </q-drawer>
    <q-page-container>
     <q-page class="q-py-sm">
      <router-view/>
    </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {mapActions,mapGetters} from 'vuex'
export default defineComponent({
  name: 'MainLayout',

  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      userProfile: {},
      image:'',
    }
  },
  watch:{
    $route(to,from){
      document.title = this.$route.meta.title
    }
  },
  mounted(){
    document.title = this.$route.meta.title
  },
  computed:{
    ...mapGetters({
      isLoading:'auth/isLoading',
      user:'auth/user',
      authenticated:'auth/authenticated'
    }),
  },
  methods:{
    ...mapActions({
      getUserData:'auth/getUserData',
      logout:'auth/logout'
    }),
    logOut(){
      this.logout()
    }
  }
})
</script>
