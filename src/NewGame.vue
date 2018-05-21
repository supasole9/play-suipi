<template>
  <div>
    <button v-on:click="newGame">Start</button>
    <div v-for="card in deck">
      <div>
        {{ card.value }} {{ card.suit }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      deck: []
    }
  },
  methods: {
    newGame: function () {
      let thisState = this;
      fetch("http://localhost:9090/newgame", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
        return res.json();
      }).then(function(res) {
        thisState.deck = res.Deck;
      })
    }
  },
  created: function () {
    console.log("New Game Page");
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
