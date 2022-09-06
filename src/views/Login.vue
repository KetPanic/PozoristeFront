<template>
  <div id="app">
    <Header subtitle="Prijavite se"/>
    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();

        if(this.form.username.length < 1){
            alert('Username can\'t be null');
        }else if(this.form.password.length < 4){
            alert('Password must be at least 4 characters long');
        }else{
            this.login(this.form).then(res => {
                if(res){
                    this.$router.push({ name: 'home' });
                }else{
                    this.form.password='';
                }
            });
        }

      }
    }
  }
</script>

<style scoped>

</style>
