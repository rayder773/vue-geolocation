<template>
<!--  <v-app>-->
  <div>
    <Header />
<!--    <v-container>-->
      <DashBoard />
  </div>
<!--    </v-container>-->
<!--  </v-app>-->
</template>

<script>
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

export default {
  name: "App",

  components: {
    DashBoard,
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import "assets/main";
.v-menu__content {
  min-width: 56px !important;
  border-radius: 8px;
  /*top: 40px !important;*/
  /*left: 942px !important;*/
  .v-list-item {
    &:before {
      background: none;
    }
  }

  .v-list {
    .primary--text {
      color: $color_fiolet !important;
    }
  }

  .v-list-item__title {
    text-align: center;
    font-size: 18px;
    &:hover {
      color: $color_fiolet !important;
      background: none;
    }
  }
}
</style>
