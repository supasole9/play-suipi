<template>
  <div class="card" v-bind:class="{red: isRed}" v-on:click="print">
    {{ Name }} <br>
    <span v-html="SSymbol"></span>
  </div>
</template>

<script>
  export default {
    props: ['name', 'suit', 'value', 'symbol'],
    data () {
      return {
        Suit: this.suit,
        Value: this.value,
        Name: this.name,
        SSymbol: this.symbol,
        isRed: function () {
          if (this.suit == "Hearts" || this.suit == "Diamonds") {
            return true
          } else {
            return false
          }
        }
      }
    },
    methods: {
      print: function () {
        console.log(this.suit, this.name)
      }
    }
  }
</script>

<style>

.card {
  border-color: #808080 #000000 #000000 #808080;
  border-width: 1px;
  border-style: solid;
  color: #000000;
  font-size: 2rem;
  width:  3.75em;
  height: 5.00em;
  margin: 5px;
}

.red{
  color: red;
}

</style>
