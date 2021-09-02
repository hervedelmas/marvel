<template>
  <div class="">
    <div class="card">
      <div class="card-content">
        <h2 class="">
          {{ marvelCharacter.name }}
        </h2>
        <img :src="`${marvelCharacter.thumbnail}`" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["marvelCharacter"],
};
</script>
<style lang="scss" scoped>
img {
    height: auto;
    max-width: 100%;
    border-radius: 0.375em;
}
.card {
  height: 420px;
  background-position: center;
  background-size: cover;
  text-align: center;
  background-color: black;   
  border-radius: .375em;
}
.card-content {
  padding-top: 5px;
  position: absolute;
  color: #fff;
  background-color: black;
  top: 0;
  width: 100%;    
  border-radius: 0.375em;
  span {
    font-size: 18px;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 10px;
    right: 0;
  }
  h2 {
    margin-top: 10px;
  }
}
</style>
