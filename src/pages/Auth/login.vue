<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
           <!--  <q-avatar size="103px" class="absolute-center shadow-10 bg-white">
              <img src="profile.svg">
              <div class="text-red-6 text-weight-medium">TE</div>
            </q-avatar> -->
          </q-card-section>
          <q-card-section>
            <div class="text-center">
              <div class="text-h5 text-weight-bold text-red-6" style="border-bottom: 2px solid red;padding: 10px;">
                Tutorial Example
              </div>
              <div class="text-h6 text-weight-bolder q-pa-sm">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="submit()">
              <q-input
                dense outlined
                v-model="form.email"
                label="Email"
                lazy-rules placeholder="info@gmail.com"
                :rules="[val => !!val || 'This field is required', isValidEmail]"
              />

              <q-input
                type="password"
                dense outlined
                v-model="form.password"
                label="Password"
               :rules="rules.password"

              />

              <div class="text-center">
                <q-btn label="Login" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      form:{
        email: '',
        password: '',
      },
      rules: {
        mobile: [
          val => val && val.length >= 10 || 'Enter 10 digits mobile number only',
          val => val && val.length < 11 || 'Enter 10 digits mobile number only',
        ],
        password: [
          val => val && val.length !='' || 'This is field is required',
          val => val && val.length >= 5 || 'Enter min 8 with special character', this.isPassValid()
        ]
      }
    }
  },
   computed:{
    ...mapGetters({
      isLoading:'auth/isLoading',
      error:'auth/error'
    }),
  },
  methods: {
    isValidEmail (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Please enter valid email address';
      },
      isPassValid () {
          const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/
          return passwordPattern.test(this.password) || 'Enter spacial character and alpha numeric value'
        },
    ...mapActions({
      signIn:'auth/signIn'
    }),
    submit () {
      //console.log(this.form)
     this.$q.loading.show()
      this.signIn(this.form).then( response => {
        if(response.success){
          this.$q.loading.hide();
          //console.log('redirect')
          /*this.$router.replace({
            name:"home"
          })*/
          window.location.assign("/dashboard")
        } else {
          this.$q.notify({
            message: response.message,
          })
        }
        this.$q.loading.hide();
      })
    },
       
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #ddc7a6 0%, #f5f5f5 100%);
}
</style>
