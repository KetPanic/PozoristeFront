<template>
    <div id="app">
      <Header subtitle="Izmeni profil"/>
  
      <b-form @submit="onSubmit">
  
        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-form-group label="Repeat password:" label-for="repeatPassword">
          <b-form-input id="repeatPassword" v-model="repeatPassword" type="password" required></b-form-input>
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
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'ProfileEdit',
      
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
          },
        repeatPassword: '',
        }
      },

      computed: {
        ...mapState([
            'user'
        ])
      },

      mounted(){
        if(!localStorage.getItem('token')){
                this.$router.push({ name: 'home'});
            }
        this.getUser().then( u => {
            this.form.email = this.user.email;
            this.form.username = this.user.username;
            this.form.name = this.user.name;
            this.form.surname = this.user.surname;
            this.form.type = this.user.type;
        })
      },
  
      methods: {
        ...mapActions([
          'register',
          'getUser',
          'editUser'
        ]),
  
        onSubmit(e) {
          e.preventDefault();
          if(this.form.password != this.repeatPassword){
            alert("Passwords don't match");
          }else if(this.form.password.length < 4){
            alert("Password must be at least 4 characters long");
          }else{
            this.editUser(this.form).then(res => {
              if(res){
                this.$router.push({ name: 'Login' });
            }
          })
          }
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  