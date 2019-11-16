import Vue from "vue";
import App from "./App.vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);
Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: "http://localhost:4000"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
