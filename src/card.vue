<template>
  <div class="card" v-bind:class="[{red: isRed}, {select: selected}]">
    <span v-on:click="isSelected"> {{ Name }} </span> <br>
    <span v-html="SSymbol"></span> <br>
    <button type="button" v-if="selected" v-on:click="$emit('discard')">
      Discard
    </button>
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
        selected: this.selected,
        isRed: false
      }
    },
    methods: {
      print: function () {
        console.log(this.suit, this.name)
      },
      isSelected: function(){
        if (this.selected){
          this.selected = false;
        } else {
          this.selected = true;
        }
      }
    },
    created: function () {
      if (this.suit == "Hearts" || this.suit == "Diamonds") {
        this.isRed = true
      } else {
        this.isRed = false
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

.selected{
  color: blue;
}

</style>
