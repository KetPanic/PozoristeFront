import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Shows from '@/views/Shows.vue';
import Halls from '@/views/Halls.vue';
import RepertoireEntry from '@/views/RepertoireEntry.vue';
import ShowView from '@/views/ShowView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/predstave',
    name: 'Shows',
    component: Shows
  },
  {
    path: '/predstava/:id',
    name: 'ShowView',
    component: ShowView
  },
  {
    path: '/sale',
    name: 'Halls',
    component: Halls
  },
  {
    path: '/predstavaRepertoar/:id/:name',
    name: 'RepertoireEntry',
    component: RepertoireEntry
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
