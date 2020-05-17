<template lang="pug">
  div
    b-navbar-nav.d-none.d-lg-flex(v-if="navbar")

      b-nav-item(v-for="(item, index) in links" :key="index" :to="item.path")
        | {{item.name}}
      
      b-nav-item(v-if="!isUserAuth" to="/login") Log In
      b-nav-item(v-if="!isUserAuth" to="/signup") Sign Up
      b-nav-item(v-else to="/user/profile") 
        | {{userFullName}}      

    b-navbar-nav(v-else)

      b-nav-item.text-right(v-if="!isUserAuth" to="/login") Log In
      b-nav-item.text-right(v-if="!isUserAuth" to="/signup") Sign Up
      b-nav-item.text-right(v-else to="/user/profile") 
        | {{userFullName}}

      b-nav-item.text-right(
        v-for="(item, index) in links" 
        :key="index" :to="item.path")
        | {{item.name}}
</template>

<script>
import links from "@/config/navLinkConfig.js";
import { mapGetters } from "vuex";
export default {
  name: "NavLink",
  computed: mapGetters(["isUserAuth", "userFullName", "userShortName"]),
  props: {
    navbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      links
    };
  }
};
</script>
