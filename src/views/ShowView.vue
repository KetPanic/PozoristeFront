<template>
    <div id="app">
      <div v-if="gotData">
        <Header :subtitle="subtitle"/>
        <Show :rep="rep"></Show>
        <hr/>
        <Repertoire />
        <hr>
        <Comments :showId="rep.show.id"></Comments> 
      </div>
  
    </div>
  </template>
  
  <script>
    import Header from '@/components/Header.vue';
    import Comments from '@/components/Comments.vue';
    import Show from '@/components/Show.vue';
    import Repertoire from '@/components/Repertoire.vue';
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'ShowView',
      
      components: {
        Header,
        Comments,
        Show,
        Comments,
        Repertoire
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
            this.fetchRepertoireIdsForShow(r.show.id);
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
            this.fetchRepertoireIdsForShow(r.show.id);
            this.gotData = true;
          });
      },
  
      methods: {
        ...mapActions([
          'getRepertoireEntry',
          'fetchRepertoireIdsForShow'
        ]),
      }
    }

  </script>
  
  <style scoped>
  
  </style>
  