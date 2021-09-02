<template>
  <div class="container">
    <div class="wrapCharacters">
      <div class="columns is-multiline">
        <div
          v-for="marvelCharacter in marvelCharacters"
          :marvelCharacter="marvelCharacter"
          :key="marvelCharacter.name"
          class="column is-one-quarter"
        >
          <marvelCharacter :marvelCharacter="marvelCharacter" />
        </div>
      </div>
      <div class="wrapBtn">
        <div class="columns is-multiline is-mobile">
          <div v-for="btn in btns" :btn="btn" :key="btn.name">
            <div class="column">
              <button
                v-on:click="marvelCharactersData(btn.skip, btn.limit)"
                :class="`btn button ${btn.class}`"
              >
                {{ btn.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marvelCharacter from "@/components/marvelCharacter";
import marvelService from "@/actions/marvelService.js";
export default {
  name: "listeCharacters",
  components: {
    marvelCharacter,
  },
  data() {
    return {
      btn: {},
      btns: [],
      marvelCharacter: {},
      marvelCharacters: [],
    };
  },
  created() {
    this.marvelCharactersData(0, 100);
  },
  methods: {
    async marvelCharactersData(skip, limit) {
      marvelService.marvelCharacters(skip, limit).then(
        ((data) => {
          this.$set(this, "marvelCharacters", data.marvelCharacters);
          this.$set(this, "btns", data.btns);
        }).bind(this)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapBtn, .wrapCharacters {
  margin: 50px;
}
</style>
