<template>
  <div class="header">
    <div class="container header-selector-wrapper">
      <h2>GeoIP</h2>
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
          lang
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { langs: ["ru", "en"] };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/main";
.header {
  /*height: 48px;*/
  background: $color_fiolet;
  text-align: center;

  &-selector-wrapper {
    position: relative;
    h2 {
      line-height: 48px;
      margin: 0;
      color: white;
      font-size: 18px;
      font-weight: bold;
    }

    select {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
