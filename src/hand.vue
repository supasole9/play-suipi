<template>
  <div>
    <h1>Hand</h1>
    <div v-for="card in hand">
      {{ card }}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hand: {}
      }
    }
  }
</script>

<style>

</style>
