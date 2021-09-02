<template>
  <div class="home">
    <figure class="image">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Marvel_Studios_logo.svg/2560px-Marvel_Studios_logo.svg.png"
      />
    </figure>
    <h1 class="container title is-1">... OUR HEROES</h1>
    <marvelCharactersList />
  </div>
</template>
<script>
import marvelCharactersList from "../components/marvelCharactersList";
export default {
  name: "marvel",
  components: {
    marvelCharactersList,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
h1 {
  padding-top: 50px;
  text-align: center;
}
</style>
