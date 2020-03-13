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

</style>
