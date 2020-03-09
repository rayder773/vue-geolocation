<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-wrapper">
        <div class="d-flex flex-column dashboard-wrapper-block">
          <div>{{ $t("ip") }}</div>
          <div v-show="loading">loading</div>
          <div v-show="error">{{ error }}</div>
          <input v-model.trim="ip" class="dashboard-wrapper-input" />
          <button @click="getInfo">{{ $t("information") }}</button>
<!--          <button @click="showInfo">Click</button>-->
        </div>
        <div class="d-flex flex-column">
          <div>{{ $t("result") }}</div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ip</th>
                  <th class="text-left">continent</th>
                  <th class="text-left">country</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in info" :key="item.ip">
                  <td>{{ item.ip }}</td>
                  <td>{{ item.continent }}</td>
                  <td>{{ item.country }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div class="d-flex flex-column">
          <div>{{ $t("history") }}</div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ip</th>
                  <th class="text-left">continent</th>
                  <th class="text-left">country</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in history" :key="item.ip + i">
                  <td>{{ item.ip }}</td>
                  <td>{{ item.continent }}</td>
                  <td>{{ item.country }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <button @click="cleanHistory">{{$t('history_clean')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapMutations } from "vuex";

const GET_GEO = gql`
  query($ip: String!) {
    ipAddress(address: $ip) {
      country {
        alpha2Code
        name
        continent {
          name
        }
      }
      city {
        name
        location {
          lat
          long
        }
      }
    }
  }
`;

export default {
  name: "DashBoard",
  props: {
    msg: String
  },
  computed: mapState(["history"]),
  data: () => ({
    ip: "",
    info: [],
    loading: false,
    error: ""
  }),
  methods: {
    ...mapMutations(["addToHistory", "cleanHistory"]),
    async getInfo() {
      this.info = [];
      await this.$apollo
        .query({
          query: GET_GEO,
          variables: {
            ip: this.ip
          }
        })
        .then(({ data: { ipAddress } }) => {
          console.log(ipAddress);
          this.info.push({
            ip: this.ip,
            continent: ipAddress.country.continent.name,
            country: `${ipAddress.country.name}/${ipAddress.country.alpha2Code}`
          });
          this.addToHistory(this.info);
          // this.addToHistory(this.info);
        })
        .catch(err => (this.error = err));
    },
    showInfo() {
      console.log(this.history);
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

  &-block {
    margin-bottom: 48px;
  }

  &-input {
    border: 1px solid #cccccc;
    box-sizing: border-box;
    border-radius: 8px;
    height: 45px;
    max-width: 396px;
    padding-left: 18px;
    outline: none;
    margin: 8px 0 18px;

    &:focus {
      border: 1px $color_fiolet solid;
    }
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
