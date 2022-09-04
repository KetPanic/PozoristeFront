<template>
  <div id="app">
    <Header subtitle="Create account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter username" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Surname:" label-for="surname">
        <b-form-input id="surname" v-model="form.surname" placeholder="Enter surname" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          email: '',
          username: '',
          password: '',
          name: '',
          surname: '',
          type: 2
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();
        if(this.form.password.length < 4){
          alert("Password must be at least 4 characters long");
        }else{
          this.register(this.form).then(res => {
            if(res){
              this.$router.push({ name: 'Home' });
          }
        })
        }
      }
    }
  }
</script>

<style scoped>

</style>
