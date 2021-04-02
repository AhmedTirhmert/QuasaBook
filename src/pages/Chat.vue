<template>
  <q-page class="column justify-between ">
    <!-- <div class="text-h3 text-center text-italic text-weight-bold text-grey-13 col column justify-center">
      
    </div> -->
    <div class=" col column  ">
      <div class="col-1 q-pa-none ">
        <q-banner dense class="text-white  bg-teal-9 row justify-start q-pa-none">
            <q-item  class="q-pl-xs"  v-ripple>
              <q-item-section avatar>
                <q-btn round replace :to="{name:'Users'}" unelevated icon="navigate_before"  class="bg-transparent" />
              </q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img style="cursor:pointer" :src="otherUserCredential.profilePicture" @click="$router.push({name:'Profile' , params : {userId:$route.params.otherUserId}})">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-regular">{{otherUserCredential.name}}</q-item-label>
                <q-item-label class="text-caption  text-italic" v-show="!otherUserCredential.online">active {{otherUserCredential.lastSeen | carbonJs}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="fiber_manual_record" :color="otherUserCredential.online ? 'green' : 'grey'" />
              </q-item-section>
            </q-item>
        </q-banner>
      </div>
      <div class="col scroll row justify-start items-end q-pa-sm bg-pattren " >
        <q-chat-message 
          v-for="(message,key) in chatMessages"
          :key="key"
          class="col col-xs-12 "
          :name="message.from == 'me' ? userCredential.name : otherUserCredential.name"
          :avatar="message.from == 'me' ? userCredential.profilePicture : otherUserCredential.profilePicture"
          :text="[message.text]"
          :stamp="message.time | carbonJs"
          :sent="message.from == 'me' ? true : false"
          :bg-color="message.from == 'me' ? 'lime' : 'amber-7'"
        />
        <!-- <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
        /> -->
        
      </div>
      <div  class="col-1 row bg-teal-9  q-pa-none roundedbot">
          <q-input  v-model="newMessage" @keydown.enter="sendMessage"  placeholder="Type message" color="transparent" bg-color="white" outlined rounded dense class="q-pa-xs full-width">
            <template v-slot:after v-if="newMessage!==null && newMessage!==''">
              <q-btn round dense flat icon="send" class="q-py-sm full-height" size="1rem" color="white"  @click="sendMessage" />
            </template>
          </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import Filters from 'src/Mixins/filtersMixins'

// Get parent DomNode that handles page scrolling
// Usually this is element with classname ".layout-view" or "window"

export default {
  beforeRouteLeave(to, from, next) {
    this.$destroy()
    next()
  },
  mixins : [Filters],
  name: 'PageIndex',
  components:{},
  data () {
    return {
      newMessage:''
    }
  },
  methods: {
    ...mapActions('AuthStore',['firebaseGetMessages','firebaseStopeGettingMessages','firebaseSendMessage']),
      sendMessage(){
        if (this.newMessage!==null && this.newMessage!=='' ) {
          this.firebaseSendMessage({
          newMessageDetails:
          {
          text:this.newMessage,
          },
          otherUserId:this.$route.params.otherUserId
          }
          )
          this.newMessage=null
        }
      },
      handleHold({ evt, ...info },key) {
          this.$q.dialog({
            title: 'Delete',
            message: 'Delete Message For:',
            options: {
              type: 'radio',
              model: 'me',
              inline: false,
              items: [
                { label: 'Me', value: 'me' },
                { label: 'Everyone', value: 'all' },
              ]
            },
            cancel: true,
            persistent: true
          }).onOk(data => {
            if (data == 'me') {
              console.log("deleteMessageForMe",key);
              deleteMessageForMe()
            }else{
              console.log("deleteMessageForAll",key);
              deleteMessageForAll()
            }
            // console.log('>>>> OK, received', data)
          }).onCancel(() => {
            // console.log('>>>> Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }
  },
  watch:{
    
  },
  created(){
    // console.log('this is created');
  },
  beforeCreate()
  {
    // console.log('this is before created');
  },
  mounted(){
    this.firebaseGetMessages(this.$route.params.otherUserId)

  },
  computed:{
    ...mapState('AuthStore',['chatMessages','otherUserCredential','userCredential']),
    userAvatar(from)
    {
      if (from == 'me') {
        return `https://ui-avatars.com/api/?name=${this.userCredential.name}?background=random`
      }
        return `https://ui-avatars.com/api/?name=${this.otherUserCredential.name}?background=random`
    },
      
  },
  // beforeMount(){console.log('this is before mounted');},
  // beforeDestroy(){console.log('this is before destroy');},
  destroyed()
  {
    this.firebaseStopeGettingMessages()
  }
  }

</script>
<style  scoped>
.my-card
{
  width: 100%
}
  
.my-card-img
{
  max-height: 77vh
}  

.bg-pattren
{
  background-color: #c3c3d8;
  background-image: radial-gradient(#9096f7 0.5px, #E5E5F7 1px);
  background-size: 20px 20px;
}

.roudedtop
{
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.roudedbot
{
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
  

</style>
