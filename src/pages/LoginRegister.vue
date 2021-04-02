<template>
  <div class="fullscreen bg-pink-13 text-white text-center q-pa-md column justify-center">
    <div>
      <div class="row justify-center">
        <q-card class="col-md-6 col-sm-9 col" style="border-radius: 10px;">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Login" label="Login" />
          <q-tab name="Register" label="Register" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel name="Login">
            <login-register-form :tab='tab'/>
          </q-tab-panel>
          <q-tab-panel name="Register">
            <login-register-form :tab='tab'/>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
      </div>
      
    </div>
  </div>
</template>

<script>
import LoginRegisterForm from 'src/components/LoginRegisterForm.vue'
import {Auth} from 'boot/firebase'
export default {
  components: { LoginRegisterForm },
  name: 'Login',
  data(){
    return {
      tab:'Login',
      Loadings:{
        LoginigIn:false
      },
      Validation:{
        ErrorMsg:null
      },
      User:
      {
        email:null,
        password:null
      }
    }
  },
  methods:{

  },
  mounted(){
    console.log('mounted => ',Auth.currentUser);
  },
  created(){
    console.log('created => ',Auth.currentUser);
  }
}
</script>
