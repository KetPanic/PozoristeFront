<template>
  <div class="home">
    <b-list-group>
    <div v-for="hall in halls">
      <Hall :hall="hall"/>
    </div>
  </b-list-group>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapActions, mapState} from 'vuex';
import Hall from '@/components/Hall.vue';

export default {
  name: 'Halls',
  
    components: {
      Hall
    },

computed: {
    ...mapState([
        'halls'
    ])
},

  methods: {
    ...mapActions([
      'fetchHalls'
    ])
  },
  mounted(){
    this.fetchHalls();
  }

}
</script>

<style scoped>
  .home{
    margin: auto;
    width: 60%;
    border: 5px solid #000000;
    padding: 10px;
  }
</style>