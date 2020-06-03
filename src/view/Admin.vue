<template lang="pug">
  div    
    NavBar
      template(v-slot:sidebar-x-content)
        div
          h5.my-3.text-right Admin
          b-navbar-nav
            b-nav-item.text-right Projects
            b-nav-item.text-right Users
            b-nav-item.text-right Tasks          

    .d-flex
      .left-sidebar.d-none.d-lg-flex.flex-column.p-4.shadow   
        b-list-group
          .list-group-item Projects
          .list-group-item Users
          .list-group-item Tasks

      .content.p-4
        router-view
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Admin",
  components: { NavBar },
  computed: {
    ...mapGetters(["userFullName", "getImage", "getEmail", "isUserAuth"])
  }
};
</script>

<style scoped>
.left-sidebar {
  height: calc(100vh - 56px);
  overflow-y: auto;
  flex: 1;
}

.content {
  height: calc(100vh - 56px);
  overflow-y: auto;
  max-width: 100%;
  min-width: auto;
  flex: 6;
}
</style>