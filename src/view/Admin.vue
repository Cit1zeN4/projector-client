<template lang="pug">
  div    
    NavBar
    AdminUsers.m-4
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import AdminUsers from "@/components/AdminUsers.vue";

export default {
  name: "Admin",
  components: { NavBar, AdminUsers },
  computed: {
    ...mapGetters(["getUsers"])
  },
  methods: {
    ...mapActions(["fetchUsers"])
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>