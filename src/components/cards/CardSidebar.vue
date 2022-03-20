<template>
<q-card  v-if="$q.platform.is.desktop">
      <q-card-section class="text-center bg-transparent">
        <q-avatar size="100px">
           <img :src="user.image!=null ? user.image : 'https://cdn.quasar.dev/img/avatar.png'" class="pr-info-img">
        </q-avatar>
        <div class="text-subtitle2 q-mt-lg text-capitalize">{{user.first_name}} {{user.last_name}}</div>
        <!-- <div class="text-h6 q-mt-md">Anupam Kushwaha</div> -->
      </q-card-section>
    <q-card-section style="width: 100%;">
      <q-list>
    <q-item to="/profile" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="dashboard"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>My Account</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/address" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fas fa-address-card"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Address</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/change-password" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fa fa-file"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Change Password</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/transactions" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fa fa-trophy"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Transactions</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/withdrawals" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fa fa-comments"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Withdrawals</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/offers" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fas fa-gift"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Offers</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/promotions" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fa fa-money-bill-alt"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Promotions</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/referral" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fas fa-sync"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Referrals</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/setting" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="fas fa-cogs"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Settings</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
    </q-card-section>
</q-card>
</template>
<script>
  import { api } from 'boot/axios'
  import {mapActions,mapGetters} from 'vuex'
export default {
  name: "CardSidebar",
  data(){
    return {
      userProfile:{},
      image:'',
    }
  },
  mounted(){
    /*this.userProfile = JSON.parse(localStorage.getItem("userProfile"));
    this.image=this.userProfile.image.file_path;*/
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
      getUserData:'auth/getUserData'
    }),
  }
}
</script>
<style>
  a {
    text-decoration: none;
    color: #2874f0;
  }
</style>