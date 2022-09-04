<template>
  <div>
    <h4>User Comments</h4>

    <div v-if="token">
      <b-form-input
        v-model="comment"
        placeholder="Say something..."
        @keydown.enter="onSubmit"
      ></b-form-input>

      <b-card v-for="comment in show.comments" :title="comment.user.username" :key="comment.id">
        <b-card-text>
          {{ comment.text }}
        </b-card-text>
      </b-card>
    </div>
    <p v-else>You must be signed in to leave a comment</p>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Comments',

    props: {
      id: Number
    },

    data() {
      return {
        comment: '',
        show: {}
      }
    },

    computed: {
      ...mapState([
        'token'
      ])
    },

    
    mounted() {
        this.getShowEntry(this.id).then(r => this.show = r);
    },

    methods: {
      ...mapActions([
        'postComment',
        'getShowEntry'
      ]),

      onSubmit() {
        this.$socket.emit('comment', { text: this.comment, showId: this.show.id, userId: this.id });
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