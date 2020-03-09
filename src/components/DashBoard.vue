<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-wrapper">
        <div class="d-flex flex-column dashboard-wrapper-block">
          <div class="dashboard-wrapper-label-container">
            <div>{{ $t("ip") }}</div>
            <div v-show="error" class="dashboard-wrapper-label-container-error">
              {{ error }}
            </div>
          </div>
          <div class="d-flex align-center">
            <input
              v-model.trim="ip"
              class="dashboard-wrapper-input"
              :style="{ borderColor: error && '#FF6C6C' }"
            />
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-6"
              v-show="loading"
            ></v-progress-circular>
          </div>

          <button @click="getInfo">{{ $t("information") }}</button>
        </div>
        <div class="d-flex flex-column dashboard-wrapper-block">
          <div class="dashboard-wrapper-header">{{ $t("result") }}</div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t("ip") }}</th>
                  <th class="text-left">{{ $t("continent") }}</th>
                  <th class="text-left">{{ $t("country") }}</th>
                  <th class="text-left">{{ $t("city") }}</th>
                  <th class="text-left">{{ $t("postalIndex") }}</th>
                  <th class="text-left">{{ $t("coordinates") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ !info.ip || error ? "-" : info.ip }}</td>
                  <td>{{ !info.continent || error ? "-" : info.continent }}</td>
                  <td>{{ !info.country || error ? "-" : info.country }}</td>
                  <td>{{ !info.city || error ? "-" : info.city }}</td>
                  <td>
                    {{ !info.postalCode || error ? "-" : info.postalCode }}
                  </td>
                  <td>
                    {{ !info.coordinates || error ? "-" : info.coordinates }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div class="d-flex flex-column" style="max-width: 396px">
          <div class="dashboard-wrapper-header">{{ $t("history") }}</div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t("ip") }}</th>
                  <th class="text-left">{{ $t("country") }}</th>
                  <th class="text-left">{{ $t("city") }}</th>
                </tr>
              </thead>
              <tbody v-if="history.length">
                <tr v-for="(item, i) in history" :key="item.ip + i">
                  <td>{{ item.ip }}</td>
                  <td>{{ item.continent }}</td>
                  <td>{{ item.country }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td>{{ historyInitial.ip }}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <button
            @click="cleanHistory"
            :disabled="!history.length"
            class="dashboard-wrapper-clear-history-btn"
          >
            {{ $t("history_clean") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapMutations } from "vuex";
import { IP_PLACEHOLDER } from "../constant";
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
    info: { ip: IP_PLACEHOLDER },
    historyInitial: { ip: IP_PLACEHOLDER },
    loading: false,
    error: ""
  }),
  methods: {
    ...mapMutations(["addToHistory", "cleanHistory"]),
    async getInfo() {
      this.loading = true;
      await this.$apollo
        .query({
          query: GET_GEO,
          variables: {
            ip: this.ip
          }
        })
        .then(({ data: { ipAddress } }) => {
          console.log(ipAddress);
          this.info = {
            ip: this.ip,
            continent: ipAddress.country.continent
              ? ipAddress.country.continent.name
              : "-",
            country: `${ipAddress.country.name}/${ipAddress.country.alpha2Code}`,
            city: ipAddress.city ? ipAddress.city.name : "-",
            postalCode: "",
            coordinates: ipAddress.city
              ? `${ipAddress.city.location.lat.toFixed(
                  1
                )}/${ipAddress.city.location.long.toFixed(1)}`
              : ""
          };
          this.addToHistory(this.info);
          this.error = "";
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.error = err;
          this.loading = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/main";
.dashboard-wrapper {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(230, 230, 230, 0.8);
  min-height: 619px;
  max-width: 936px;
  margin: 57px auto 0;
  padding: 48px;

  &-header {
    margin-bottom: 8px;
  }

  &-block {
    margin-bottom: 48px;
  }

  &-label-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;

    &-error {
      margin-left: 8px;
      color: red;
    }
  }

  &-input {
    border: 1px solid $color_border;
    box-sizing: border-box;
    border-radius: 8px;
    height: 45px;
    width: 396px;
    padding-left: 18px;
    outline: none;
    margin: 8px 0 18px;

    &:focus {
      border: 1px $color_fiolet solid;
    }
  }

  &-clear-history-btn {
    margin-top: 18px;

    &:disabled {
      background: $color_grey;

      &:hover {
        background: $color_grey;
      }
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

  .v-data-table {
    &__wrapper {
      border-radius: 8px;
    }

    table {
      border: 1px solid $color_border;
      box-sizing: border-box;
      border-radius: 8px;
    }

    thead {
      background: $color_fiolet;
    }

    td {
      border-right: 1px solid $color_border;
      color: #969696;
      text-align: center;
      &:last-child {
        border: none;
      }
    }
    th {
      text-align: center !important;
      color: white !important;
    }
  }
}
</style>
