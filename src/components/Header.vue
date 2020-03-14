<template>
  <div class="header">
    <div class="header-selector-wrapper">
      <h2>GeoIP</h2>
      <div class="selector">
        <span @click="onHandleSelect" class="selector-active">{{
          active_lang
        }}</span>
        <div class="selector-arrow" :class="isOpen && 'rotate'"></div>
        <ul class="selector-list" v-show="isOpen">
          <li v-for="lang in langs" :key="lang" @click="changLang(lang)">
            <span :class="lang === active_lang && 'active'">{{ lang }}</span>
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
  padding: 0 40px;
  color: white;

  &-selector-wrapper {
    max-width: 936px;
    position: relative;
    width: 100%;
    text-align: center;
    h2 {
      font-weight: 800;
    }
  }

  .selector {
    position: absolute;
    right: 0;
    top: 4px;

    &-active {
      cursor: pointer;
    }

    &-arrow {
      content: "";
      display: inline;
      position: absolute;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 6px solid white;
      transition: all 0.2s ease-in;
      top: 4px;
      left: 25px;
    }

    &-list {
      position: absolute;
      left: 0;
      top: 24px;
      list-style: none;
      width: 56px;
      height: 92px;
      background: #ffffff;
      box-shadow: 0px 20px 50px rgba(229, 229, 229, 0.8);
      border-radius: 8px;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 18px;

      li {
        cursor: pointer;
      }
    }
  }

  .rotate {
    transform: rotate(180deg);
  }

  .active {
    color: $color_fiolet;
  }
}
</style>
