<template>
  <div id="app">
    <Header />
    <DashBoard />
  </div>
</template>

<script>
import DashBoard from "./components/DashBoard.vue";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
    DashBoard
  }
};
</script>

<style lang="scss">

</style>
