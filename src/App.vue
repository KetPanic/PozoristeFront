<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand to="/">Pozoriste</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Repertoar</b-nav-item>
            <b-nav-item to="/Predstave">Predstave</b-nav-item>
            <b-nav-item to="/Sale">Sale</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!token" to="/register">Registracija</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Prijava</b-nav-item>
            <b-nav-item v-if="token" to="/profil">Profil</b-nav-item>
            <b-nav-item v-if="token" @click="logout()">Odjava</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
    name: 'App',

    computed: {
      ...mapState([
        'token'
      ])
    },

    mounted() {
      if (localStorage.token) {
        const t = {
          token: localStorage.token,
          id: localStorage.id
        }
        this.setToken(t);
      }
    },

    methods: {

      ...mapMutations([
        'removeToken',
        'setToken'
      ]),

      logout() {
        this.removeToken();
      },

    },
    
      sockets: {
      error(err) {
        alert(err);
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
