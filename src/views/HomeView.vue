<template>
  <div class="home">
    <Header subtitle="Repertoar"></Header>
    <Repertoire />
    
    <b-form>
      <b-form-input v-model="searchQuery" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button @click="search" size="sm" class="my-2 my-sm-0" type="submit">Pretrazi</b-button>
      <b-button @click="res" size="sm" class="my-2 my-sm-0" type="submit">Resetuj pretragu</b-button>
    </b-form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import {mapActions} from 'vuex';
import Repertoire from '@/components/Repertoire.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'HomeView',
  
    data() {
      return {
        searchQuery: ''
      }
    },

    components: {
      Repertoire,
      Header
    },

  methods: {
    ...mapActions([
      'fetchRepertoireIds',
      'fetchRepertoireIdsQuery'
    ]),
    
    search(e) {
        e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';

        this.fetchRepertoireIdsQuery(sq);
        
      },

          
    res(e) {
        e.preventDefault();
        this.fetchRepertoireIds();
        
      },

  },
  mounted(){
    this.fetchRepertoireIds();
  }

}
</script>
