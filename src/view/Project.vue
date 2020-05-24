<template lang="pug">
  div
    NavBar
      template(v-slot:sidebar-x-content)
        div
          h5.my-3.text-right Project
          b-navbar-nav
            b-nav-item.text-right About Project
            b-nav-item.text-right Files
            b-nav-item.text-right People
            b-nav-item.mt-3.text-right(v-b-toggle.sprints-sidebar) Sprints
            b-collapse#sprints-sidebar
              b-nav-item.pr-2.text-right Sprint #1

    .d-flex
      .left-sidebar.d-none.d-lg-flex.flex-column.p-4.shadow   
        b-list-group
          b-list-group-item About Project
          b-list-group-item Files
          b-list-group-item People
        b-button.mt-3(v-b-toggle.sprints variant="outline-primary") Sprints
        b-collapse#sprints
          b-list-group.mt-3
            b-list-group-item Sprint #1
            b-list-group-item Sprint #2
            b-list-group-item Sprint #3
      .content.p-4
        router-view
        
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Project",
  props: ["id"],
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["getCurrentProject"])
  },
  methods: {
    ...mapActions(["fetchProjectById"]),
    publicPath(path){
      return `${process.env.VUE_APP_BASE_URL}${path}`
    }
  },
  mounted() {
    this.fetchProjectById(this.id);
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

.content #header-img {
  height: 170px;
  width: 100%;
  object-fit: cover;
}
</style>