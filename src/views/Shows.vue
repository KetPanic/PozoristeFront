<template>
  <div class="home">
    <b-card-group v-if="showIds.length != 0">
      <div v-for="id in showIds" :key="id" @click="redir(id)">
        <ShowTile :id="id"></ShowTile>
      </div>
      
    </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState, mapActions} from 'vuex';
import ShowTile from '@/components/ShowTile.vue';

export default {
  name: 'Shows',
  
    components: {
      ShowTile
    },

    computed: {
      ...mapState([
        "showIds"
    ])
    },

  methods: {
    ...mapActions([
      'fetchShowIds'
    ]),
    redir(id){
      this.$router.push({ name: 'ShowView', params: { id: id} });
    }
  },
  mounted(){
    this.fetchShowIds();
  }

}
</script>
