<template>
  <q-page class=" q-pa-md row justify-start ">
    <!-- <div class="text-h3 text-center text-italic text-weight-bold text-grey-13 col column justify-center">
      Profile PAGE
    </div> -->
    <div class="col row ">
      <div class="col-md-4 q-mb-md col-12 ">
        <q-card class=" column  ">
        <q-img  :src="profileInfos.coverPicture" @click="editCoverImage">
        <!-- <q-btn
            class="absolute q-pa-none"
            padding="none"
            dense
            unelevated
            icon="create"
            link
            text-color="white"
            style="top: 5px; left: 5px"
            @click="editCoverImage" />           -->
        </q-img>
        <q-item>
          <q-avatar   class="absolute-bottom-left profilePicture" style="" size="6.8rem"> 
              <q-img :src="profileInfos.profilePicture"  ratio="1 " />
          </q-avatar>
        </q-item>
        <q-item class="q-py-md">
          <q-item-section class="text-center q-pt-md" style="">
            <q-item-label class="text-h4 text-weight-bold">{{profileInfos.name}}</q-item-label>
            <q-item-label caption class="text-italic text-grey">{{profileInfos.email}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pb-none q-px-none">
          <q-item-section class="col" style="">
            <q-card class="">
              
              <!-- <q-tabs
                v-model="tab"
                dense
                align="justify"
                class="color-primary text-facebook shadow-2"
                :breakpoint="0"
              >
                <q-tab name="locations"  icon="place"/>
                <q-tab name="education" icon="school" />
                <q-tab name="relationships" icon="favorite" />
              </q-tabs> -->


              <!-- <q-tab-panels swipeable v-model="tab" animated>
                <q-tab-panel name="locations" class="q-pa-none">
                  <q-list bordered padding class="rounded-borders " >
                    <q-item-label header>Places Lived</q-item-label>

                    <q-item>
                      <q-item-section avatar top>
                        <q-avatar icon="place" color="transparent" text-color="grey" size="4rem" />
                      </q-item-section>

                      <q-item-section top>
                        <q-item-label lines="1" class="text-weight-bold">Taroudant</q-item-label>
                        <q-item-label class="q-mb-md" caption lines="2">Hometown</q-item-label>
                        <q-item-label lines="1" class="text-weight-bold">Agadir</q-item-label>
                        <q-item-label class="q-mb-md" caption lines="2">Moved in 2020</q-item-label>
                        <q-item-label lines="1" class="text-weight-bold">Tanger</q-item-label>
                        <q-item-label class="q-mb-md" caption lines="2">Meved in 2015</q-item-label>
                        <q-item-label lines="1" class="text-weight-bold">Tata</q-item-label>
                        <q-item-label class="q-mb-md" caption lines="2">Current City</q-item-label>
                      </q-item-section>

                      <q-item-section link v-show="isProfileOwner" side>
                        <q-btn round color="transparent" icon="edit" unelevated text-color="grey" @click="showAddPostDialog"/>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="education" class="q-pa-none">
                  <q-list bordered padding class="rounded-borders " >
                    <q-item-label header>Work and Education</q-item-label>

                    <q-item>
                      <q-item-section avatar top>
                        <q-item-label lines="2" class="text-caption text-grey" >Work</q-item-label>
                        <q-avatar icon="work" color="transparent" text-color="grey" size="4rem" />
                        

                      </q-item-section>

                      <q-item-section >
                        <q-item-label lines="1" class="text-weight-bold">Self-Employed</q-item-label>
                      </q-item-section>

                      <q-item-section v-show="isProfileOwner" side>
                        <q-btn round color="transparent" icon="edit" unelevated text-color="grey" :to="{name : 'Users'}"/>
                      </q-item-section>
                    </q-item>


                    <q-item>
                      <q-item-section avatar top>
                        <q-item-label lines="1" class="text-caption text-grey" >College</q-item-label>
                        <q-avatar icon="school" color="transparent" text-color="grey" size="4rem" />
                        

                      </q-item-section>

                      <q-item-section >
                        <q-item-label lines="1" class="text-weight-bold">High School of Technology</q-item-label>
                        <q-item-label class="q-mb-xs" caption lines="2">Guelmime</q-item-label>
                        <q-item-label class="q-mb-xs" caption lines="2">Graduated 2019</q-item-label>
                      </q-item-section>

                      <q-item-section v-show="isProfileOwner" side>
                        <q-btn round color="transparent" icon="edit" unelevated text-color="grey" :to="{name : 'Users'}"/>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar top>
                        <q-item-label lines="1" class="text-caption text-grey" >High School</q-item-label>
                        <q-avatar icon="school" color="transparent" text-color="grey" size="4rem" />
                        

                      </q-item-section>

                      <q-item-section >
                        <q-item-label lines="1" class="text-weight-bold">El Jadida </q-item-label>
                        <q-item-label class="q-mb-xs" caption lines="2">Tata</q-item-label>
                        <q-item-label class="q-mb-xs" caption lines="2">Graduated 2015</q-item-label>
                      </q-item-section>

                      <q-item-section v-show="isProfileOwner" side>
                        <q-btn round color="transparent" icon="edit" unelevated text-color="grey" :to="{name : 'Users'}"/>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>

                <q-tab-panel class="text-center" name="relationships">
                  <div class="text-h4 text-weight-bold q-mb-md">Single AF</div>
                  since you are here you are single and will remain like that for the rest of your life 
                </q-tab-panel>

              </q-tab-panels> -->
            </q-card>
          </q-item-section>
        </q-item>

        
      </q-card>
      </div>
      <div class="col-md-8 col-sm-12 col-12">
        <div class="row col-12">
          <div class=" q-mb-sm col-12 justify-center row">
            <div class="text-h5 full-width text-italic q-py-md text-center text-grey-14">
              Posts
            </div>

            <!-- <q-btn padding="xs sm" color="primary" icon="add"   round size="1rem" /> -->
          </div>
          <div v-if="!profileHasPosts" class="row justify-center q-pa-xl col-12">
            <div  class="col col-12  text-grey-13 text-weight-bold text-center">
              No Posts Yet
            </div>
          </div>
          <div v-else class="col-12">
          <div
            v-for="(post,key) in profilePosts"
            :key="key"
            class="col-md-6 col-12 q-px-none q-mb-md"
            
          >
            <q-card  class="full-width">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img ratio="1" @click="$router.push({name:'Profile' , params : {userId:$route.params.otherUserId}})" :src="profileInfos.profilePicture"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label @click="$router.push({name:'Profile' , params : {userId:key}})" class="text-weight-bold">{{profileInfos.name}}</q-item-label>
                  <q-item-label caption>{{post.time | carbonJs}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-img @dblclick="firebaseProfileLikePost(key)" @click="firebaseProfileLikePost(key)"  :src="post.Picture[0]"/>
              <q-separator  />
                <q-card-section class="column">
                  <div class="text-weight-regular text-subtitle2">
                    <b class="text-weight-bold">{{profileInfos.name}} : </b>{{post.Description}}
                  </div>
                  
                  <!-- <div class="text-">
                    {{image.time.toDate() | carbonJs}} 
                  </div> -->
                </q-card-section>
                
              <q-separator  />
                <q-list class="row justify-around q-pa-sm">
                  <q-item clickable class="column q-pa-xs" @click="firebaseProfileLikePost(key)">
                    <q-item-section class="col row " avatar>
                      <q-icon :color="isLikedByCurrentUser(key)" name="favorite" />
                      <div v-if="post.Likes && post.Likes.length > 0" class="col-6 q-my-xs q-mx-none q-pt-xs q-px-sm text-grey-14 text text-weight-bold" @click.stop="showLikes(key)">{{post.Likes.length}}</div>
                    </q-item-section>
                  </q-item>
                   <q-item v-show="!isProfileOwner" clickable class=" q-pa-xs" @click="sharePost(key)">
                    <q-item-section avatar >
                      <q-icon color="blue" name="share" />
                    </q-item-section>
                  </q-item>
                  <q-item v-show="isProfileOwner" class=" q-pa-xs" clickable @click="deletePost(key)">
                    <q-item-section avatar  >
                      <q-icon color="grey " name="delete"  />
                    </q-item-section>
                  </q-item>
                </q-list>
            </q-card>
          </div>
          </div>
        </div>
      </div>
      <q-dialog  v-model="addPostDialog"  full-width position="bottom">
        <q-card class="full-height column">
          <q-card-section class="col column items-center">
            <q-input
              class="full-width q-mb-md"
              v-model="post.postDescription"
              outlined
              placeholder='Description'
              autogrow
              color="facebook"
            />
            <q-uploader
              @added='addPostImage'
              @removed='removePostImage'
              color="teal"
              flat
              hide-upload-btn
              bordered
              class="full-width col"
              accept="image/*"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn  outline label="Close" color="red" @click="closePostDialog" />
            <q-btn  outline  label="Post" color="blue" unelevated @click="addPost" :disable='isPostReady' />
            
          </q-card-actions>
          
        </q-card>
      </q-dialog>
      <!-- Likes Dialog  -->
      <q-dialog v-model="LikesDialog"  position="bottom" >
        <q-card class="my-card">
        
          <q-list bordered class="rounded-borders" style="max-width: 350px">
                <q-item-label header>Likes</q-item-label>
                <q-item v-for="(like,key) in postLikes" :key="key" :to="{name:'Profile' , params : {userId:key}}"  clickable v-ripple>
                  
                  <q-item-section avatar>
                    <q-avatar>
                      <q-img :src="like.profilePicture" ratio="1" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{like.name}}</q-item-label>
                  </q-item-section>
                  <q-separator inset="item" />
                </q-item>
                
              </q-list>
              </q-card>
      </q-dialog>
    </div>
    <q-page-sticky position="bottom-right" :offset="[10, 10]">
      <q-btn round color="secondary" icon="add" class="" @click="showAddPostDialog"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import Filters from 'src/Mixins/filtersMixins'
import {QSpinnerBall} from 'quasar'

export default {
  mixins:[Filters],
  beforeRouteLeave(to, from, next) {
    this.$destroy()
    next()
  },
  beforeRouteUpdate(to,from,next)
  {
    this.firebaseClearProfilePost()
    next()   
  },
  name: 'Profile',
  components:{},
  data () {
    return {
      LikesDialog:false,
      postLikes:{},
      Carousels:{
        slide:0,
        fullscreen:false
      },
      post:{
        postDescription:'',
        postImages:[]
      },
      tab:'locations',
      addPostDialog:false
    }
  },
  methods: {
    ...mapActions('ProfileStore',['getProfileInfo']),
    ...mapActions('PostStore',['firebaseAddPost','firebaseGetProfilePosts','firebaseClearProfilePost','firebaseProfileLikePost']),
    editCoverImage()
    {
      window.alert('Im Clicked Daddy ');
    },
    addPostImage(files)
    {
      files.forEach(pic => {
        this.post.postImages.push(pic)
      })
    },
    removePostImage(files)
    {
      this.post.postImages.forEach((img,index) => {
        files.forEach((removedImg,index) => {
          if (img.name===removedImg.name) {
            this.post.postImages.splice(index,1)
          }
        })
        
      });
      console.log(this.post.postImages);
    },
    addPost()
    {
      this.firebaseAddPost(this.post)
    },
    isLikedByCurrentUser(postKey)
    {
      
      if (this.profilePosts[postKey].Likes && this.profilePosts[postKey].Likes.includes(this.userCredential.UserId)) {
        return 'red-8'
      }
        return 'red-1'  
    },
    showAddPostDialog()
    {
      this.addPostDialog=true
    },
    async showLikes(key)
    {
      this.postLikes = {}
      
      this.profilePosts[key].Likes.forEach(userId => {
        if (userId == this.userCredential.UserId) {
          this.postLikes[userId]={profilePicture:this.Users[userId].profilePicture,name:"You"}
        }else {
          this.postLikes[userId]={profilePicture:this.Users[userId].profilePicture,name:this.Users[userId].name}

        }
      });
      this.LikesDialog=true
    },
    closePostDialog()
    {
      this.addPostDialog=false
      this.post.postDescription=''
      this.post.postImages=[]
    }
  },
  watch:{
    postUploading(newVal){
      console.log(newVal);
      if (newVal == true) {
        this.$q.loading.show({
          backgroundColor:'dark',
          spinner:QSpinnerBall,
          message: 'Your post is <b class="text-weight-bold">Uploading</b> <br/><span class="text-facebook">Hang on a second...</span>'
      })
      }
      else
      {
        this.$q.loading.hide()
        this.closePostDialog()
      }
    }
  },
  created(){
   
  },
  mounted(){
    this.getProfileInfo(this.$route.params.userId)
    this.firebaseGetProfilePosts(this.$route.params.userId)
    this.Carousels=this.getCarousels

  },
  computed:{
    ...mapState('ProfileStore',['profileInfos','isProfileOwner']),
    ...mapState('PostStore',['postUploading','profilePosts']),
    ...mapState('AuthStore',['userCredential','Users']),
    
    isPostReady()
    {
      if (this.post.postImages.length > 0 && this.post.postDescription != '') {
        return false
      }
      return true
    },
    profileHasPosts(){
      return Object.keys(this.profilePosts).length > 0
    },
  },
  filters:{

  },
  destroyed(){
    this.firebaseClearProfilePost()
  }

  }

</script>
<style scoped>
.profilePicture
{
  bottom: -15px; 
  left: 115px;
  filter: drop-shadow(0px 5px 6px black );
}
.profilePicture .row {
  border: 2px solid #1877f2  !important;
}
</style>
