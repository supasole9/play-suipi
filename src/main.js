import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Dashboard from './Dashboard.vue';
import Home from './Home.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/', component: Home }
];

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
