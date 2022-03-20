<template>
     <q-header 
    bordered
    class="" v-if="$q.platform.is.mobile"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="fas fa-arrow-left"
          size="10px"
          aria-label="Menu" @click="$router.go(-1)"
        />
        <q-toolbar-title>
          <div class="text-subtitle1 text-capitalize">{{$route.meta.headerTitle}}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
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
  methods:{

  }
})
</script>
