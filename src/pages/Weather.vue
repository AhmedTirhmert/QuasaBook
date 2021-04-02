<template>
  <q-page class=" q-pa-md column justify-start ">
        <q-input  color="primary" class="q-mb-md col-1"  outlined   dense v-model="city" placeholder="City"     @keyup.enter="Search">
        <template v-slot:append>
          <q-icon :style="{'cursor':'pointer'}" name="search"  @click="Search"/>
        </template>
        <template v-slot:hint >
          Enter The City name
        </template>
      </q-input>

    <q-card v-if="city" :class="!weather ? 'my-card col column justify-center'  : 'my-card ' ">
        <q-img v-if="weather" :src="require(`../assets/${weather.weather[0].main}.jpg`)" :alt="weather.weather[0].main" class="my-card-img " :ratio="9/16" no-default-spinner>
        <div class=" absolute-full text-center column justify-center">
          <div class="text-h4 q-my-md text-weight-light text-blue-grey-1">{{weather.name}} </div>
          <div class="text-h6  text-weight-light text-blue-grey-1">({{weather.sys.country}})</div>
          <div class="text-h1 q-my-md  text-weight-regular ">{{Math.round(weather.main.temp)}} °C</div>
          <div class="text-h4 q-my-md text-weight-light text-blue-grey-1">{{weather.weather[0].main}}</div>
          <div class="text-h6 q-my-md text-weight-light text-blue-grey-1">({{weather.weather[0].description}})</div>
        </div>
        </q-img>
     
      <q-card-section v-else class="q-p-lg row justify-center">
        <q-spinner-hourglass
        :style="{'opacity':'0.4'}"
          color="primary"
          :thickness='2'
          size="7em"
        />
      </q-card-section>
      
    </q-card>
    <div v-else class="text-h3 text-center text-italic text-weight-thin text-grey-13 col column justify-center">
      Search City
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
// import lbldan from '../JsonData/Cities.json'
let APIkey = '1955037538f91d8c7dbcea03baae0bec'
import MorseCode from '../JsonData/MorseCode'

export default {
  name: 'PageIndex',
  data () {
    
    return {

      city:"",
      weather:null,
      
    }
  },
    methods: {


    Search(){
      if (this.city=='') {
        this.$q.notify({
            timeout:500,
            message:`Enter a City Name You dump Shit  💩 `,
            classes:' full-width text-center',
            position:'top',
            color:'teal-10',
            progress:true
        })
      }else{
      axios({
            method:'GET',
            url:`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${APIkey}&units=metric`,
            })
      .then((response)=>{
            this.weather=response.data
        })
        .catch((err)=>{
            this.$q.notify({
              timeout:1000,
              message:`unfortunately ${err.response.data.message.toUpperCase()   } 😟 `,
              classes:' full-width text-center'
            })
            this.city=''
      })
      }

    }
  },
  watch:{
    city () {
      if (this.city=='') {
        this.weather=null
      }
    }
  },
  mounted(){
    console.log(MorseCode);

  }

  }

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
.my-card-img  
  max-height: 77vh

</style>
