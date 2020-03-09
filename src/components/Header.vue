<template>
  <div class="header">
    <div class="container header-selector-wrapper">
      <h2>GeoIP</h2>
      <div class="selector">
        <v-select
          :items="langs"
          @change="changLang"
          outlined
          :value="this.$i18n.locale.toUpperCase()"
        >
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { langs: ["RU", "EN"] };
  },
  methods: {
    changLang(lang) {
      this.$i18n.locale = lang.toLowerCase();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/main";
.header {
  /*height: 48px;*/
  background: $color_fiolet;
  text-align: center;

  &-selector-wrapper {
    position: relative;
    padding: 0 !important;
    h2 {
      line-height: 48px;
      margin: 0;
      color: white;
      font-size: 18px;
      font-weight: bold;
    }

    .selector {
      position: absolute;
      right: 0;
      top: 0;

      .primary--text {
        caret-color: white !important;
        color: white !important;
      }

      .v-select__selection {
        color: white !important;
      }

      .v-input {
        max-width: 70px;
      }

      fieldset {
        border: none !important;
      }
      .v-input__icon {
        position: absolute;
        left: 20px;
      }

      .v-icon {
        color: white;
      }
    }
  }


}


</style>
