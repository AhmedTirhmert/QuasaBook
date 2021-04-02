<template>
            <div class="col column q-pa-md">
              <q-form @submit="holla">
              <q-input
                    outlined
                    type="email"
                    v-model="User.email"
                    dense
                    placeholder='Email'
                    class="q-mb-md"
              />                  
              <q-input
                    v-show="tab=='Register'"
                    outlined
                    type="text"
                    v-model="User.name"
                    dense
                    placeholder='UserName'
                    class="q-mb-md" 
              />  
              <q-input
                    outlined
                    type="password"
                    v-model="User.password"
                    dense
                    placeholder='Password'
                    class="q-mb-md" 
              />                 
              <div class=" row justify-between">
                  <div class=" text-primary q-py-sm">
                    {{Validation.ErrorMsg}}
                  </div>
                  <q-btn
                    color="primary"
                    type="submit"
                    :icon-right="tab == 'Login' ? 'login':'person_add'"
                    :label="tab == 'Login' ? 'Login': 'Register'"
                    class="half-width "
                    :loading='LoginRegisterLoading'
                    />
                  </div>
              </q-form>
            </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'Form',
  props:[
      'tab'
  ],
  data(){
    return {
      Validation:{
        ErrorMsg:null
      },
      User:
      {
        email:null,
        password:null,
        name:null
      }
    }
  },
  methods:{
    ...mapActions('AuthStore',['RegisterUser','LoginUser']),
    InputValidation(tab){
        this.Validation.ErrorMsg=null
        if (tab == 'Login') {
            if (this.User.email !== null 
                && this.User.password !== null 
                && this.User.email !== '' 
                && this.User.password !== '') {
                return true
            }
            else if (this.User.email === null || this.User.email === '')
            {
                this.Validation.ErrorMsg='Enter Your Email'
                return false
            }
            else if (this.User.password === null || this.User.password === '')
            {
                this.Validation.ErrorMsg='Enter Your Password'
                return false
            }            
        }else{
            if (
                this.User.email !== null 
                && this.User.password !== null 
                && this.User.name !== null 
                && this.User.email !== '' 
                && this.User.password !== ''
                && this.User.name !== ''
                
                ) {
                return true
            }
            else if (this.User.email === null || this.User.email === '')
            {
                this.Validation.ErrorMsg='Enter Your Email'
                return false
            }
            else if (this.User.name === null || this.User.name === '')
            {
                this.Validation.ErrorMsg='Enter Your UserName'
                return false
            }   
            else if (this.User.password === null || this.User.password === '')
            {
                this.Validation.ErrorMsg='Enter Your Password'
                return false
            } 
                     
        }
    },
    holla(){
        if (this.tab == 'Login') {
            if (this.InputValidation(this.tab)) {
                this.LoginUser(this.User)
            }
        }else{
            if (this.InputValidation(this.tab)) {
                this.RegisterUser(this.User)
            }
        }
         
  }
},
mounted()
{
    this.$on("Login-Error",(Error)=>{
        console.log(Error);
    })
},
computed:{
  ...mapState('AuthStore',['LoginRegisterLoading'])
}
}
</script>
