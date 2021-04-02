<template>
  <q-page class=" q-pa-md column justify-start ">
     <q-list >
       <q-separator />
      <q-item-label header>Online ({{Object.keys(Users.online).length}})</q-item-label>
      <q-item v-for="(user,key) in Users.online" :key="key" class="q-mb-sm" clickable v-ripple :to="{name : 'Chat',params:{otherUserId : key}}">
        <q-item-section avatar>
          <q-avatar @click.prevent="$router.push({name:'Profile' , params : {userId:key}})" color="primary" text-color="white">
            <q-img  :src="user.profilePicture ?user.profilePicture:`https://ui-avatars.com/api/?name=${user.name}?background=random`" ratio="1"/>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label >{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="fiber_manual_record" color="green" />
        </q-item-section>

        <q-item-section side>
          <q-btn-dropdown @click.prevent size="12px" flat dense rounded dropdown-icon="more_vert" auto-close no-icon-animation color="black" >
            <q-list>
              <q-item class="q-px-md " :to="{name:'Profile' , params : {userId:key}}" clickable v-close-popup >
                <q-item-section class="">
                  <div class="row col q-mt-sm">
                    <q-item-label>View Profile</q-item-label> 
                    <q-icon class="q-ml-md" name="account_circle" size="1.3rem" color="grey"></q-icon>
                  </div>
                </q-item-section>
              </q-item>

              <q-item class="q-px-md " clickable v-close-popup @click="confirmDelete(user.name,key)">
                <q-item-section class="">
                  <div class="row col q-mt-sm">
                    <q-item-label>Delete Chat</q-item-label> 
                    <q-icon class="q-ml-md" name="delete" size="1.3rem" color="red"></q-icon>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>        
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item-label header>Offline ({{Object.keys(Users.offline).length}})</q-item-label>

      <q-item v-for="(user,key) in Users.offline" :key="key" class="q-mb-sm" clickable v-ripple :to="{name : 'Chat',params:{otherUserId : key}}">
        <q-item-section avatar>
          <q-avatar @click.prevent="$router.push({name:'Profile' , params : {userId:key}})">
            <q-img  :src="user.profilePicture ?user.profilePicture:`https://ui-avatars.com/api/?name=${user.name}?background=random`" ratio="1"/>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-regular">{{ user.name }}</q-item-label>
          <q-item-label class="text-caption  text-italic">Last Seen : {{  user.lastSeen | carbonJs }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon  name="fiber_manual_record" color="grey" />
        </q-item-section>

        <q-item-section side>
          <q-btn-dropdown @click.prevent size="12px" flat dense rounded dropdown-icon="more_vert" auto-close no-icon-animation color="black" >
            <q-list>
              <q-item class="q-px-md " :to="{name:'Profile' , params : {userId:key}}" clickable v-close-popup >
                <q-item-section class="">
                  <div class="row col q-mt-sm">
                    <q-item-label>View Profile</q-item-label> 
                    <q-icon class="q-ml-md" name="account_circle" size="1.3rem" color="grey"></q-icon>
                  </div>
                </q-item-section>
              </q-item>

              <q-item class="q-px-md " clickable v-close-popup @click="confirmDelete(user.name,key)">
                <q-item-section class="">
                  <div class="row col q-mt-sm">
                    <q-item-label>Delete Chat</q-item-label> 
                    <q-icon class="q-ml-md" name="delete" size="1.3rem" color="red"></q-icon>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Filters from 'src/Mixins/filtersMixins'

export default {

  mixins:[Filters],
  name: 'Users',
  components:{},
  data () {
    return {
    }
  },
  methods:{
    ...mapActions('ChatStore',['deleteChat']),
    confirmDelete (UserName,otherUserId) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Delete you conversation with <b>'+UserName+'</b>',
        cancel: true,
        persistent: false,
        html:true
      }).onOk(() => {
        this.deleteChat(otherUserId)
      }).onOk(() => {
        //this.deleteChat(otherUserId)
      })
    },
  },
    // methods: {
    // //   Delete(id)
    // //   {
    // //     this.$q.dialog({
    // //     title: 'Confirm',
    // //     message: 'Are you sure you!',
    // //     cancel: true,
    // //     persistent: true,
    // //     }).onOk(() => {
    // //       firestore.collection('Chiques').where('id','==',id).get().then(elm => {
    // //         elm.forEach(elm => {
    // //           firestore.collection('Chiques').doc(elm.id).delete().then(suc=>{
    // //             this.getChiques()
    // //           })
    // //         });
    // //       })
    // //     }).onCancel(() => {
    // //       //this.getChiques()
    // //     })
    // //   },
    // //   Liked(id,index){
    // //      this.chiques[index].liked=!this.chiques[index].liked
    // //     firestore.collection('Chiques').where('id','==',id).get()
    // //     .then(res => {
    // //       res.forEach(elm => {
    // //         firestore.collection('Chiques').doc(elm.id).update({
    // //           liked:this.chiques[index].liked
    // //         })
    // //       });
    // //     }).catch(err => {
    // //       console.log(err);
    // //     })
        
    // //   },
    // //   addchique(){
    // //     let tmp = {
    // //       id:uid(),
    // //       text:this.cheque,
    // //       liked:false
    // //     }
    // //     firestore.collection('Chiques').doc().set(tmp)
    // //     this.chiques.push(tmp)
    // //     this.cheque=''
    // //   },
    // //   getChiques()
    // //   {
    // //     this.chiques=[]
    // //     firestore.collection('Chiques').get().then(chiques =>{
    // //     chiques.forEach(elm => {
    // //     console.log(elm.id);
    // //     this.chiques.push(elm.data())
    // //   });
    // // })
    // //   },
 
    // },
  watch:{},
  mounted(){
    
  },
  created(){
  },
  computed:{
    ...mapGetters('AuthStore',['Users'])

  },
  filters:{

  },
  beforeDestroy()
  {
    console.log('Users Page Desrtroyed');
  }

  }

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
.my-card-img  
  max-height: 77vh

</style>
