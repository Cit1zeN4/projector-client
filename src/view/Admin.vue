<template lang="pug">
  div    
    NavBar
    div(v-if="checkRole(getUserRole, 'admin')")
      AdminUsers.m-4
    div(v-else)
      .d-flex.justify-content-center.align-items-center.h-100vh
        h1 Access error
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import AdminUsers from "@/components/AdminUsers.vue";

export default {
  name: "Admin",
  components: { NavBar, AdminUsers },
  computed: {
    ...mapGetters(["getUsers", "getUserRole"])
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    checkRole(role, ...accessRole) {
      return accessRole.some(r => r === role);
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.h-100vh {
  height: calc(100vh - 56px);
}
</style>