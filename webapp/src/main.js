import Vue from "vue";
import App from "./App.vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);
Vue.config.productionTip = false;

const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
