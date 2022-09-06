<template>
    <div id="app">
      <div v-if="gotData" @onclick="">
          <p :v-if="rep.show">{{rep.show.description}}</p>
          <img :src="image">
      </div>
      
    </div>
  </template>
  
  <script>
    import { mapActions } from 'vuex';
  
    export default {
      name: 'Show',
 
      props: {
        rep: {}
      },
  
      data() {
          return {
              image: '',
              gotData: false
          }
      },
  
      watch: {
        rep(nVal, oVal){
            this.image = 'data:image/jpeg;base64,'+ nVal.show.image;
        },
      },
  
      mounted() {
        this.image = 'data:image/jpeg;base64,'+ this.rep.show.image;
        this.gotData = true;
      },
  
      methods: {
        ...mapActions([
          'getRepertoireEntry'
        ]),
  
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  