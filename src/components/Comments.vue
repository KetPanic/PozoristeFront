<template>
  <div>
    <h4>Komentari</h4>

    <div v-if="token">
      <b-form-input
        v-model="comment"
        placeholder="Napisite nesto..."
        @keydown.enter="onSubmit"
      ></b-form-input>
    </div>
    <p v-else>Morate biti prijavljeni da biste ostavili komentar</p>
      <b-card v-for="comment in show.comments" :title="comment.user.username" :key="comment.id">
        <b-card-text>
          {{ comment.text }}
        </b-card-text>
      </b-card>
      <hr>
      <br>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Comments',

    props: {
      showId: Number
    },

    data() {
      return {
        comment: '',
        show: {}
      }
    },

    computed: {
      ...mapState([
        'token',
        'id'
      ])
    },

    
    mounted() {
        this.getShowEntry(this.showId).then(r => this.show = r);
    },

    methods: {
      ...mapActions([
        'postComment',
        'getShowEntry'
      ]),

      onSubmit() {
        this.$socket.emit('comment', { text: this.comment, showId: this.show.id, userId: this.id, token:this.token });
        this.comment = '';
      }
    }
  }

</script>

<style scoped>
  .card {
    margin-top: 10px;
    text-align: left;
  }

  .card-title {
    margin-bottom: 0px;
  }

  .card-body {
    padding-bottom: 5px;
  }
</style>