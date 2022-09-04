<template>
    <div id="app">
      <div v-if="gotData">
        <Header :subtitle="subtitle"/>
        <Show :rep="rep"></Show>
      </div>
  
    </div>
  </template>
  
  <script>
    import Header from '@/components/Header.vue';
    import Comments from '@/components/Comments.vue';
    import Show from '@/components/Show.vue';
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'ShowView',
      
      components: {
        Header,
        Comments,
        Show
      },
  
      computed: {
          ...mapState([
              'token',
              'id'
          ])
      },
  
      data() {
          return {
              subtitle: '',
              repID: null,
              rep: {},
              show: null,
              image: '',
              gotData: false,
          }
      },
  
      watch: {
        $route() {
          this.repID = this.$route.params.id;
  
          this.getRepertoireEntry(this.repID).then(r => {
            this.rep = r;
            this.image = 'data:image/jpeg;base64,'+ r.show.image;
            this.subtitle = r.show.name;
            this.gotData = true;
          }); 
  
      },
    },
  
      mounted() {
          this.repID = this.$route.params.id;
  
          this.getRepertoireEntry(this.repID).then(r => {
            this.rep = r;
            this.image = 'data:image/jpeg;base64,'+ r.show.image;
            this.subtitle = r.show.name;
            this.gotData = true;
          });
      },
  
      methods: {
        ...mapActions([
          'getRepertoireEntry',
        ]),
      }
    }

  </script>
  
  <style scoped>
  
  </style>
  