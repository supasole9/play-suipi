const Cards = require("./cards");

const PLAYER_LIST = [];
const GAME_LIST = [];

const gameid = function () {
  var string = "";
  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 6; i++) {
    string += alphabets.charAt(Math.floor(Math.random() * alphabets.length ));
  }
  return string
};

const gameDeal = function (deck, p1, p2, game) {
  let checkDuplicate = [];
  let boardCount = 4;

  for (var i = 0; i < 8; i++ ){
    p1.hand.push(deck[i]);
    deck.splice(i, 1)
    p2.hand.push(deck[i]);
    deck.splice(i, 1)
  }

  let j = deck.length - 1;

  while (boardCount){
      if (deck[j].name == 'A'){
        Cards.shuffle(deck);
      }
      else if (deck[j].suit == 'Spades') {
        if(deck[j].name == '2' || checkDuplicate.includes(deck[j].value)){
        Cards.shuffle(deck);
        } else{
          game.board.push(deck[j]);
          checkDuplicate.push(deck[j].value);
          deck.pop();
          j--;
          boardCount--;
        }
      }
      else if (deck[j].suit == 'Diamonds'){
        if (deck[j].name == '10' || checkDuplicate.includes(deck[j].value)){
          Cards.shuffle(deck);
        } else{
          game.board.push(deck[j]);
          checkDuplicate.push(deck[j].value);
          deck.pop();
          j--;
          boardCount--;
        }
      }
      else if(checkDuplicate.includes(deck[j].value)){
        Cards.shuffle(deck);
      }
      else{
        game.board.push(deck[j]);
        checkDuplicate.push(deck[j].value);
        deck.pop();
        j--;
        boardCount--;
      }
  }
};

function Player (data, ws) {
  this.playerName = data.name,
  this.playing = false,
  this.ws = ws,
  this.hand = [],
  this.gameID = null,
  this.scoredDeck = []
};

function Game(player1, player2) {
  this.gameDeck = new Cards.deck,
  this.gameEnd = false,
  this.player1 = player1,
  this.player2 = player2,
  this.board = [],
  this.gameID = gameid()
};

const Check = function (data, ws) {
  if (data.action == "NewGame") {
    var p = new Player(data, ws);
    confirmSignIn(data, ws);
    gamefind(p);
    PLAYER_LIST.push(p);
  } else if (data.action == "Game-Play") {
    gamePlayCheck(data, ws, data.gameId);
  }
};

const confirmSignIn = function (playerData, websocket) {
  websocket.send(JSON.stringify({
    action: "signupSuccess"
  }))
};

const gamefind = function (person) {
  for (var aa in PLAYER_LIST) {
    var pp = PLAYER_LIST[aa];
    if (pp.playing == false && person.ws != pp.ws) {
      person.playing = true;
      pp.playing = true;
      var newGame = new Game(pp, person);
      GAME_LIST.push(newGame);
      gameDeal(newGame.gameDeck, pp, person, newGame)
      newGame.player1.ws.send(JSON.stringify( {action: "newGame", gameID: newGame.gameID, opponentName: person.name, hand: pp.hand, board: newGame.board}));
      newGame.player2.ws.send(JSON.stringify( {action: "newGame", gameID: newGame.gameID, opponentName: pp.name, hand: person.hand, board: newGame.board} ));
    }
  } return
};

const gamePlayCheck = function (data, websocket, gameId) {
  for (game in GAME_LIST) {
    if (GAME_LIST[game].gameID == gameId) {
      if (data.adjective == "Discard") {
        GAME_LIST[game].board.push(data.object);
        if (GAME_LIST[game].player1.ws == websocket) {
          remove(GAME_LIST[game].player1.hand, data.object);
          console.log(GAME_LIST[game].player1.hand)
          console.log(GAME_LIST[game].board);
          GAME_LIST[game].player1.ws.send(JSON.stringify({action:"Play", adjective: "Discarded", hand: GAME_LIST[game].player1.hand, board:GAME_LIST[game].board}))
          GAME_LIST[game].player2.ws.send(JSON.stringify({action:"Play", adjective: "Discarded", hand: GAME_LIST[game].player2.hand, board:GAME_LIST[game].board}))
        } else if (GAME_LIST[game].player2.ws == websocket) {
          remove(GAME_LIST[game].player2.hand, data.object);
          GAME_LIST[game].player1.ws.send(JSON.stringify({action:"Play", adjective: "Discarded", hand: GAME_LIST[game].player1.hand, board:GAME_LIST[game].board}))
          GAME_LIST[game].player2.ws.send(JSON.stringify({action:"Play", adjective: "Discarded", hand: GAME_LIST[game].player2.hand, board:GAME_LIST[game].board}))
        } else {
          console.log("error");
        }
      } else if (data.adjective == "Match") {

      }
    }
  }
};

function remove(array, element) {
  let pos = 0;
  for (let i = 0; i < array.length; i++) {
    if (element.id == array[i].id){
      console.log(i)
      pos = i;
      break;
    }
  }
  array.splice(pos, 1);
};

module.exports = {check: Check}
