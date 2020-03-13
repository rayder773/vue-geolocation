<template>
  <div class="header">
    <div class="header-selector-wrapper">
      <h2>GeoIP</h2>
      <div class="selector">
        <span @click="onHandleSelect" class="selector-active">{{
          active_lang
        }}</span>
        <ul class="selector-list" v-show="isOpen">
          <li v-for="lang in langs" :key="lang" @click="changLang(lang)">
            {{ lang }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  created() {
    window.addEventListener("click", this.onCloseSelect, false);
  },
  destroyed() {
    window.removeEventListener("click", this.onCloseSelect, false);
  },
  data() {
    return {
      langs: ["RU", "EN"],
      active_lang: this.$i18n.locale.toUpperCase(),
      isOpen: false
    };
  },
  methods: {
    changLang(lang) {
      this.$i18n.locale = lang.toLowerCase();
      this.active_lang = this.$i18n.locale.toUpperCase();
    },
    onHandleSelect() {
      this.isOpen = !this.isOpen;
    },
    onCloseSelect(e) {
      if (!e.target.parentNode.classList.contains("selector")) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/main";
.header {
  height: 48px;
  background: $color_fiolet;
  display: flex;
  align-items: center;
  justify-content: center;

  &-selector-wrapper {
    max-width: 936px;
    position: relative;
    width: 100%;
    text-align: center;
  }

  .selector {
    position: absolute;
    right: 0;
    top: 4px;

    &-list {
      position: absolute;
    }

    &:focus-within {
      color: red;
      /*.selector-list{*/
      /*  display: initial;*/
      /*}*/
    }
  }
}
</style>
