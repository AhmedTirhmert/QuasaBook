<template>
  <q-page class="column justify-start ">
    <div class="text-h3 col column justify-start">
      
        <q-tab-panels ref="qtabpanels" v-model="tab" swipeable animated class="col column target" >
          <q-tab-panel name="Upload"  class="col column " >
          <div class="col ">
            <q-card class="">
              <q-card-section class="text-h6 text-center q-mb-md">
                {{ pickedQuote  }}
              </q-card-section>
              <q-separator/>
                <q-card-section class="row justify-end q-mb-md">
                   <q-btn color="deep-purple-9" round icon="format_quote"  class="" @click="GetQuot" :loading='Loading.quote'/>
                </q-card-section>
          
            </q-card>
            <q-card class="q-mb-sm">
              <q-card-section class="q-pa-sm">
              <canvas
                ref="photo" 
                class="full-width "
              />
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm row justify-end">
                <q-btn color="cyan-9" icon="insert_photo" round  class="" @click="UploadPic" :loading='Loading.picture'  />
              </q-card-section>
                
            </q-card>
        
            </div>
                <div class="col column q-mt-sm">
            <q-file
                v-show="false"
                color="purple-12"
                label="Pick a photo"
                @input="Log"
                accept="image/*"
                ref="file"
                >
              </q-file>
              
              <q-btn v-show="Loading.PostReady" class="full-width" color="primary" @click="AddPost">
                Add Post
              </q-btn>
            </div>
            <div class="col-1 q-py-md">
              
            </div>
          </q-tab-panel>

          <q-tab-panel name="Images" class="row col-12 justify-start">
              <q-inner-loading :showing="!postsReady">
                  <q-spinner-gears size="7rem" :style="{'opacity':'0.4'}" color="primary" />
              </q-inner-loading>
          <div
              class="text-h4 row justify-between text-italic text-weight-bold text-grey-13 col-12 q-mb-md"
              >
              <p class="q-mb-none">Pictures <small>({{PostsCount}})</small></p> 
              <q-btn
              padding="sm"
              icon="add"
              color="green-8"
              @click="addRecord"
              >
          </q-btn>
          </div>            
                <transition
                    appear
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                  >
                <div class="row">
                    <div v-for="(image,index) in Posts" :key="index" class="col q-mb-md col-md-12 col-sm-12 col-12">
                      <q-card  class="q-mx-xs">
                        <q-skeleton v-if="!image" height="20rem" square/>
                        <q-img  v-else :src="image.link"  ratio="1" >
                          <!-- <q-skeleton class="full-width full-height" animation='pulse-x' :show='!image.link'  /> -->
                        </q-img>
                        <q-separator  />
                        <q-card-section class="text-weight-bold text-subtitle2">
                          {{image.desc}}
                          <div class="text-caption">
                            {{image.time.toDate() | carbonJs}}
                          </div>
                        </q-card-section>
                        <q-separator  />
                        <q-list class="row justify-around ">
                          <q-item clickable>
                            <q-item-section avatar @click="deletePost(image.desc)">
                              <q-icon color="dark" name="delete"  />
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card>
                    </div>

              </div>
              </transition>
          </q-tab-panel>
        </q-tab-panels>

      <q-separator />
               
      <q-page-sticky position="bottom" class=" bg-blue-grey-1" expand :offset="[0,0]">
                <q-tabs
                v-model="tab"
                dense
                
                class="text-grey full-width"
                active-color="primary"
                indicator-color="primary"
                narrow-indicator
              >
                <q-tab name="Upload" icon="upload" />
                <q-tab name="Images" icon="collections" />
              </q-tabs>
              
              
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
// import localbase from 'localbase'
// let firestore = new localbase('firestore')

import { firestore,storage } from 'boot/firebase'
import axios from 'axios'
import Filters from 'src/Mixins/filtersMixins'
import { uid } from 'quasar'





