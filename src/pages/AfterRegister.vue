<template>
  <div class="fullscreen bg-teal-7 text-white text-center q-pa-md column justify-center">
    <div>
      <div class="row  justify-center">
        <q-stepper
            class="col-12 col-md-6 col-sm-6"
            v-model="step"
            vertical
            color="warning"
            animated
            >
            <q-step
                :name="1"
                title="Profile Picture"
                icon="user"
                :done="step > 1"
                class="text-grey-10"
            >
                <q-uploader
                color="teal"
                flat
                hide-upload-btn
                bordered
                @added='addProfilePicture'   
                class="full-width col"
                accept="image/*"
                />
                <q-stepper-navigation class="row justify-end">
                <q-btn @click="UploadProfilePicture" color="primary" :loading="afterRegisterLoading" label="Continue" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="2"
                title="Cover Picture"
                icon="user"
                :done="step > 2"
                class="text-grey-10"
            >
                <q-uploader
                color="teal"
                flat
                hide-upload-btn
                bordered
                @added='addCoverPicture'   
                class="full-width col"
                accept="image/*"
                />
                <q-stepper-navigation class="row justify-end">
                <q-btn @click="UploadCoverPicture" color="primary" :loading="afterRegisterLoading" label="Continue" />
                <q-btn flat @click="step-=1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="3"
                title="Everything is set "
                icon="done"
                class="text-grey-10 text-weight-bold"
            >
                <q-stepper-navigation class="row justify-end">
                <q-btn color="blue-10 " label="Finish" @click="FinishSetting"/>
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  data () {
    return {
      step: 1,
      loadings:{
          profilePicture:false,
          coverPicture:false,
      },
      ProfilePicture:null,
      CoverPicture:null,
    }
  },
  methods:{
    ...mapActions('ProfileStore',['firebaseUpdateProfilePicture','firebaseUpdateCoverPicture']),
    UploadProfilePicture()
    {
        this.firebaseUpdateProfilePicture(this.ProfilePicture)
        .then(response => {
        }).catch(error => {
            if (error) {
            this.step+=1
            }
        })
    },
    UploadCoverPicture()
    {
        this.firebaseUpdateCoverPicture(this.CoverPicture)
        .then(response => {
        }).catch(error => {
            if (error) {
            this.step+=1
            }
        })
    },
    addCoverPicture(file)
    {
    this.CoverPicture=file[0]
    },
    addProfilePicture(file)
    {
    this.ProfilePicture=file[0]
    },
    FinishSetting()
    {
        this.$router.push({name:'Profile',params : {userId:this.userCredential.UserId}})
    }
  },
  computed:{
      ...mapState('ProfileStore',['afterRegisterLoading']),
      ...mapState('AuthStore',['userCredential'])
  }
}
</script>

<style>

</style>