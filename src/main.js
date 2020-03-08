import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// import { createProvider } from "./vue-apollo";
import VueApollo from "vue-apollo";
import i18n from "./i18n";
import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(Vuelidate);
Vue.use(VueApollo);
Vue.config.productionTip = false;

const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('apollo-token');
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};
// Create an http link:
const link = new HttpLink({
  uri: 'https://api.everbase.co/graphql?apikey=alpha',
  fetch,
  headers: getHeaders()
});
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: true
  })
});

const apolloProvider = new VueApollo({
  defaultClient: client,
})

new Vue({
  store,
  // apolloProvider: createProvider(),
  i18n,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount("#app");