export default {
  mixins:[Filters],
  name: 'Photos',
  components:{},
  data () {
    return {
      uploadProgress:0,
      Loading:{
        quote:false,
        picture:false,
        PostReady:false
      },
      pickedQuote:null,
      post:{
        description:null,
        link:null,
      },
      postsReady:true,
      Photo:null,
      tab:'Upload',
      Posts:[],
    }
  },
  methods: {
      AddPost()
      {
        this.$q.loading.show({
          message: '<b class="text-weight-bold">Uploading</b><br/>'+this.uploadProgress+'<br/><span class="text-facebook">Hang on a second...</span>'
        })
        const storageRef=storage.ref(`${uid()}`).put(this.Photo);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.post.link = url
            this.post.description = this.pickedQuote
            firestore.collection('Pictures').add(
            {
              desc:this.post.description,
              link:this.post.link,
              time: new Date()
            }).then(res => {
                this.getData()
                 this.$q.loading.hide()
                 this.Photo=null
                 this.pickedQuote=null
                this.$q.notify({
                    timeout:700,
                    message:`Post Added Succesfully :)`,
                    classes:'full-width',
                    position:'top',
                    type:'positive'
                })
                this.$refs.qtabpanels.goTo('Images')
            })
          });
        }
        );
        
        
      // }
      },
      UploadPic()
      {
        let file = this.$refs.file 
        file.pickFiles()
      },
      deletePost(desc){
        firestore.collection('Pictures').where('desc','==',desc).get().then(res =>  {
          res.forEach(element => {
            firestore.collection('Pictures').doc(element.id).delete()
          });
        })
        this.$q.notify({
          timeout:700,
          message:`Item Deleted Succefully!`,
          classes:'q-mt-lg',
          position:'top',
          type:'negative'
        })
        this.getData()
      },
      Log(file){
        this.Photo=file
        this.Loading.picture=true
        let canvas = this.$refs.photo
        let context = canvas.getContext('2d')
        let reader = new FileReader()
        reader.onload = event => {
            var img = new Image()
            img.onload = () =>{
                canvas.width = img.width
                canvas.height = img.height
                context.drawImage(img,0,0)
            }
            img.src = event.target.result
        }
        reader.readAsDataURL(file)
        this.Loading.picture=false

        // this.Photo=this.dataURItoBlob(canvas.toDataURL())
        
      },
      dataURItoBlob(dataURI) {
          // convert base64 to raw binary data held in a string
          // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
          var byteString = atob(dataURI.split(',')[1]);

          // separate out the mime component
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

          // write the bytes of the string to an ArrayBuffer
          var ab = new ArrayBuffer(byteString.length);

          // create a view into the buffer
          var ia = new Uint8Array(ab);

          // set the bytes of the buffer to the correct values
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }

          // write the ArrayBuffer to a blob, and you're done
          var blob = new Blob([ab], {type: mimeString});
          return blob;

      },
      GetQuot()
      { 
        this.Loading.quote=true
        axios({
          method: 'GET',
          url: 'https://quotes15.p.rapidapi.com/quotes/random/',
          headers: {
            'x-rapidapi-key': 'e59975e7b4mshcd1073400b4800bp12f35ejsn5005367d8fc9',
            'x-rapidapi-host': 'quotes15.p.rapidapi.com'
          }
        })
        .then((response)=>{
          this.post.description = response.data.content
          this.pickedQuote = response.data.content
          this.Loading.quote=false
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      GetImageUrl()
      {
        axios({
          method:'get',
            url:'https://source.unsplash.com/user/erondu',
            })
        .then((response)=>{
              this.post.link = response.request.responseURL
            })
        .catch((err)=>{
          console.log(err);
        })
      },
      addRecord()
      {
        this.$refs.qtabpanels.goTo('Upload')
      // this.GetImageUrl()
      // this.GetQuot()
      // if (this.post.description==null || this.post.link == null) {
      //   this.$q.notify({
      //           timeout:700,
      //           message:`An Error Accured. Try Again `,
      //           classes:'full-width',
      //           position:'top',
      //           type:'negative'
      //       })
      // }else{
      //   firestore.collection('Pictures').add(
      //   {
      //     desc:this.post.description,
      //     link:this.post.link,
      //     time: new Date()
      //   }).then(res => {
      //       this.getData()
      //       this.$q.notify({
      //           timeout:700,
      //           message:`Post Added Succesfully :)`,
      //           classes:'full-width',
      //           position:'top',
      //           type:'positive'
      //       })
      //   })
      // }
      
      },

      getData()
      {
      this.Posts=[]
      this.postsReady=false
      firestore.collection('Pictures').orderBy("time",'desc').get().then(res => {
        res.forEach(img => {
          this.Posts.push(img.data())
        });
        this.postsReady=true
      })
      },
  },
  watch:{
    pickedQuote() {
      if (this.pickedQuote != null && this.Photo != null) {
        this.Loading.PostReady=true
      }
    },
    Photo() {
      if (this.pickedQuote != null && this.Photo != null) {
        this.Loading.PostReady=true
      }
    }
  },
  filters:{
    
  },
  computed:{
    PostsCount(){
      return this.Posts.length
    }
  },
  mounted(){
   this.getData()
  },
  created(){
  }

  }

</script>
<style lang="scss" scoped>
.my-card
{
  width: 100%
}


.my-card-img  
  {max-height: 77vh}

</style>
