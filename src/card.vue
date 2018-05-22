<template>
  <div class="playingCards card" v-on:click="print">
    {{ Name }} {{ Suit }}
  </div>
</template>

<script>
  export default {
    props: ['name', 'suit', 'value'],
    data () {
      return {
        Suit: this.suit,
        Value: this.value,
        Name: this.name
      }
    },
    methods: {
      print: function () {
        console.log(this.suit, "and", this.name)
      }
    }
  }
</script>

<style>
.playingCards .card {
    display: inline-block;
    width: 3.3em;
    height: 4.6em;
    border: 1px solid #666;
    border-radius: .3em;
    -moz-border-radius: .3em;
    -webkit-border-radius: .3em;
    -khtml-border-radius: .3em;
    padding: .25em;
    margin: 0 .5em .5em 0;
    text-align: center;
    font-size: 1.2em; /* @change: adjust this value to make bigger or smaller cards */
    font-weight: normal;
    font-family: Arial, sans-serif;
    position: relative;
    background-color: #fff;
    -moz-box-shadow: .2em .2em .5em #333;
    -webkit-box-shadow: .2em .2em .5em #333;
    box-shadow: .2em .2em .5em #333;
}

.playingCards a.card {
    text-decoration: none;
}
/* selected and hover state */
.playingCards a.card:hover, .playingCards a.card:active, .playingCards a.card:focus,
.playingCards label.card:hover,
.playingCards strong .card {
    bottom: 1em;
}
.playingCards label.card {
    cursor: pointer;
}

.playingCards .card.back {
    text-indent: -4000px;
    background-color: #ccc;
    background-repeat: repeat;
    background-image: url(data:image/gif;base64,R0lGODlhJAAkAJEAAOjFsezdztOKbL5QKCH5BAAAAAAALAAAAAAkACQAAAL/HC4RAqm/mmLHyHmAbczB11Ea8ombJKSgKo6Z17pXFznmS1JptiX0z3vVhpEKDoUIkoa0olGIUeZUk1RI6Yn2mh/FDAt6frOrRRTqXPpsVLYugzxaVy+YcBdnoWPZOT0E4eckQtZFZBjWoHixQFWl6Nhol6R2p1Okt5TGaEWZA6fjiMdhZgPHeWrTWGVq+jTZg1HYyAEWKLYzmyiGKoUimilz+YYryyTlg5RcDJSAbNx0Q7lMcbIGEyzTK8zVdfVaImzs/QV+prYqWWW2ObkoOApM/Em/rUlIm7fijs8a2EEKEaZ3AsMUgneEU6RcpJbZ27aGHkAO2Ors8xQH1IR0Bn5YnOtVAAA7); /* image is "Pattern 069" from http://www.squidfingers.com/patterns/ */
    background-image: -moz-repeating-linear-gradient(34% 6% 135deg,#0F1E59, #75A1BF, #3E3E63 50%);
    background-image: -webkit-gradient(radial, center center, 20, center center, 80, from(#3c3), color-stop(0.4, #363), to(#030));
    /* yes, it's intentional that Mozilla, Webkit, Opera and IE all will get different backgrounds ... why not? :) */
}
</style>
