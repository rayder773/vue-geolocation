import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import store from "./store";
import { createProvider } from "./vue-apollo";
import i18n from "./i18n";
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false;

new Vue({
  store,
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App)
}).$mount("#app");
