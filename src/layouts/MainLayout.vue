<template>
  <q-layout view="hHh LpR fFf">
    <q-header >
      <!-- <q-bar class="bg-primary-11 text-white q-electron-drag electron-only">
        <q-icon name="filter_drama" />
        <q-space />
        <q-btn dense flat @click="minimize" icon="minimize" />
        <q-btn dense flat @click="close" icon="close" />
      </q-bar> -->
          <q-toolbar>
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
            <q-toolbar-title clickable class="row justify-between">
              <q-item  class="col text-grey-12 justify-center text-h6">
                Fablete
              </q-item>
            </q-toolbar-title>
            <q-avatar size="2.3rem" @click="$router.push({name:'Profile' , params : {userId:userCredential.UserId}})" >
              <q-img :src="userCredential.profilePicture" ratio="1"/>
            </q-avatar>
             <!-- <q-btn-dropdown size="12px" flat dense rounded dropdown-icon="more_vert" auto-close no-icon-animation color="white" >
            <q-list>
              <q-item class="q-px-md " :to="{name:'Profile' , params : {userId:userCredential.UserId}}" clickable v-close-popup >
                <q-item-section class="">
                  <div class="row col justify-between q-mt-sm">
                    <q-item-label>Profile</q-item-label> 
                    <q-icon class="q-ml-md right" name="account_circle" size="1.3rem" color="grey-10"></q-icon>
                  </div>
                </q-item-section>
              </q-item>

              <q-item class="q-px-md " clickable v-close-popup @click="LogOutUser">
                <q-item-section class="">
                  <div class="row col q-mt-sm">
                    <q-item-label>Log Out</q-item-label> 
                    <q-icon class="q-ml-md" name="logout" size="1.3rem" color="grey"></q-icon>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->

      </q-toolbar>
    </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        :width="200"
        :breakpoint="600"
        :behavior="Platform"
        elevated
      >
        <q-scroll-area style="height: calc(100% - 235px); margin-top: 200px; " class="bg-grey-12 ">
          <q-list padding  inset-separator class="text-grey-9">
            <q-item class="" v-for="Link in Links" :key="Link.name" clickable v-ripple link :to="{name:Link.to}" >
              <q-item-section avatar>
                <q-icon :name="Link.icon" />
              </q-item-section>
              <q-item-section>
                {{Link.text}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top drawer-header-img" :src="userCredential.coverPicture" style="height: 200px">
          <div class="absolute-bottom header-content bg-transparent">
            <q-avatar size="56px" class="q-mb-sm" @click="$router.push({name:'Profile' , params : {userId:userCredential.UserId}})">
              <q-img :src="userCredential.profilePicture" ratio="1"/>
            </q-avatar>
            <div class="text-weight-bold text-h6">{{userCredential.name}}</div>
            <div class="text-caption ">@{{userCredential.email}}</div>
             <q-toggle
                class="q-py-xs"
                v-model="darkMode"
                icon="brightness_4"
                size="50px"
                dense
                color="grey-8"
                :icon-color="darkMode?'grey-1':'dark'"
              />
          </div>
        </q-img>
        <div class="absolute-bottom q-ma-none bg-grey-10" style="height:35px">
          <q-btn   color="grey-10"  class="full-width " text-color="grey-12" label="Log Out"  unelevated @click="LogOutUser" />
        </div>
        
      </q-drawer>


    <q-page-container>
      <keep-alive>
      <router-view :key="$route.fullPath"/>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import Links from 'components/Links.js'

export default {
  components:[
     Links
  ],

  methods:{
    ...mapActions('AuthStore',['LogOutUser']),
   close () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
   },
  minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },
    Profile()
    {
      console.log('qlawi ');
    }
  },

  data() {
    return {
      leftDrawerOpen: false,
      Links:Links,
      darkMode:false
    }
  },
  mounted(){
  },
  computed:{
    ...mapState('AuthStore',['userCredential']),
    Platform()
    {
      if (this.$q.platform.is.mobile) {

        return 'mobile'
      }
      else if(this.$q.platform.is.desktop)
      {
        return 'desktop'
      }
        return 'default'
      }
      
  },
  watch:
  {
    darkMode()
    {
      this.$q.dark.toggle()
    }
  }

}
</script>
<style lang="scss" scoped>
.drawer-header-img{
  filter:grayscale(40%);

  .header-content{

  }
  .q-toggle__inner{
  }
}
</style>
