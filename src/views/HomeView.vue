<template>
  <div class="home">
    <Repertoire />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import {mapActions} from 'vuex';
import Repertoire from '@/components/Repertoire.vue';

export default {
  name: 'HomeView',
  
    components: {
      Repertoire
    },

  methods: {
    ...mapActions([
      'fetchRepertoireIds'
    ])
  },
  mounted(){
    this.fetchRepertoireIds();
  }

}
</script>
