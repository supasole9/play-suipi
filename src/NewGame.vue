<template>
  <div>
    <button v-on:click="newGame">Start</button>
    <ul class="relative">
      <li v-for="card in deck">
        <card :name="card.name" :suit="card.suit" :value="card.value"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "./card.vue";

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
  },
  components:{
    'card': Card
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

.relative{
  /* position: relative; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
ul{
  padding-left: 0;
}

li{
  list-style: none;
  margin-left: 0;
}
</style>
