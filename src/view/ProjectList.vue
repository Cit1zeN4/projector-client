<template lang="pug">
  div
    NavBar/
    .container.shadow-lg.mt-5.px-4.py-1.rounded
      h2.mt-4 Projects
      b-button.mt-2(variant="primary" v-b-modal.create-project-modal
      v-if="checkRole(getUserRole, 'admin', 'manager')")
        div
          b-icon-plus-square.mr-2
          span Create
      
      b-card-group.my-4(v-if="getAllProjects.length !== 0")
        b-card.shadow.mx-2(
          :title="item.projectName" 
          v-for="(item, index) in this.getAllProjects" 
          :key="index"
          @click="toProject(item.id)"
        )
          
          b-card-text.text-truncate
            | {{item.projectDescription}}
      
      div.d-flex.justify-content-center(v-else)
        h1#no-projects No projects

    CreateProjectModal/
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CreateProjectModal from "../components/CraeteProjectModal";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ProjectList",
  components: {
    NavBar,
    CreateProjectModal
  },
  computed: {
    ...mapGetters(["getUserRole", "getAllProjects"])
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    ...mapMutations(["clearCurrentProject"]),
    checkRole(role, ...accessRole) {
      return accessRole.some(r => r === role);
    },
    toProject(id) {
      this.$router.push(`/projects/${id}`);
    }
  },
  mounted() {
    this.fetchProjects();
    this.clearCurrentProject();
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
}

#no-projects {
  color: rgb(88, 88, 88);
  margin: 200px 0;
}
</style>
