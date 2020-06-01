<template lang="pug">
  div
    NavBar
      template(v-slot:sidebar-x-content)
        div
          h5.my-3.text-right Project
          b-navbar-nav
            b-nav-item.text-right(:to="`/projects/${id}`") About Project
            b-nav-item.text-right(:to="`/projects/${id}/files`") Files
            b-nav-item.text-right(:to="`/projects/${id}/people`") People
            b-nav-item.text-right(:to="`/projects/${id}/tasks`") Tasks
            b-nav-item.text-right(v-b-toggle.sprints-sidebar) Sprints
            b-collapse#sprints-sidebar
              b-nav-item.pr-2.text-right(v-for="sprint in getSprintList()" 
              :to="`/projects/${id}/sprint/${sprint}`") {{'Sprint #'+ sprint}}            

    .d-flex
      .left-sidebar.d-none.d-lg-flex.flex-column.p-4.shadow   
        b-list-group
          router-link.list-group-item(:to="`/projects/${id}`") About Project
          router-link.list-group-item(:to="`/projects/${id}/files`") Files
          router-link.list-group-item(:to="`/projects/${id}/people`") People
          router-link.list-group-item(:to="`/projects/${id}/tasks`") Tasks
        b-button.mt-3(v-b-toggle.sprints variant="outline-primary") Sprints
        b-collapse#sprints
          b-list-group.mt-3
            router-link.list-group-item(v-for="sprint in getSprintList()" 
            :to="`/projects/${id}/sprint/${sprint}`") {{'Sprint #'+ sprint}}

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
    ...mapGetters(["getCurrentProject", "getCurrentProjectTasks"])
  },
  methods: {
    ...mapActions(["fetchProjectById"]),
    getSprintList() {
      return this.getCurrentProjectTasks
        .map(column => {
          return column.tasks.map(t => t.sprint);
        })
        .flat()
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .sort((a, b) => a - b);
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
</style>