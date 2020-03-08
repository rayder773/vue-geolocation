<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-wrapper">
        <div class="d-flex flex-column">
          <div>{{ $t("ip") }}</div>
          <input v-model.trim="ip" class="dashboard-wrapper-input" />
          <button @click="getInfo">{{ $t("information") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "DashBoard",
  props: {
    msg: String
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`
      query {
        ipAddress(address: "189.59.228.170") {
          city {
            name
          }
        }
      }
    `
  },
  data: () => ({
    ip: ""
  }),
  methods: {
    getInfo() {
      console.log(this.ip);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/main";
.dashboard-wrapper {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(230, 230, 230, 0.8);
  min-height: 619px;
  max-width: 936px;
  margin: 57px auto 0;
  padding: 48px;

  &-input {
    border: 1px solid #cccccc;
    box-sizing: border-box;
    border-radius: 8px;
    height: 45px;
    max-width: 396px;
    padding-left: 18px;
    outline: none;
    margin: 8px 0 18px;
  }

  button {
    background: $color_red;
    opacity: 0.85;
    height: 48px;
    max-width: 256px;
    border-radius: 8px;
    color: white;
    outline: none;

    &:hover {
      background: $color_red_hover;
    }
  }
}
</style>
