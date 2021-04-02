<template>
  <q-page class=" q-pa-md column justify-start bg-grey-11">
        <!-- <q-input
          color="primary"
          class="q-mb-md col-1"
          outlined
          dense
          v-model="morse"
          placeholder="Type in your text"
          @keyup.enter="translate">
            
        <template v-slot:append>
          <q-icon :style="{'cursor':'pointer'}" name="translate" color="primary"  @click="translate"/>
        </template> 
      </q-input> -->
        

    <q-card  class="my-card  col column justify-center">
        <q-card-section class="col" >
            <q-input
            class="textArea"
                v-model="Input"
                type="textarea"
                outlined
                autogrow
                autofocus
            />
        </q-card-section>
        <q-separator />
        <q-card-section class="col" >
            <q-input
                v-model="morse"
                class="textArea"
                type="textarea"
                outlined
                readonly
                autogrow
            />
        </q-card-section>
        <q-card-actions v-if="morse" class="row">
        <q-btn
            color="cyan-8"
            
            class="col"
            icon="copy_all"
            @click="Copy">
          Copie
        </q-btn>
         <q-btn
            color="orange-14"
            
            class="col"
            icon="clear"
            @click="Clear">
          Clear
        </q-btn>
      </q-card-actions>
    </q-card>

     
    <!-- <div class="text-h3 text-center text-italic text-weight-bold text-grey-13 col column justify-center">
      Morse PAGE
    </div> -->

  </q-page>
</template>

<script>
import MorseCode from '../JsonData/MorseCode'
import { copyToClipboard } from 'quasar'

export default {

  data () {
    
    return {

      Input:"",
      morse:"",
      weather:null,
      
    }
  },
    methods: {

    Clear(){
        this.morse=''
        this.Input=''
    },
    Copy()
    {
        copyToClipboard(this.morse)
        .then(() => {
            this.$q.notify({
                timeout:700,
                message:`Copied To ClipBoard`,
                classes:' ',
                position:'bottom',
                icon:'content_paste',
                color:'green-10',
            })
        })
        .catch(() => {
            // fail
        })
    }
  },
  destroyed(){
    console.log('this is destroyed ');
  },
  watch:{
    Input (NewVal,OldVal) {
        if (this.Input.length==0) {
            this.morse=''
        }
            if (NewVal.length<OldVal.length ) {
                this.morse=this.morse.slice(0,this.morse.length-MorseCode[OldVal[OldVal.length-1]].length)
            }else{
                if (MorseCode[this.Input[this.Input.length-1].toLowerCase()]) {
                this.morse+=`${MorseCode[this.Input[this.Input.length-1].toLowerCase()]} `
                }else{
                this.morse+='\n'
            }
            }
         
        
    }
  },
  mounted(){

  }

  }

</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');
.textArea{
    font-family: "Sriracha";
    font-weight: 200;
    font-size: 1.2rem;
    line-height: 2rem !important;
    
}
.my-card{
    width: 100%;
    .morse{
        min-height: 50vh;
        max-width: 100px;
    }
}
    
    
.my-card-img  {
      max-height: 77vh
}

</style>
