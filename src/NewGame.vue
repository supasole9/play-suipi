<template>
  <div>
    <button v-if="game" v-on:click="newGAME">Start</button>
    <div class="board">
      <ul class="relative">
        <li v-for="card in board" v-bind:key="card.id">
          <card :name="card.name" :suit="card.suit" :value="card.value" :symbol="card.symbol"></card>
        </li>
      </ul>
    </div>

    <div class="hand">
      <ul class="hand relative">
        <li v-for="card in hand" v-bind:key="card.id">
          <card :name="card.name"
                :suit="card.suit"
                :value="card.value"
                :symbol="card.symbol"
                v-on:discard="discard(card)"
          ></card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from "./card.vue";

export default {
  name: 'game',
  data () {
    return {
      board: [],
      hand: [],
      game: true,
      showOption: false,
      gameId: null
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
      })
    },
    newGAME: function () {
      this.game = false;
      this.socket.send(JSON.stringify({
        action: "NewGame",
        name:"Ross"
      }))
    },
    discard: function(card){
      this.hand.splice(card.key, 1);
      this.socket.send(JSON.stringify({
        action: "Game-Play",
        adjective: "Discard",
        gameId: this.gameId,
        object: card
      }))
    }
  },
  created: function () {
    let thisState = this;
    // var HOST = location.origin.replace(/^http/, 'ws');
    this.socket = new WebSocket("ws://localhost:9090");

    this.socket.onopen = function () {
      console.log("Were Ready");
    };

    this.socket.onmessage = function (event) {
      logMessages(event.data, thisState);
    };
  },
  components:{
    'card': Card
  }
};

var logMessages = function (e, app) {
  var data = JSON.parse(e);
  if(data.action == "newGame") {
    app.board = data.board;
    app.hand = data.hand;
    app.gameId = data.gameID;
  } else if (data.action == "Play" && data.adjective == "Discarded") {
    app.board = data.board;
    app.hand = data.hand;
  }
};

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

.board{
  margin-top: 250px;
  height: 200px;
}

.hand{
  height: 25%;
}
.relative{
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
