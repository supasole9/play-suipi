const PLAYER_LIST = [];
const GAME_LIST = [];

function Player (data, ws) {
  this.playerName = data.name,
  this.playing = false,
  this.ws = ws,
  this.hand = []
}

var gameid = function () {
  var string = "";
  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 6; i++) {
    string += alphabets.charAt(Math.floor(Math.random() * alphabets.length ));
  }
  return string
}

function Game(player1, player2) {
  this.gameEnd = false,
  this.player1 = player1,
  this.player2 = player2,
  this.player1move = "",
  this.player2move = "",
  this.board = [],
  this.gameID = gameid()
};

const Check = function (data, ws) {
  if (data.action == "NewGame") {
    ws.send("Recieved New Game Request");
  }
};

module.exports = {check: Check}
