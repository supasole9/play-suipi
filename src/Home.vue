<template>
  <div id="app" class="wrapper">
    <h1>SUIPI</h1>
    <app-error v-if="error"></app-error>
    <input type="text" v-model="email"> <br>
    <input type="text" v-model="password"> <br>
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>
import LoginError from "./Error.vue"
export default {
  name: 'app',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    login: function () {
      let encoded = "email=" + this.email + "&password=" + this.password;
      let thisState = this;
      fetch("http://localhost:9090/users", {
        body: encoded,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res) {
        if (res.status == 201) {
          thisState.$router.push("/dashboard");
        } else {
          thisState.error = true;
        }
      })
    }
  },
  created: function () {
    console.log("working");
  },
  components: {
    'app-error': LoginError
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
